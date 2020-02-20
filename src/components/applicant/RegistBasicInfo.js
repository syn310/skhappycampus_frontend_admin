import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import {dateFormat, dateBarFormat} from 'lib/dateFormat';
import { Table, Container, Input, Radio } from 'semantic-ui-react';

//개인정보
const RegistBasicInfo = ({basicInfo}) => {

    return (

        <Table celled compact>
            <Table.Body>
            <Table.Row style={{"border":"2px"}}>
                <Table.Cell className="cell_th">아이디</Table.Cell>
                <Table.Cell className="width_320px"><Input type="text" name="applyUserId" className="text_inp_100pc height_25" disabled value={basicInfo.applyUserId}/></Table.Cell>
                <Table.Cell className="cell_th">성명</Table.Cell>
                <Table.Cell className="width_320px"><Input type="text" name="applyName" className="text_inp_100pc height_25" disabled value={basicInfo.applyName}></Input></Table.Cell>
            </Table.Row>
            <Table.Row style={{"border":"2px"}}>
                <Table.Cell className="cell_th">국적</Table.Cell>
                <Table.Cell><Input type="text" name="applyNationality" className="text_inp_100pc height_25" disabled value={basicInfo.applyNationality}/></Table.Cell>
                <Table.Cell className="cell_th">생년월일</Table.Cell>
                <Table.Cell><Input type="text" name="applyBirth" className="text_inp_100pc height_25" disabled value={dateBarFormat(basicInfo.applyBirth)}></Input></Table.Cell>
            </Table.Row>
            <Table.Row style={{"border":"2px"}}>
                <Table.Cell className="cell_th">성별</Table.Cell>
                <Table.Cell>
                    <Radio
                        className='margin_right_10'
                        label='남'
                        name='applyGender'
                        checked={basicInfo.applyGender === "남" ? true : false}
                        value='남'
                        disabled
                    ></Radio>
                    <Radio
                        label='여'
                        name='applyGender'
                        checked={basicInfo.applyGender === "여" ? true : false}
                        value='여'
                        disabled
                    ></Radio>
                </Table.Cell>
                <Table.Cell className="cell_th">전화번호</Table.Cell>
                <Table.Cell><Input type="text" name="applyPhone" className="text_inp_100pc height_25" disabled value={basicInfo.applyPhone}></Input></Table.Cell>
            </Table.Row>
            <Table.Row style={{"border":"2px"}}>
                <Table.Cell className="cell_th">주소</Table.Cell>
                <Table.Cell colSpan="3"><Input type="text" name="applyAddress" className="text_inp_100pc height_25" disabled value={basicInfo.applyAddress}/></Table.Cell>
            </Table.Row>
            <Table.Row>
                <Table.Cell className="cell_th">장애여부</Table.Cell>
                <Table.Cell>
                    <Radio
                        className='margin_right_10'
                        label='예'
                        name='disabilityYn'
                        checked={basicInfo.disabilityYn === "예" ? true : false}
                        value='예'
                        disabled
                    ></Radio>
                    <Radio
                        label='아니오'
                        name='disabilityYn'
                        checked={basicInfo.disabilityYn === "아니오" ? true : false}
                        value='아니오'
                        disabled
                    ></Radio>
                </Table.Cell>
                <Table.Cell className="cell_th">병역여부</Table.Cell>
                <Table.Cell>
                    <Radio
                        className='margin_right_10'
                        label='해당사항없음'
                        name='militaryYn'
                        checked={basicInfo.militaryYn === "해당사항없음" ? true : false}
                        value='해당사항없음'
                        disabled
                    ></Radio>
                    <Radio
                        className='margin_right_10'
                        label='군필'
                        name='militaryYn'
                        checked={basicInfo.militaryYn === "군필" ? true : false}
                        value='군필'
                        disabled
                    ></Radio>
                    <Radio
                        className='margin_right_10'
                        label='면제'
                        name='militaryYn'
                        checked={basicInfo.militaryYn === "면제" ? true : false}
                        value='면제'
                        disabled
                    ></Radio>
                    <Radio
                        label='미필'
                        name='militaryYn'
                        checked={basicInfo.militaryYn === "미필" ? true : false}
                        value='미필'
                        disabled
                    ></Radio>
                </Table.Cell>
            </Table.Row>
            <Table.Row style={{"border":"2px"}}>
                <Table.Cell className="cell_th">보훈여부</Table.Cell>
                <Table.Cell colSpan="3">
                    <Radio
                        className='margin_right_10'
                        label='예'
                        name='veteransYn'
                        checked={basicInfo.veteransYn === "예" ? true : false}
                        value='예'
                        disabled
                    ></Radio>
                    <Radio
                        label='아니오'
                        name='veteransYn'
                        checked={basicInfo.veteransYn === "아니오" ? true : false}
                        value='아니오'
                        disabled
                    ></Radio>
                </Table.Cell>
            </Table.Row>
            </Table.Body>
        </Table>



    )


}

export default RegistBasicInfo;