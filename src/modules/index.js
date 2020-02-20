import { combineReducers } from 'redux';

import menu from './menu';
import auth from './auth';
import register from './register';
import recruit from './recruit';

export default combineReducers({

    menu,
    auth,
    register,
    recruit
})
