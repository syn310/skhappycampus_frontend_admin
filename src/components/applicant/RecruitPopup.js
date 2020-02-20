import React, { Component } from 'react';
import { Modal, Header, Icon, Table, Input, TextArea, Form, Button, Select } from 'semantic-ui-react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { dateBarFormat } from 'lib/dateFormat';

const statusOptions = [
    { key: '시작전', value: '시작전', text: '시작전' },
    { key: '진행중', value: '진행중', text: '진행중' },
    { key: '종료',   value: '종료',   text: '종료' }
];

const statusNewOptions = [
    { key: '시작전', value: '시작전', text: '시작전' }
];

const locationCode = [
    { key: '', value: '', text: '' },
    { key: 'IC', value: 'IC', text: '이천' },
    { key: 'CJ', value: 'CJ', text: '청주' },
    { key: 'US', value: 'US', text: '울산' },
    { key: 'GM', value: 'GM', text: '구미' },
];

const departmentCode = [
    { key: '', value: '', text: '' },
    { key: 'DEV', value: 'DEV', text: '개발' },
    { key: 'MNG', value: 'MNG', text: '기획' },
];

const RecruitPopup = ({ openPopup, clickClose, recruitInfo, handleInputChange, handleDateChange, popupType, saveContent, handleSelectChange, handleNoticeStatusChange}) => {

    return (
        <Modal
        style={{position: 'static', zIndex: 0}} 
        open={openPopup}
        >
            <Modal.Header>{`모집공고 ${popupType}`}<Icon style={{"cursor":"pointer", "float":"right"}} onClick={clickClose} name="close"/></Modal.Header>
            <Modal.Content>
                <Modal.Description>
                <Table celled padded>
                <Table.Body> 
                    <Table.Row>
                        <Table.Cell className="cell_th">공고명<span className="asterisk">*</span></Table.Cell>
                        <Table.Cell colSpan='3'><Input name="noticeName" style={{"width":"100%"}} value={recruitInfo.noticeName} onChange={handleInputChange}/></Table.Cell>
                    </Table.Row>
                    {/* <Table.Row>
                        <Table.Cell className="cell_th">내용<span className="asterisk">*</span></Table.Cell>
                        <Table.Cell colSpan='3'><Form><TextArea value="asdadasdasdad고이름" /></Form></Table.Cell>
                    </Table.Row> */}
                    <Table.Row>
                        <Table.Cell className="cell_th">지역<span className="asterisk">*</span></Table.Cell>
                        <Table.Cell className="width_320px"><Select className="width_100pc" name="location" disabled={popupType==="수정"? true : false} value={recruitInfo.serialNumber.split("-")[2]} placeholder="선택" options={locationCode} onChange={handleSelectChange}></Select></Table.Cell>
                        <Table.Cell className="cell_th">채용분야<span className="asterisk">*</span></Table.Cell>
                        <Table.Cell className="width_320px"><Select className="width_100pc" name="department" disabled={popupType==="수정"? true : false} value={recruitInfo.serialNumber.split("-")[1]} placeholder="선택" options={departmentCode} onChange={handleSelectChange}></Select></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell className="cell_th">공고시작일<span className="asterisk">*</span></Table.Cell>
                        <Table.Cell className="width_320px" name="noticeStartDatetime"><DatePicker dateFormat="yyyy-MM-dd" className="datepicker_input" showMonthDropdown showYearDropdown dropdownMode="select" value={dateBarFormat(recruitInfo.noticeStartDatetime)} onChange={handleDateChange} /></Table.Cell>
                        <Table.Cell className="cell_th">공고종료일<span className="asterisk">*</span></Table.Cell>
                        <Table.Cell className="width_320px" name="noticeEndDatetime"><DatePicker dateFormat="yyyy-MM-dd" className="datepicker_input" showMonthDropdown showYearDropdown dropdownMode="select" value={dateBarFormat(recruitInfo.noticeEndDatetime)} onChange={handleDateChange} /></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell className="cell_th">서류결과발표일</Table.Cell>
                        <Table.Cell className="width_320px" name="documentResultDate"><DatePicker dateFormat="yyyy-MM-dd" className="datepicker_input" showMonthDropdown showYearDropdown dropdownMode="select" value={dateBarFormat(recruitInfo.documentResultDate)} onChange={handleDateChange} /></Table.Cell>
                        <Table.Cell className="cell_th">면접결과발표일</Table.Cell>
                        <Table.Cell className="width_320px" name="interviewResultDate"><DatePicker dateFormat="yyyy-MM-dd" className="datepicker_input" showMonthDropdown showYearDropdown dropdownMode="select" value={dateBarFormat(recruitInfo.interviewResultDate)} onChange={handleDateChange} /></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell className="cell_th">비고</Table.Cell>
                        <Table.Cell colSpan='3'><Form><TextArea  style={{ "minHeight": "300", "resize": "none" }}  name="description" value={recruitInfo.description || ""} onChange={handleInputChange} /></Form></Table.Cell>
                    </Table.Row>
                    <Table.Row style={{"border":"2px"}}>
                        <Table.Cell className="cell_th">공고상태<span className="asterisk">*</span></Table.Cell>
                        <Table.Cell colSpan='3'><Select name="noticeStatus" className="width_39pc" placeholder="선택" value={recruitInfo.noticeStatus} options={popupType==="등록" ? statusNewOptions : statusOptions} onChange={handleNoticeStatusChange}/></Table.Cell>
                    </Table.Row>
                </Table.Body>
                </Table>


                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color="red" icon labelPosition='right' onClick={clickClose}>
                    닫기<Icon name='window close outline' />
                </Button>
                <Button color="green" icon labelPosition='right' onClick={saveContent}>
                    저장<Icon name='save' />
                </Button>
            </Modal.Actions>
        </Modal>
    )

}

export default RecruitPopup;