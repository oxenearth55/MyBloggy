
import { combineReducers } from 'redux';
import blog from './blog';
import alert from './alert';
import auth from './auth';

export default combineReducers({
    blog,
    alert,
    auth
});