import React, { Component } from 'react';
import { Modal, Table, Icon, Form, Input, TextArea, Button, Radio, Select} from 'semantic-ui-react'


const MenuPopup = ({openPopup, clickClose, menuInfo, tabIndex, inputChange, radioChange, saveContent, popupType, menuIdList, handleSelectChange}) => {

    const filterCurrentId = () => {
        _.remove(menuIdList, (obj)=>{
            return obj.value==menuInfo.menuId
        })
        return menuIdList;
    }

    return (
        <Modal 
            open={openPopup}
            size="large"
            style={{position: 'static', zIndex: 0}} >
            <Modal.Header>{`메뉴 ${popupType}`}<Icon style={{"cursor":"pointer", "float":"right"}} onClick={clickClose} name="close"/></Modal.Header>
            <Modal.Content>
                <Modal.Description>
                <Table celled padded>
                <Table.Body> 
                    <Table.Row>
                        <Table.Cell className="cell_th">메뉴사용여부<span className="asterisk">*</span></Table.Cell>
                        <Table.Cell className="" colSpan='2'>
                            <Radio  className='margin_right_10'
                                    label='예'
                                    name='useYn'
                                    value='Y'
                                    onChange={radioChange}
                                    checked={menuInfo.useYn==="Y"}
                            />
                            <Radio  label='아니오'
                                    name='useYn'
                                    value='N'
                                    onChange={radioChange}
                                    checked={menuInfo.useYn==="N"}

                            />
                        </Table.Cell>
                        <Table.Cell className="cell_th">메뉴표시여부<span className="asterisk">*</span></Table.Cell>
                        <Table.Cell className="" colSpan='2'>
                            <Radio  className='margin_right_10'
                                    label='예'
                                    name='showYn'
                                    value='Y'
                                    onChange={radioChange}
                                    checked={menuInfo.showYn==="Y"}
                            />
                            <Radio  label='아니오'
                                    name='showYn'
                                    value='N'
                                    onChange={radioChange}
                                    checked={menuInfo.showYn==="N"}
                            />
                        </Table.Cell>                        
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell className="cell_th">메뉴ID<span className="asterisk">*</span></Table.Cell>
                        <Table.Cell className="" colSpan='2'><Input className="width_100pc" value={menuInfo.menuId} disabled /></Table.Cell>
                        <Table.Cell className="cell_th">구분<span className="asterisk">*</span></Table.Cell>
                        <Table.Cell className="" colSpan='2'><Input className="width_100pc" value={ tabIndex == 0 ? "지원자" : "협력사"} disabled /></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell className="cell_th">메뉴명<span className="asterisk">*</span></Table.Cell>
                        <Table.Cell className="" colSpan='2'><Input className="width_100pc" name="menuName" onChange={inputChange} value={menuInfo.menuName} /></Table.Cell>
                        <Table.Cell className="cell_th">URL<span className="asterisk">*</span></Table.Cell>
                        <Table.Cell className="" colSpan='2'><Input className="width_100pc" placeholder="ex) /url" name="url" onChange={inputChange} value={menuInfo.url} /></Table.Cell>
                    </Table.Row>
                    <Table.Row>
                        <Table.Cell className="cell_th">로그인필요여부<span className="asterisk">*</span></Table.Cell>
                        <Table.Cell className="" colSpan='5'>
                            <Radio  className='margin_right_10'
                                    label='예'
                                    name='needLoginYn'
                                    value='Y'
                                    onChange={radioChange}
                                    checked={menuInfo.needLoginYn==="Y"}
                            />
                            <Radio  label='아니오'
                                    name='needLoginYn'
                                    value='N'
                                    onChange={radioChange}
                                    checked={menuInfo.needLoginYn==="N"}
                            />
                        </Table.Cell>
                    </Table.Row>                    
                    <Table.Row>
                        <Table.Cell className="cell_th">Sub메뉴여부<span className="asterisk">*</span></Table.Cell>
                        <Table.Cell className="" colSpan='5'>
                            <Radio  className='margin_right_10'
                                    label='예'
                                    name='subMenuYn'
                                    value='Y'
                                    onChange={radioChange}
                                    checked={menuInfo.subMenuYn==="Y"}
                            />
                            <Radio  label='아니오'
                                    name='subMenuYn'
                                    value='N'
                                    onChange={radioChange}
                                    checked={menuInfo.subMenuYn==="N"}

                            />
                        </Table.Cell>
                    </Table.Row>
                    {
                        menuInfo.subMenuYn === "Y" ?
                        <Table.Row>
                            <Table.Cell className="cell_th">Sub URL<span className="asterisk">*</span></Table.Cell>
                            <Table.Cell className=""><Input className="width_100pc" placeholder="ex) /suburl" name="subUrl" onChange={inputChange} value={menuInfo.subUrl} /></Table.Cell>
                            <Table.Cell className="cell_th">상단메뉴ID<span className="asterisk">*</span></Table.Cell>
                            <Table.Cell className="">
                                <Select name="parent" className="width_100pc" placeholder="선택" value={menuInfo.parent} options={filterCurrentId()} onChange={handleSelectChange}/>
                            </Table.Cell>
                            <Table.Cell className="cell_th">순서<span className="asterisk">*</span></Table.Cell>
                            <Table.Cell className=""><Input className="width_100pc" name="ord" onChange={inputChange} value={menuInfo.ord||""} /></Table.Cell>
                        </Table.Row>
                            :
                        undefined
                    }

                    <Table.Row>
                        <Table.Cell className="cell_th">메인퀵메뉴<span className="asterisk">*</span></Table.Cell>
                        <Table.Cell className="" colSpan='5'>
                            <Radio  className='margin_right_10'
                                    label='예'
                                    name='mainShowYn'
                                    value='Y'
                                    onChange={radioChange}
                                    checked={menuInfo.mainShowYn==="Y"}
                            />
                            <Radio  label='아니오'
                                    name='mainShowYn'
                                    value='N'
                                    onChange={radioChange}
                                    checked={menuInfo.mainShowYn==="N"}
                            />
                            <span className="margin_left_10" style={{"fontWeight":"300", "color":"red"}}>※메인퀵메뉴는 3개까지 설정가능합니다</span>
                        </Table.Cell>
                    </Table.Row>
                    {
                        menuInfo.mainShowYn === "Y" ?
                        <Table.Row>
                        <Table.Cell className="cell_th">퀵메뉴소개<span className="asterisk">*</span>(html형태 한문장)</Table.Cell>
                        <Table.Cell colSpan='5'><Form><TextArea placeholder="ex) 미래의 구성원을<br/>만나보세요" style={{ "minHeight": "300", "resize": "none" }}  name="mainDescription" value={menuInfo.mainDescription || ""} onChange={inputChange} /></Form></Table.Cell>
                        </Table.Row>
                            : 
                        undefined
                    }
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

export default MenuPopup;