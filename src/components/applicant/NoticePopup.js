

import React from 'react';
import { Modal, Table, Icon, Form, Input, TextArea, Button, Radio, Select} from 'semantic-ui-react'

const statusOptions = [
    { key: '일반', value: '일반', text: '일반' },
    { key: '기타', value: '기타', text: '기타' },
];
/** 공지사항 등록/수정 팝업 */
const NoticePopup = ({openPopup, clickClose, noticeInfo, handleInputChange,handleSemanticChange 
                    , radioChange, onSave, onAdd}) => {
    return (
        <Modal
        style={{position: 'static', zIndex: 0}} 
        open={openPopup}
        >
            <Modal.Header>{noticeInfo.noticeSeq === ''?'공지사항 등록':'공지사항 수정'}<Icon style={{"cursor":"pointer", "float":"right"}} onClick={clickClose} name="close"/></Modal.Header>
            <Modal.Content>
                <Modal.Description>
                    <Table celled padded>
                        <Table.Body> 
                            <Table.Row>
                                <Table.Cell className="cell_th">카테고리<span className="asterisk">*</span></Table.Cell>
                                <Table.Cell colSpan='3'>
                                    <Select name="noticeCategory" placeholder="선택" 
                                    value={noticeInfo.noticeCategory} 
                                    options={statusOptions} 
                                    onChange={handleSemanticChange}/>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell className="cell_th">제목<span className="asterisk">*</span></Table.Cell>
                                <Table.Cell colSpan='3'><Input name="noticeTitle" maxLength="35" style={{"width":"100%"}} value={noticeInfo.noticeTitle} onChange={handleInputChange}/></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell className="cell_th">내용<span className="asterisk">*</span></Table.Cell>
                                <Table.Cell colSpan='3'><Form><TextArea name="noticeContent" maxLength="1000" style={{minHeight: 150}} value={noticeInfo.noticeContent} onChange={handleInputChange}/></Form></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell className="cell_th">지원자 공지여부<span className="asterisk">*</span></Table.Cell>
                                <Table.Cell colSpan='3'>
                                        <Radio
                                            className='margin_right_10'
                                            label='예'
                                            name='applicantYn'
                                            value='Y'
                                            checked={noticeInfo.applicantYn==="Y"}
                                            // checked={noticeInfo.applicantYn === 'Y'?true:false} 
                                            onChange={radioChange}
                                        ></Radio>
                                        <Radio
                                            label='아니오'
                                            name='applicantYn'
                                            value='N'
                                            checked={noticeInfo.applicantYn==="N"}
                                            // checked={noticeInfo.applicantYn === 'N'?true:false}
                                            onChange={radioChange}
                                        ></Radio>
                                </Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell className="cell_th">협력사 공지여부<span className="asterisk">*</span></Table.Cell>
                                <Table.Cell colSpan='3' >
                                        <Radio
                                            className='margin_right_10'
                                            label='예'
                                            name='bpYn'
                                            value='Y'
                                            checked={noticeInfo.bpYn==="Y"}
                                            onChange={radioChange}
                                        ></Radio>
                                        <Radio
                                            label='아니오'
                                            name='bpYn'
                                            value='N'
                                            checked={noticeInfo.bpYn==="N"}
                                            // checked={noticeInfo.bpYn === 'N'?true:false}
                                            onChange={radioChange}
                                        ></Radio>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
                </Modal.Description>
        </Modal.Content>
        <Modal.Actions>
            <Button color="red" icon labelPosition='right'onClick={clickClose}>
                닫기<Icon name='window close outline' />
            </Button>
            <Button color="green" icon labelPosition='right' onClick={noticeInfo.noticeSeq === ''?onAdd: onSave }>
                저장<Icon name='save' />
            </Button>
        </Modal.Actions>
                   
        </Modal>
    )

}

export default NoticePopup;
