import React, { Component } from 'react';
import axios from  'axios';
import { connect } from 'react-redux';
import storage from 'lib/storage';
import devtest from 'lib/devtest';
import {CodePopup, CodeAddPopup} from 'components';
import { 
    Header, Grid, Table, Input, Select, Button, Transition, Icon } from 'semantic-ui-react';

const statusOptions = 
    [
    { key: 1 , value: 1 , text: 1  },
    { key: 2 , value: 2 , text: 2  },
    { key: 3 , value: 3 , text: 3  },
    { key: 4 , value: 4 , text: 4  },
    { key: 5 , value: 5 , text: 5  },
    { key: 6 , value: 6 , text: 6  },
    { key: 7 , value: 7 , text: 7  },
    { key: 8 , value: 8 , text: 8  },
    { key: 9 , value: 9 , text: 9  },
    { key: 10, value: 10, text: 10 },
    { key: 11, value: 11, text: 11 },
    { key: 12, value: 12, text: 12 },
    { key: 13, value: 13, text: 13 },
    { key: 14, value: 14, text: 14 },
    { key: 15, value: 15, text: 15 },
    { key: 16, value: 16, text: 16 },
    { key: 17, value: 17, text: 17 },
];

class  CodeContainer extends Component {

    /** 생성자 */
    constructor(props) {
        super(props);
        this.state = {
            code : {
                userType : []
            },
            groupNameData: [],
            codeData: [],
            selectedGroupName : '',
            selectedCode: -1,
            openPopup: false,
            openAddPopup: false,
            groupCode: {
                groupName: '',
                originGroupName: ''
            },
            addGroupCode: {
                groupName: '',
                codeName: '',
                codeValue: '',
                codeOrder: ''
            }
        };
    }
    initialize = () => {
        this.setState({
            codeData: [],
            selectedGroupName : '',
            selectedCode: -1,
        });
    }

    componentDidMount() {
        //Group Code 리스트 조회
        this.handleGetGroupIdList();
    }

