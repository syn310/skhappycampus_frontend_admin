import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

/*
 * 액션 타입 정의
 */
const SET_SERIAL_NUMBER = 'recruit/SET_SERIAL_NUMBER';
const SET_RECRUIT_INFO = 'recruit/SET_RECRUIT_INFO';
const SET_APPLY_USER_ID = 'recruit/SET_APPLY_USER_ID';


/*
 * 액션 생성 함수 정의
 */
export const setRecruitInfo = createAction(SET_RECRUIT_INFO);
export const setSerialNumber = createAction(SET_SERIAL_NUMBER);
export const setApplyUserId = createAction(SET_APPLY_USER_ID);
/*
 * 초기상태 정의
 */
const initialState = Map({
    serialNumber: "",
    recruitInfo: {},
    applyUserId:""
});


/*
 * reducer 작성
 */
export default handleActions({

    [SET_SERIAL_NUMBER] : (state, action) => {
        return state.set('serialNumber', action.payload)
    },
    [SET_RECRUIT_INFO] : (state, action) => {
        return state.set('recruitInfo', action.payload)
    },
    [SET_APPLY_USER_ID] : (state, action) => {
        return state.set('applyUserId', action.payload)
    },
    
}, initialState);
