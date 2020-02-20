import React, { Component } from 'react';
import axios from  'axios';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import storage from 'lib/storage';
import devtest from 'lib/devtest';
import dateTimeFormat from 'lib/dateTimeFormat';/** 날짜 포맷 변경 공통함수 */
import { 
    Header, Table, Button, Grid, Pagination,Checkbox, Icon
 } from 'semantic-ui-react';
import {NoticePopup} from 'components'
class NoticeContainer extends Component {

    /** 생성자 */
    constructor(props) {
        super(props);
        this.state = {
            code : {
              noticeCategory : []
            },
            filteredData: [],
            /** Pagination state */
            totalCount: 0,//총 데이터 수
            totalPages: 5, //총 페이지
            rowsPerPage: 10, //한 페이지의 row수
            openPopup: false,
            noticeInfo: {
              noticeSeq:"",
              noticeCategory: "",
              noticeTitle:"",
              noticeContent:"",
              applicantYn: "Y",
              bpYn: "Y"
            },
        };
        //바인딩
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {
        // 저장된 공지사항 글 리스트 조회(with 페이징)
        this.handleGetNoticeList();
    }

     /** 저장된 공지사항 글 리스트 조회(with 페이징) */
     handleGetNoticeList = (header) => {
        const currentPage = 1; // 현재 페이지
        const rowsPerPage = this.state.rowsPerPage; //한 페이지에 나오는 리스트 갯수(TO-DO: selectBox로 갯수 선택하게)
        const self = this;
        
        axios({
            url: devtest() +`/notice/paging/${currentPage}/${rowsPerPage}`,
            method:"get",
            headers: {  "Pragma": 'no-cache',
                        //공지사항 등록/수정/삭제 후 조회하는 경우 이전함수에서 받은 token으로 axios 던짐
                        "x-access-token": (header !== undefined ? header.newtoken: storage.getToken() )
                     }
        }).then( (res) => {
            storage.setSessionObj(res.headers);
            if(res.data){
                self.setState({
                    filteredData: res.data.rows,
                    totalCount: res.data.count,
                    totalPages: res.data.totalPages
                });
            }
        }).catch(function(error) {
            console.log(error);
        });
    }
    /** Pagination onChange */
    handlePageChange(e,data) {
        const self = this;
        const currentPage = data.activePage; // 현재 페이지
        const rowsPerPage = this.state.rowsPerPage; //한페이지에 나오는 리스트 갯수 (임의로 10개 지정)
        
        axios({
            url: devtest() +`/notice/paging/${currentPage}/${rowsPerPage}`,
            method:"get",
            headers: {  "Pragma": 'no-cache',
                        "x-access-token": storage.getToken() 
                     }
        }).then( (res) => {
            storage.setSessionObj(res.headers);
            if(res.data){
                self.setState({
                    filteredData: res.data.rows,
                    totalCount: res.data.count,
                    totalPages: res.data.totalPages
                });
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    /** 공지사항 상세보기/수정 팝업 */
    clickTitle = (e) => {
        const noticeSeq = e.currentTarget.getAttribute('data-seq');
        const self = this;
        axios({
            url: devtest() +`/notice/${noticeSeq}`,
            method:"get",
            headers: {  "Pragma": 'no-cache',
                        "x-access-token": storage.getToken() 
                     }
        }).then( (res) => {
            storage.setSessionObj(res.headers);
            if(res.data){
                self.setState({
                    noticeInfo: res.data,
                });
            }
        }).catch(function(error) {
            console.log(error);
        });
        // 팝업 OPEN
        this.setState({
            openPopup: true
        });
    }

    /** 공지사항 팝업 열기 */
    clickAddPopup= () => {
        this.setState({
            openPopup: true
        });
    }
    /** 공지사항 상세보기/수정 팝업 닫기 */
    clickClose = () => {
        this.setState({
            openPopup: false,
            noticeInfo: {
                noticeSeq:"",
                noticeCategory: "",
                noticeTitle:"",
                noticeContent:"",
                applicantYn: "Y",
                bpYn: "Y"
              },
        });
    }

    /** normal Input onChange */
    handleInputChange = (e) => {
        let { noticeInfo } = this.state;
        noticeInfo[e.target.name] = e.target.value;
        this.setState({noticeInfo});
    }
    /** Semantic UI Select onChange  */
    handleSemanticChange = (e, data) => {
        let input = this.state.noticeInfo;
        input[data.name] = data.value;
        this.setState({
            noticeInfo: input
        })
    }

    /** Notice Add validation */
    validation = () => {
        let result = true;
        const {noticeInfo} = this.state;
        
        if(noticeInfo.noticeTitle === ""
        || noticeInfo.noticeContent === ""
        || noticeInfo.noticeCategory === ""
        || noticeInfo.applicantYn === ""
        || noticeInfo.bpYn === ""){
            alert('필수 항목을 모두 입력하시기 바랍니다.');
            return false;
        }
        return result;
    }

    /** 공지사항 등록 */
    onAdd = () => {
        const { noticeInfo } = this.state;
        const {clickClose, handleGetNoticeList} =this;
        if(this.validation()){
            axios({
                url: devtest() +`/notice`,
                method:"post",
                data: noticeInfo, 
                headers: {  "Pragma": 'no-cache',
                        "x-access-token": storage.getToken() }
            }).then( (res) => {
                storage.setSessionObj(res.headers);
                if(res.data){
                        alert("저장되었습니다.");
                        clickClose();
                        handleGetNoticeList(res.headers);
                }
            }).catch(function(error) {
                console.log(error);
            });
        }
    }

    radioChange = (e, data) => {
        let input = this.state.noticeInfo;
        input[data.name] = data.value;
        this.setState({
            noticeInfo: input
        })
    }
    /** 공지사항 삭제 */
    onDelete = (e) => {
        const {handleGetNoticeList} = this;
        const noticeSeq = e.currentTarget.getAttribute('data-seq');

        axios({
            url: devtest() +`/notice/${noticeSeq}`,
            method:"delete", 
            headers: {  "Pragma": 'no-cache',
                        "x-access-token": storage.getToken() 
                     }
        }).then( (res) => {
            storage.setSessionObj(res.headers);
            if(res.data){
                alert("삭제되었습니다.");
                //조회
                handleGetNoticeList(res.headers);
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    /** 공지사항 수정 */
    onSave = () => {
        const { noticeInfo } = this.state;
        const {clickClose, handleGetNoticeList} =this;
        if(this.validation()){
            axios({
                url: devtest() +`/notice/${noticeInfo.noticeSeq}`,
                method:"put",
                data: noticeInfo, 
                headers: {  "Pragma": 'no-cache',
                        "x-access-token": storage.getToken() }
            }).then( (res) => {
                storage.setSessionObj(res.headers);
                if(res.data){
                    alert("저장되었습니다.");
                    //팝업 닫기
                    clickClose();
                    //조회
                    handleGetNoticeList(res.headers);
                }
            }).catch(function(error) {
                console.log(error);
            });
        }
    }



    render() {
        const {filteredData, totalPages, noticeInfo} = this.state;
        const { clickClose, clickTitle
            , clickAddPopup
            , handleInputChange
            , onAdd 
            , radioChange
            , handleSemanticChange
            , onDelete
            , onSave} = this;
        return (
            <div>
            <NoticePopup openPopup={this.state.openPopup} 
                            clickClose={clickClose}
                            noticeInfo={noticeInfo}
                            handleInputChange={handleInputChange}
                            radioChange ={radioChange}
                            handleSemanticChange ={handleSemanticChange}
                            onSave={onSave}
                            onAdd={onAdd}/>
            
            <Grid container style={{ padding: '7em 0em 0em 0em' }}>
                <Grid.Row>
                <Grid.Column>
                    <Header as='h1' dividing>
                    공지사항 관리
                    </Header>
                </Grid.Column>
                </Grid.Row>
                <Grid.Row>
                    <Grid.Column>
                        <Table celled>
                            {/* Header 시작 */}
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell textAlign="center">NO.</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">카테고리</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">공고제목</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">등록일</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">등록자</Table.HeaderCell>
                                    <Table.HeaderCell textAlign="center">삭제</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
                            {/* Header 끝 */}
                            {/* Body 시작 */}
                            <Table.Body>    
                            {filteredData.map((object, i) => {
                                return (
                                    <Table.Row key={i}>
                                        <Table.Cell textAlign="center">{i+1}</Table.Cell>
                                        <Table.Cell textAlign="center">{object.noticeCategory}</Table.Cell>
                                        <Table.Cell textAlign="left">
                                            <span className="cell_title" onClick={clickTitle} data-seq={object.noticeSeq}>{object.noticeTitle}</span>
                                        </Table.Cell>
                                        <Table.Cell textAlign="center">{dateTimeFormat(object.createDatetime)}</Table.Cell>
                                        <Table.Cell textAlign="center">{object.createUserId}</Table.Cell>
                                        <Table.Cell textAlign="center">
                                            <Button icon color='red' onClick={onDelete} data-seq={object.noticeSeq}><Icon name='trash alternate' />삭제</Button>
                                        </Table.Cell>
                                    </Table.Row>
                                 );
                            })}
                            </Table.Body>
                            {/* Body 끝 */}
                            <Table.Footer >
                                <Table.Row >
                                    <Table.HeaderCell colSpan='7' >
                                        <Pagination floated='right'
                                        // boundaryRange={0}
                                        defaultActivePage={1}
                                        ellipsisItem={null}
                                        // firstItem={null}
                                        // lastItem={null}
                                        siblingRange={1}
                                        totalPages={totalPages} /** 총 페이지 수 */
                                        // activePage={this.state.currentPage}
                                        onPageChange={this.handlePageChange}
                                    />
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>            
            <Grid columns='equal' container>
                <Grid.Column textAlign='right'>
                    <Button color='blue' onClick={clickAddPopup}>등록</Button>
                </Grid.Column>
            </Grid>
            {/* <Divider /> */}

            </div>

        );
    }
}

export default connect(
    //props로 넣어줄 스토어 상태값
    (state) => ({
    })
    //props로 넣어줄 액션 생성함수
    , (dispatch) => ({
    })
)(NoticeContainer);