    /** Group Code 리스트 조회 */
    handleGetGroupIdList = () => {
        const self = this;
        axios({
            url: devtest() +`/commonCode`,
            method:"get",
            headers: {  "Pragma": 'no-cache',
                        "x-access-token": storage.getToken() 
                     }
        }).then( (res) => {
            if(res.data){
                // console.log("set obj", res.headers)
                //토큰 Refresh
                storage.setSessionObj(res.headers);
                //state 초기화
                self.initialize();
                self.setState({
                    groupNameData: res.data,
                });
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    /** GroupName 상세조회 */
    handleClickGroupCode = (e) => {
        const self = this;
        const groupName = e.currentTarget.getAttribute('data-group');
        if(groupName === '') {
            return;
        }
        //선택한 GroupName 셋팅
        this.setState({
            selectedGroupName: groupName
        });
        axios({
            url: devtest() +`/commonCode/${groupName}`,
            method:"get",
            headers: {  "Pragma": 'no-cache',
                     }
        }).then( (res) => {
            if(res.data){
                self.setState({
                    codeData: res.data,
                    selectedCode: -1,
                });
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    /** 코드 선택시 */
    handleClickCode = (e) => {
        const key = e.currentTarget.getAttribute('data-key')
        //선택한 CodeId 셋팅
        this.setState({
            selectedCode: parseInt(key) 
        });
    }

    /** commonCode Row 추가 */
    handleAdd = (e) => {
        const {codeData, selectedGroupName}= this.state;
        
        if(selectedGroupName === ''){
            alert('그룹코드를 선택한 뒤 추가하시기 바랍니다.')
            return;
        }
        this.setState({
            codeData: codeData.concat({groupName: selectedGroupName, codeName: '', codeValue:'', codeOrder:''}),
            selectedCode: -1
        })
    }
    
    /** commonCode Row 삭제 */
    handleRemove = () => {
        const {codeData, selectedCode} = this.state;
        //클릭한 Row가 있는 경우 해당 Row 삭제
        //클릭한 Row가 없는 경우 마지막 Row삭제
        this.setState({
            codeData: selectedCode === -1? codeData.slice(0, -1): _.filter(codeData, function(o, idx) { return idx !== selectedCode; }),
            selectedCode: -1
        })
    }

    /** 그룹코드 수정팝업 OPEN */
    openPopup = (e) => {
        const groupName = e.currentTarget.getAttribute('data-group');
        this.setState({
            openPopup: true,
            groupCode: {
                originGroupName: groupName,
                groupName : groupName
            }
        });
    }

    /** 그룹코드 수정팝업 CLOSE */
    closePopup = () => {
        this.setState({
            openPopup: false
        });
    }

     /** 그룹코드 추가팝업 OPEN */
     openAddPopup = (e) => {
        this.setState({
            openAddPopup: true
        });
    }

    /** 그룹코드 수정팝업 CLOSE */
    closeAddPopup = () => {
        this.setState({
            openAddPopup: false
        });
    }

    /** normal Input onChange */
    handlePopupInputChange = (e) => {
        let { groupCode } = this.state;
        groupCode[e.target.name] = e.target.value;
        this.setState({groupCode});
    }

    /** normal Input onChange */
    handleInputChange = (e) => {
        let { codeData } = this.state;
        const codeName = e.currentTarget.parentElement.getAttribute('data-code'); 
        const key = e.currentTarget.parentElement.getAttribute('data-key'); 

        for (const [index, code] of codeData.entries()) {
            if (code.codeName === codeName && parseInt(key) === index ) {                
                code[e.target.name] = e.target.value;
            }
        }
        
        this.setState({
            codeData: codeData
        });
    }

    /** Semantic UI Select onChange  */
    handleSemanticChange = (e, data) => {
        let { codeData } = this.state;
        const key = e.currentTarget.parentElement.parentElement.getAttribute('data-key'); 

        for (const [index, code] of codeData.entries()) {
            if (code.codeName === data.data && parseInt(key) === index ) {
                code[data.name] = data.value;
            }
        }
        this.setState({
            codeData: codeData
        });
    };

    /** normal Input onChange in Group Add Popup */
    handleInputChangeInPopup = (e) => {
        let { addGroupCode } = this.state;
        addGroupCode[e.target.name] = e.target.value;
        this.setState({addGroupCode});
    }


    /** Semantic UI Select onChange in Group Add Popup */
    handleSemanticChangeInPopup = (event, data) => {
        let { addGroupCode } = this.state;
        addGroupCode[data.name] = data.value;
        this.setState({addGroupCode});
    };

    /** 그룹코드 수정 */
    handleGroupCodeSave = (e) => {
        const {groupCode} = this.state;
        const {closePopup, handleGetGroupIdList} = this;
        if(groupCode.groupName ==='' ) {
            alert('필수 항목을 모두 입력하시기 바랍니다.');
        }
        axios({
            url: devtest() +`/commonCode/group`,
            method:"put", 
            data: {
                originGroupName: groupCode.originGroupName,
                groupName: groupCode.groupName
            },
            headers: {  "Pragma": 'no-cache',
                        "x-access-token": storage.getToken() 
                     }
        }).then( (res) => {
            if(res.data){
                //토큰 Refresh
                storage.setSessionObj(res.headers);

                alert("저장되었습니다");
                //팝업닫기
                closePopup();

                //그룹코드 리스트 조회
                handleGetGroupIdList();
                // storage.setSessionObj(res.headers);
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    /** 그룹코드 생성 */
    handleGroupCodeAdd = () => {
        const {addGroupCode, groupNameData} = this.state;
        const {closeAddPopup, handleGetGroupIdList} =this;
        if(addGroupCode.groupName ==='' ||addGroupCode.codeName ==='' ||addGroupCode.codeValue ==='' ||addGroupCode.codeOrder ==='' ){
            alert('필수 항목을 모두 입력하시기 바랍니다.');
            return;
        }
        const sameGroupName = _.filter(groupNameData, function(obj){
            return obj.groupName.toUpperCase() === addGroupCode.groupName.toUpperCase() 
        });

        if(sameGroupName.length>0){
            alert('동일한 그룹명을 사용할 수 없습니다.');
            return;
        }
        axios({
            url: devtest() +`/commonCode`,
            method:"post", 
            data: {
                groupName: addGroupCode.groupName,
                codeName: addGroupCode.codeName,
                codeValue: addGroupCode.codeValue,
                codeOrder: addGroupCode.codeOrder,
            },
            headers: {  "Pragma": 'no-cache',
                        "x-access-token": storage.getToken() 
                     }
        }).then( (res) => {
            if(res.data){
                //토큰 Refresh
                storage.setSessionObj(res.headers);
                
                alert("저장되었습니다");
                closeAddPopup();
                //그룹코드 리스트 조회
                handleGetGroupIdList();
                // storage.setSessionObj(res.headers);
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    /** 그룹코드 삭제 */
    handleGroupCodeDelete = () => {
        const {groupCode} = this.state;
        const {closePopup, handleGetGroupIdList} = this;
        if(confirm("그룹코드 삭제시 그룹코드 하위의 모든 코드가 삭제됩니다. 삭제하겠습니까?")){
            axios({
                url: devtest() +`/commonCode/${groupCode.groupName}`,
                method:"delete",
                headers: {  "Pragma": 'no-cache',
                            "x-access-token": storage.getToken() 
                        }
            }).then( (res) => {
                if(res.data){
                    //토큰 Refresh
                    storage.setSessionObj(res.headers);
                    alert("삭제되었습니다");
                    //팝업닫기
                    closePopup();

                    //그룹코드 리스트 조회
                    handleGetGroupIdList();
                    // storage.setSessionObj(res.headers);
                }
            }).catch(function(error) {
                console.log(error);
            });
        }
    }

    
    /** 코드 저장 */
    handleCodeSave = () => {
        const {codeData, selectedGroupName} = this.state;
        const {handleGetGroupIdList} = this;
        let result = true;
        //필수 항목 체크
        codeData.map(function(object){
            if(object.codeName ==='' || object.codeValue==='' || object.codeOrder === ''){
                result = false;
                return;
            }
        });
        if(!result){
            alert('필수 항목을 모두 입력하시기 바랍니다.');
            return;
        }
        //동일한 Code Name 또는 Order를 사용하는지 체크
        const uniq = _.uniqWith(codeData, (object, object2)=>{
            return object.codeName === object2.codeName || object.codeOrder === object2.codeOrder
        })
        if(codeData.length !== uniq.length){
            alert('동일한 Code Name 또는 Order를 사용할 수 없습니다');
            return;
        }
        
        axios({
            url: devtest() +`/commonCode`,
            method:"put", 
            data: {
                codeList: codeData,
                groupName: selectedGroupName
            },
            headers: {  "Pragma": 'no-cache',
                        "x-access-token": storage.getToken() 
                     }
        }).then( (res) => {
            if(res.data){
                //토큰 Refresh
                storage.setSessionObj(res.headers);

                alert("저장되었습니다");

                //그룹코드 리스트 조회
                handleGetGroupIdList();
            }
        }).catch(function(error) {
            console.log(error);
        });
    }


    render() {
        const {groupNameData, codeData, selectedGroupName, selectedCode, groupCode} = this.state;
        const { handleClickGroupCode
            , openPopup
            , closePopup
            , handlePopupInputChange
            , handleGroupCodeSave
            , handleClickCode
            , handleCodeSave
            , handleInputChange
            , handleSemanticChange 
            , openAddPopup
            , closeAddPopup
            , handleInputChangeInPopup
            , handleSemanticChangeInPopup
            , handleGroupCodeAdd
            , handleGroupCodeDelete} = this;
        return (
            <div>
                <CodePopup openPopup={this.state.openPopup} 
                            closePopup={closePopup}
                            groupCode={groupCode}
                            handleInputChange={handlePopupInputChange}
                            handleGroupCodeSave={handleGroupCodeSave}
                            onDelete={handleGroupCodeDelete}
                            />
                <CodeAddPopup openPopup={this.state.openAddPopup} 
                            closePopup={closeAddPopup}
                            handleInputChange={handleInputChangeInPopup}
                            handleSelectChange={handleSemanticChangeInPopup}
                            onSave={handleGroupCodeAdd}
                            />
                <Grid columns={2} divided container style={{ padding: '7em 0em 0em 0em' }}>
                    <Grid.Row>
                        <Grid.Column>
                            <Header as='h1' >
                            코드 관리
                            </Header>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column width={6}>
                            <Table celled>
                                {/* Header 시작 */}
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell textAlign="center">No.</Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center">Group Name</Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center">변경</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                {/* Header 끝 */}
                                {/* Body 시작 */}
                                <Table.Body> 
                                {groupNameData.map((object, i) => {
                                    return (
                                    <Table.Row key={i} selectable={selectedGroupName === object.groupName? 1: 0} positive={selectedGroupName === object.groupName?true:false}>
                                            <Table.Cell textAlign="center">{i+1}</Table.Cell>
                                            <Table.Cell textAlign="center" data-group={object.groupName} onClick={handleClickGroupCode}>
                                                <span className="cell_title">{object.groupName}</span>
                                            </Table.Cell>
                                            <Table.Cell textAlign="center">
                                                <Button icon data-group={object.groupName}
                                                            onClick={openPopup}><Icon name='pencil alternate'/></Button>
                                                </Table.Cell> 
                                        </Table.Row>
                                    );
                                })}
                                </Table.Body>
                                {/* Body 끝 */}
                                <Table.Footer >
                                    <Table.Row >
                                        <Table.HeaderCell colSpan='5' >
                                            {/* <Button color='red' onClick={this.handleAdd} floated='right'>저장</Button> */}
                                            <Button primary floated='right' onClick={openAddPopup}>추가</Button>
                                            {/* <Button primary >삭제</Button> */}
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Footer>
                            
                            </Table>
                        </Grid.Column>
                        <Grid.Column width={9}>
                            <Table celled unstackable selectable> 
                                {/* Header 시작 */}
                                <Table.Header>
                                    <Table.Row>
                                        <Table.HeaderCell textAlign="center" ></Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center" >Group Name</Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center" >Code Name</Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center" >Code Value</Table.HeaderCell>
                                        <Table.HeaderCell textAlign="center" >Order</Table.HeaderCell>
                                    </Table.Row>
                                </Table.Header>
                                {/* Header 끝 */}
                                {/* Body 시작 */}
                                {/* <Table.Body>  */}
                                <Transition.Group as={Table.Body} duration={200} >  
                                    {codeData.map((object, i) => {
                                        return (
                                            <Table.Row key={i} style={{"display": "table-row !important"}} data-code={object.codeName} data-key={i} onClick={handleClickCode}
                                            selectable={ selectedCode === i ? 1: 0} positive={selectedCode === i ?true:false}
                                            >
                                                <Table.Cell textAlign="center" width={1} name="codeKey"><span className="cell_title">{i+1}</span></Table.Cell>
                                                <Table.Cell textAlign="center" width={3}>{object.groupName}</Table.Cell>
                                                <Table.Cell textAlign="center" width={3}>
                                                    <Input name="codeName" maxLength="100" value={object.codeName} fluid onChange={handleInputChange} data-code={object.codeName} data-key={i}/>
                                                </Table.Cell>
                                                <Table.Cell textAlign="center" width={3}>
                                                    <Input name="codeValue" maxLength="100" value={object.codeValue} fluid onChange={handleInputChange} data-code={object.codeName} data-key={i}/>
                                                </Table.Cell>
                                                <Table.Cell textAlign="center" width={2}>
                                                    <Select name="codeOrder" placeholder="선택" value={object.codeOrder} options={statusOptions} fluid onChange={handleSemanticChange} data={object.codeName} data-key={i}/>
                                                    </Table.Cell>
                                            </Table.Row>
                                        );
                                    })}
                                </Transition.Group>
                                {/* </Table.Body> */}
                                {/* Body 끝 */}
                                <Table.Footer >
                                    <Table.Row >
                                        <Table.HeaderCell colSpan='5' >
                                        <Button color='red' floated='right' onClick={handleCodeSave}>저장</Button>
                                        </Table.HeaderCell>
                                    </Table.Row>
                                </Table.Footer>
                            </Table>
                            <Grid.Row >
                                <Button.Group floated='right' style={{ marginBottom: '10px' }}>
                                    <Button disabled={codeData.length === 0} icon='minus' onClick={this.handleRemove} />
                                    <Button disabled={selectedGroupName ===''} icon='plus' onClick={this.handleAdd} />
                                </Button.Group>
                            </Grid.Row>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            
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
)(CodeContainer);
