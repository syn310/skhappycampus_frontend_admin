import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import {dateFormat, dateBarFormat} from 'lib/dateFormat';
import { Table, Container, Input, Radio } from 'semantic-ui-react';

//자격증
const RegistExtraCert = ({extraCertArr}) => {

    const generateTableTr = extraCertArr => {
        return extraCertArr.map(
            (obj, idx) => {
                return (
                    <Table.Row key={obj.certificateSeq} data-row={obj.certificateSeq}>
                        <Table.Cell className=""><Input type="text" className="text_inp_100pc height_25" disabled value={obj.certificateContent||""}/></Table.Cell>
                        <Table.Cell className=""><Input type="text" className="text_inp_100pc height_25" disabled value={dateBarFormat(obj.certificateDate || "" )}/></Table.Cell>
                        <Table.Cell className=""><Input type="text" className="text_inp_100pc height_25" disabled value={obj.certificateGrade|| ""}/></Table.Cell>
                        <Table.Cell className=""><Input type="text" className="text_inp_100pc height_25" disabled value={obj.certificateOrganization|| ""}/></Table.Cell>
                                
                    </Table.Row>
                )
            }
        )
    }


    return(
        <div>
            <Table celled compact>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell textAlign="center">자격 및 내역</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">취득날짜</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">등급</Table.HeaderCell>
                        <Table.HeaderCell textAlign="center">발급기관</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    { extraCertArr && extraCertArr.length != 0 ? generateTableTr(extraCertArr) : undefined}
                </Table.Body>
            </Table>
            {/* <table id="extraCertTable" className="apply_step4_table2_contents">
                <colgroup>
                    <col width="409px" />
                    <col width="126px" />
                    <col width="126px" />
                    <col width="273px" />
                </colgroup>
                <tbody>
                    <tr>
                        <th scope="row">자격 및 내역</th>
                        <th scope="row">취득날짜</th>
                        <th scope="row">등급</th>
                        <th scope="row" style={{"borderRight": "0"}}>발급기관</th>
                    </tr>
                    { extraCertArr && extraCertArr.length != 0 ? generateTableTr(extraCertArr) : undefined}
                </tbody>
            </table> */}
        </div>
    )


}

export default RegistExtraCert;