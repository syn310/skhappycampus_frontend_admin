import React, { Component } from 'react';
import { Modal, Table, Icon, 
        Form, Input, TextArea, Grid,
        Button, Radio, Select} from 'semantic-ui-react'


const MenuApplicant = ({appMenuData, clickTitle, clickNew}) => {

        return ( 
            <div>
                <Table celled>
                    <Table.Header>
                        <Table.Row>
                            <Table.HeaderCell textAlign="center" style={{"width":"80px"}}>메뉴ID</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center">메뉴명</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center">URL</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center" style={{"width":"100px"}}>상단메뉴ID</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center" style={{"width":"80px"}}>메뉴<br/>사용여부</Table.HeaderCell>
                            <Table.HeaderCell textAlign="center" style={{"width":"80px"}}>퀵메뉴<br/>사용여부</Table.HeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>    
                        { 
                            appMenuData.map((obj, idx) => {
                            return (
                                        <Table.Row key={obj.menuId}>
                                            <Table.Cell textAlign="center">{obj.menuId}</Table.Cell>
                                            <Table.Cell textAlign="center"><span data-menuid={obj.menuId} onClick={clickTitle} className="cell_title">{obj.menuName}</span></Table.Cell>
                                            <Table.Cell textAlign="center">{`${obj.url}${obj.subUrl||""}`}</Table.Cell>
                                            <Table.Cell textAlign="center">{obj.parent}</Table.Cell>
                                            <Table.Cell textAlign="center">{obj.useYn==="Y" ? <Icon color="green" name="check circle"></Icon> : undefined }</Table.Cell>
                                            <Table.Cell textAlign="center">{obj.mainShowYn==="Y" ? <Icon color="green" name="check circle"></Icon> : undefined }</Table.Cell>
                                        </Table.Row>
                                    );
                            }) 
                        }
                    </Table.Body>
                </Table>
                <Grid>
                    <Grid.Column textAlign='right'>
                        <Button color='blue' onClick={clickNew}>등록</Button>
                    </Grid.Column>
                </Grid>
            </div>
         );
    }

 
export default MenuApplicant;
