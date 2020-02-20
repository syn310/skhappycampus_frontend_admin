import React from 'react';
import 'style/common.css';
import { Link, withRouter } from 'react-router-dom';
const path = require('path');
import { connect } from 'react-redux';
import * as menuActions from 'modules/menu';
import { bindActionCreators } from 'redux';
import storage from 'lib/storage';

class App extends React.Component {
    
  /** 화면 이동  */
  handleMoveTo = (e) => {
    const clickUrl =  e.currentTarget.getAttribute("data-url");
    this.props.history.push(e.currentTarget.getAttribute("data-url"));
  }

/** 로그인 여부에 따라 페이지 이동 */
componentWillMount  = () => {
    storage.isLogin() ? "":  this.props.history.push('/login');
}

//지원자 사이트 새창으로 열기
moveToApplicant = () => {
    window.open('https://skhappycampus.com', '_blank')
}
  
//협력사 사이트 새창으로 열기(TODO: 협력사 사이트 도메인 정해지면 url 변경하시기 바랍니다.)
moveToBp = () => {
    window.open('https://skhappycampus.com', '_blank')
}

  render(){
        const { handleMoveTo } = this;
        return (
          <div className="contents">
            <div className="swiper-container">
                <div className="main_title" style={{"height":"430px"}}></div>
                <div className="sub_title"></div>
                <div className="menu_area">
                    <div className="menu_box">
                        <ul>
                            <li className="gt-f-l manu_box_recruit" data-url="/recruit" onClick={this.moveToApplicant} style={{marginRight: '40px'}}>
                                <div className="menu_box_text" >
                                    <div className="menu_box_main_title">지원자 사이트</div>
                                    <div className="menu_box_sub_title">지원자 사이트를<br />확인해보세요</div>
                                </div>
                            </li> 
                            <li className="gt-f-l manu_box_company" data-url="/company" onClick={this.moveToBp} style={{marginRight: '40px'}}>
                                <div className="menu_box_text">
                                    <div className="menu_box_main_title">협력사 사이트</div>
                                    <div className="menu_box_sub_title">협력사 사이트를<br />확인해보세요.</div>
                                </div>
                            </li> 
                            <li className="gt-f-l manu_box_qna" data-url="/question/qna" onClick={handleMoveTo}>
                                <div className="menu_box_text">
                                    <div className="menu_box_main_title">1:1문의</div>
                                    <div className="menu_box_sub_title clear">채용관련 문의를<br/>확인해보세요</div>
                                </div>
                            </li>
                            <li className="clear"></li>
                        </ul>
                    </div>
                </div>
            </div>
          </div>
        );
    }
}

export default withRouter(connect(
    (state) => ({
        clickedMenu: state.menu.get('clickedMenu'),
    }), (dispatch) => ({
        MenuActions : bindActionCreators(menuActions, dispatch)
    })
  )(App));
