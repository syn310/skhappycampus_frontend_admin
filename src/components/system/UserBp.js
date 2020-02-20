

import React from 'react';
import { Table, Icon, Button, Dropdown} from 'semantic-ui-react'

import dateTimeFormat from 'lib/dateTimeFormat';/** 날짜 포맷 변경 공통함수 */

const UserApplicant = ({bpList, onButtonChange, onSelectChange, onSave, onCancelAccount, bpPermissionCode}) => {
    return (
            <Table celled singleLine>
                {/* Header 시작 */}
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign="center">NO.</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">회사</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">아이디</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">가입일시</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">가입승인여부</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">권한부여</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center"></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {/* Header 끝 */}
                {/* Body 시작 */}
                <Table.Body>
                {bpList.length > 0 ?  
                    bpList.map((object, i) => {
                        return (
                            <Table.Row key={i}>
                                <Table.Cell textAlign="center">{i+1}</Table.Cell>
                                <Table.Cell textAlign="center">{object.companyId}</Table.Cell>
                                <Table.Cell textAlign="center">{object.userId}</Table.Cell>
                                <Table.Cell textAlign="center">{dateTimeFormat(object.createDatetime)}</Table.Cell>
                                <Table.Cell textAlign="center">
                                    <Button.Group>
                                        <Button positive={object.aprvCompleteYn === 'Y'? false: true} value="N" name="aprvCompleteYn" data-userid={object.userId} onClick={onButtonChange}>미승인</Button>
                                        <Button.Or />
                                        <Button positive={object.aprvCompleteYn === 'Y'? true: false} value="Y" name="aprvCompleteYn" data-userid={object.userId} onClick={onButtonChange}>승인</Button>
                                    </Button.Group>
                                </Table.Cell>
                                <Table.Cell textAlign="center">
                                    <div style={{"width":"140px", "display":"inline-block"}}>
                                    <Dropdown style={{"top":"1px"}}
                                        selection
                                        fluid
                                        placeholder="선택" 
                                        options={bpPermissionCode} 
                                        name="managerYn" 
                                        value={object.managerYn}
                                        onChange={onSelectChange} 
                                        data-userid={object.userId}
                                    ></Dropdown>
                                    </div>
                                </Table.Cell>
                                <Table.Cell textAlign="center">
                                    <Button icon color='red' data-userid={object.userId} onClick={onCancelAccount}><Icon name='trash alternate'/>탈퇴</Button>
                                </Table.Cell>
                            </Table.Row>
                        );
                }) 
                : <Table.Row >
                    <Table.Cell colSpan='7'  textAlign="center">데이터가 존재하지 않습니다.</Table.Cell>
                </Table.Row>
                }
                </Table.Body>
                {/* Body 끝 */}
                <Table.Footer >
                    <Table.Row >
                        <Table.HeaderCell colSpan='7' >
                            <Button color='blue' floated='right' onClick={onSave}>저장</Button>
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
    )

}

export default UserApplicant;
