import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import axios from 'axios';
import * as authActions from 'modules/auth';
import * as menuActions from 'modules/menu';
import storage from 'lib/storage';
import { isEmail } from 'validator'; //문자열 검증
import devtest from 'lib/devtest';
import { Button, Form, Grid, Header, Segment, Icon } from 'semantic-ui-react';
class LoginContainer extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            applyUserId: "",
            inputId:"",
            inputPw:"",
        }
    }

    handleInputChange = (e) => {
        let input = {};
        input[e.target.name] = e.target.value;
        this.setState(input);
    }

    /** 로그인 입력 Validation */
    handleValidate = () => {
        const { inputId, inputPw } = this.state;
        if(!(inputId.length > 0 && inputPw.length > 0 )){
            alert("아이디 혹은 패스워드를 입력하세요.")
            return false;
        }
        if(!isEmail(inputId)) {
            alert('잘못된 이메일 형식 입니다.');
            return false;
        }
        return true;
    }

    /** 로그인 */
    handleClickLogin = () => {

        const { AuthActions, MenuActions } = this.props;
        const { inputId, inputPw } = this.state;
        const { handleMoveToMain } = this;

        if(this.handleValidate()){
            axios({
                url: devtest() +`/login/`,
                method : 'post',
                headers: { "Pragma": 'no-cache' },
                data : {
                    userId: inputId,
                    userPassword: inputPw
                }
            }).then(
                (res)=>{
                    alert("로그인 되었습니다.")
                    //sessionStorage에 userInfo key의 데이터 추가
                    storage.setSessionObj(res.headers);

                    //store의 login데이터 setting
                    AuthActions.login(res.headers);

                    //메인 화면으로 이동
                    handleMoveToMain();
                }
            ).catch(function(e) {
            });
        }
    }

    /** 회원가입 페이지 이동 */
    handleMoveToRegister = () => {
        this.props.history.push("/register")
    }

    /** 메인 페이지 이동 */
    handleMoveToMain = () => {
        this.props.history.push("/");
    }
    /** Enter Key입력시 로그인 동작 */
    handleKeyPress = (e) => {
        if(e.charCode === 13){
            this.handleClickLogin();
        }
    }

    render() {

        const { handleInputChange,
                handleClickLogin,
                handleMoveToRegister,
                handleKeyPress } = this;

        return (
        <div>
            <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
                <Grid.Column style={{ maxWidth: 450 }}>
                    <Header as='h2' textAlign='center' style={{color: "#C5C5C5"}}>
                        <Icon name='user' style={{color: "#C5C5C5"}}/> Log-in to your account
                    </Header>
                    <Form size='large'>
                        <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' name='inputId' onChange={handleInputChange}/>
                        <Form.Input
                            fluid
                            icon='lock'
                            iconPosition='left'
                            placeholder='Password'
                            type='password'
                            name='inputPw'
                            onChange={handleInputChange}
                        />

                        <Button fluid size='large' onClick={handleClickLogin} onKeyPress={handleKeyPress}>
                            Login
                        </Button>
                        </Segment>
                    </Form>
                    <br/>
                    <Button basic fluid size='large' onClick={handleMoveToRegister}>
                        Sign Up
                    </Button>
                </Grid.Column>
            </Grid>
        </div>
         );
    }
}

export default connect(
    (state) => ({
        userId : state.auth.get("userId"),
        clickedMenu: state.menu.get('clickedMenu'),
        isLogin: state.auth.get("isLogin")
    }), (dispatch) => ({
        AuthActions: bindActionCreators(authActions, dispatch),
        MenuActions: bindActionCreators(menuActions, dispatch),
        
    })
)(LoginContainer);
