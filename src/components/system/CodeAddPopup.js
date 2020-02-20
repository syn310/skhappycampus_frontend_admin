import React from 'react';
import { Modal, Table, Icon, Form, Input, TextArea, Button, Radio, Select} from 'semantic-ui-react'
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
const CodeAddPopup = ({openPopup, closePopup, handleInputChange, handleSelectChange, onSave}) => {

    return (
        <Modal
        style={{position: 'static', zIndex: 0}} 
        open={openPopup}
        >
            <Modal.Header>그룹코드 추가<Icon style={{"cursor":"pointer", "float":"right"}} onClick={closePopup} name="close"/></Modal.Header>
                <Modal.Content>
                    <Modal.Description><Table celled padded>
                <Table.Body> 
                    <Table.Row style={{"border":"2px"}}>
                        <Table.Cell className="cell_th">그룹코드<span className="asterisk">*</span></Table.Cell>
                        <Table.Cell colSpan='2'><Input name="groupName" maxLength="100" style={{"width":"100%"}} onChange={handleInputChange}/></Table.Cell>
                    </Table.Row>
                    <Table.Row style={{"border":"2px"}}>
                        <Table.Cell className="cell_th">코드명<span className="asterisk">*</span></Table.Cell>
                        <Table.Cell colSpan='2'><Input name="codeName" maxLength="100" style={{"width":"100%"}} onChange={handleInputChange}/></Table.Cell>
                    </Table.Row>
                    <Table.Row style={{"border":"2px"}}>
                        <Table.Cell className="cell_th">코드값<span className="asterisk">*</span></Table.Cell>
                        <Table.Cell colSpan='2'><Input name="codeValue" maxLength="100" style={{"width":"100%"}} onChange={handleInputChange}/></Table.Cell>
                    </Table.Row>
                    <Table.Row style={{"border":"2px"}}>
                        <Table.Cell className="cell_th">순서<span className="asterisk">*</span></Table.Cell>
                        <Table.Cell colSpan='2'>
                            <Select name="codeOrder" placeholder="선택" options={statusOptions} fluid onChange={handleSelectChange}/>
                        </Table.Cell>
                    </Table.Row>
                </Table.Body>
                </Table>
                </Modal.Description>
            </Modal.Content>
            <Modal.Actions>
                <Button color="red" icon labelPosition='right'onClick={closePopup}>
                    닫기<Icon name='window close outline' />
                </Button>
                <Button color="green" icon labelPosition='right' onClick={onSave}>
                    저장<Icon name='save' />
                </Button>
            </Modal.Actions>
                   
        </Modal>
    )

}

export default CodeAddPopup;
