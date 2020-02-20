import React from 'react';
import { Modal, Table, Icon, Form, Input, TextArea, Button, Radio, Select} from 'semantic-ui-react'

const MailTemplateContentPopup = ({openPopup, clickClose, tempInfo, changePopupContent, popupType, saveContent}) => {

    return (
        <Modal
            style={{position: 'static', zIndex: 0}} 
            open={openPopup}>
                <Modal.Header>{`메일 템플릿 ${popupType}`}<Icon style={{"cursor":"pointer", "float":"right"}} onClick={clickClose} name="close"/></Modal.Header>
                <Modal.Content>
                    <Modal.Description>
                        <Table celled padded>
                            <Table.Body> 
                                <Table.Row>
                                    <Table.Cell className="cell_th">템플릿</Table.Cell>
                                    <Table.Cell colSpan='3'><Form><TextArea name="template" style={{"width":"100%", "height":"200px", "resize":"none"}}
                                     onChange={changePopupContent} value={tempInfo.template}></TextArea></Form></Table.Cell>
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

export default MailTemplateContentPopup;