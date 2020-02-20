import React, { Component } from 'react';
import { Modal, Table, Icon, 
         Form, Input, TextArea, 
         Button, Radio, Dropdown } from 'semantic-ui-react'

const QnaContentPopup = ({openPopup, clickClose, qnaInfo, changePopupContent, qnaCategoryCode, popupType, saveContent, changePopupCategory}) => {

    return (
        <Modal
            style={{position: 'static', zIndex: 0}} 
            open={openPopup}>
                <Modal.Header>{`1:1 문의답변 ${popupType}`}<Icon style={{"cursor":"pointer", "float":"right"}} onClick={clickClose} name="close"/></Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Table celled padded>
                            <Table.Body> 
                                <Table.Row style={{"border":"2px"}}>
                                    <Table.Cell className="cell_th">카테고리</Table.Cell>
                                    <Table.Cell colSpan='3'>{qnaInfo.qnaCategory}
                                    </Table.Cell>
                                </Table.Row>
                                <Table.Row style={{"border":"2px"}}>
                                    <Table.Cell className="cell_th">질문</Table.Cell>
                                    <Table.Cell colSpan='3'>{qnaInfo.qnaQuestion}</Table.Cell>
                                </Table.Row>
                                <Table.Row>
                                    <Table.Cell className="cell_th">답변<span className="asterisk">*</span></Table.Cell>
                                    <Table.Cell colSpan='3'><Form><TextArea name="qnaAnswer" style={{"width":"100%", "height":"200px", "resize":"none"}} onChange={changePopupContent} value={qnaInfo.qnaAnswer || ''}></TextArea></Form></Table.Cell>
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

export default QnaContentPopup;