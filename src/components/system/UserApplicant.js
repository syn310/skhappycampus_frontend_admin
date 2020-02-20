

import React from 'react';
import { Table, Icon, Button} from 'semantic-ui-react'

import dateTimeFormat from 'lib/dateTimeFormat';/** 날짜 포맷 변경 공통함수 */

const UserApplicant = ({userList, onCancelAccount}) => {

    return (
            <Table celled singleLine>
            {/* Header 시작 */}
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign="center">NO.</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">아이디</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">가입일시</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center"></Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                {/* Header 끝 */}
                {/* Body 시작 */}
                <Table.Body>    
                {userList.map((object, i) => {
                    return (
                        <Table.Row key={i}>
                            <Table.Cell textAlign="center">{i+1}</Table.Cell>
                            <Table.Cell textAlign="center">{object.userId}</Table.Cell>
                            <Table.Cell textAlign="center">{dateTimeFormat(object.createDatetime)}</Table.Cell>
                            <Table.Cell textAlign="center">
                                <Button icon color='red' data-user={object.userId} onClick={onCancelAccount}><Icon name='trash alternate'/>탈퇴</Button>
                            </Table.Cell>
                        </Table.Row>
                    );
                })}
                </Table.Body>
                {/* Body 끝 */}
                <Table.Footer >
                    <Table.Row >
                        <Table.HeaderCell colSpan='7' >
                            
                        </Table.HeaderCell>
                    </Table.Row>
                </Table.Footer>
            </Table>
    )

}

export default UserApplicant;
