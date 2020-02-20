import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import {dateBarFormat} from 'lib/dateFormat';
import { Table, Container, Input, Radio } from 'semantic-ui-react';


//학력정보
const RegistDegreeInfo = ({degreeInfoArr}) => {

    const generateSchoolList = schoolList => {
        return schoolList.map(
            (obj, idx) => {
                return (
                    <Table celled compact key={obj.educationSeq} data-tbl={obj.educationSeq}>
                        <Table.Body>
                            <Table.Row>
                                <Table.Cell className="cell_th">학력</Table.Cell>
                                <Table.Cell className="width_320px"><Input type="text" className="text_inp_100pc height_25" disabled value={obj.degree}/></Table.Cell>
                                <Table.Cell className="cell_th">졸업상태</Table.Cell>
                                <Table.Cell className="width_320px"><Input type="text" className="text_inp_100pc height_25" disabled value={obj.graduStatus}></Input></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell className="cell_th">입학날짜</Table.Cell>
                                <Table.Cell className="width_320px"><Input type="text" className="text_inp_100pc height_25" disabled value={dateBarFormat(obj.enterDateInfo)}/></Table.Cell>
                                <Table.Cell className="cell_th">{obj.graduStatus==="졸업예정" ? "졸업예정날짜":"졸업날짜"}</Table.Cell>
                                <Table.Cell className="width_320px"><Input type="text" className="text_inp_100pc height_25" disabled value={dateBarFormat(obj.graduDateInfo)}></Input></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell className="cell_th">학교</Table.Cell>
                                <Table.Cell className="width_320px">
                                    <Input type="text" className={obj.educationSeq==="1"? "text_inp_100pc height_25":"text_inp_47pc height_25 margin_right_5"} disabled value={obj.schoolName}/>
                                    {obj.educationSeq==="1"? 
                                        undefined
                                            : 
                                        <div className="apply_radio_area" style={{"display":"inline-block", "marginLeft":"5px"}}>
                                            <Radio
                                                className='margin_right_10'
                                                label='본교'
                                                name={`mainCampusYn${obj.educationSeq}`}
                                                checked={ obj[`mainCampusYn${obj.educationSeq}`] === "본교" ? true : false }
                                                value='본교'
                                                disabled
                                            ></Radio>
                                            <Radio
                                                className='margin_right_10'
                                                label='캠퍼스'
                                                name={`mainCampusYn${obj.educationSeq}`}
                                                checked={ obj[`mainCampusYn${obj.educationSeq}`] === "캠퍼스" ? true : false }
                                                value='캠퍼스'
                                                disabled
                                            ></Radio>
                                        </div>
                                    }
                                </Table.Cell>
                                <Table.Cell className="cell_th">전공</Table.Cell>
                                <Table.Cell className="width_320px"><Input type="text" className="text_inp_100pc height_25" disabled value={obj.major||""}></Input></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell className="cell_th">부전공</Table.Cell>
                                <Table.Cell className="width_320px"><Input type="text" className="text_inp_100pc height_25" disabled value={obj.minor||""}/></Table.Cell>
                                <Table.Cell className="cell_th">복수전공</Table.Cell>
                                <Table.Cell className="width_320px"><Input type="text" className="text_inp_100pc height_25" disabled value={obj.doubleMajor||""}></Input></Table.Cell>
                            </Table.Row>
                            <Table.Row>
                                <Table.Cell className="cell_th">학점</Table.Cell>
                                <Table.Cell className="width_320px">
                                    <Input type="text" className="text_inp_47pc height_25" disabled value={obj.grade||""}/> / 
                                    <Input type="text" className="text_inp_47pc margin_left_5 height_25" disabled value={obj.perfectGrade||""}/></Table.Cell>
                                <Table.Cell className="cell_th">편입여부</Table.Cell>
                                <Table.Cell className="width_320px">
                                    <Radio
                                        className='margin_right_10'
                                        label='예'
                                        name={`transferYn${obj.educationSeq}`}
                                        checked={ obj[`transferYn${obj.educationSeq}`] === "예" ? true : false }
                                        value='예'
                                        disabled
                                    ></Radio>
                                    <Radio
                                        className='margin_right_10'
                                        label='아니오'
                                        name={`transferYn${obj.educationSeq}`}
                                        checked={ obj[`transferYn${obj.educationSeq}`] === "아니오" ? true : false }
                                        value='아니오'
                                        disabled
                                    ></Radio>
                                </Table.Cell>
                            </Table.Row>
                        </Table.Body>
                    </Table>
               
                )
            }
        )
    }

    return(
        <div>
            {generateSchoolList(degreeInfoArr)} 
        </div>
    )


}

export default RegistDegreeInfo;