

import React from 'react';
import { Modal, Table, Icon, Form, Input, TextArea, Button, Radio, Select} from 'semantic-ui-react'

const CodePopup = ({openPopup, closePopup, groupCode, handleInputChange, handleGroupCodeSave, onDelete}) => {

    return (
        <Modal
        style={{position: 'static', zIndex: 0}} 
        open={openPopup}
        >
            <Modal.Header>그룹코드 수정<Icon style={{"cursor":"pointer", "float":"right"}} onClick={closePopup} name="close"/></Modal.Header>
                <Modal.Content>
                    <Modal.Description><Table celled padded>
                <Table.Body> 
                    <Table.Row style={{"border":"2px"}}>
                        <Table.Cell className="cell_th">그룹코드<span className="asterisk">*</span></Table.Cell>
                        <Table.Cell colSpan='3'><Input name="groupName" maxLength="100" style={{"width":"100%"}} value={groupCode.groupName || ''} onChange={handleInputChange}/></Table.Cell>
                    </Table.Row>
                </Table.Body>
                </Table>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color="red" icon labelPosition='right'onClick={onDelete}>
                    삭제<Icon name='window close outline' />
                </Button>
                <Button color="green" icon labelPosition='right' onClick={handleGroupCodeSave}>
                    저장<Icon name='save' />
                </Button>
            </Modal.Actions>
                   
        </Modal>
    )

}

export default CodePopup;
