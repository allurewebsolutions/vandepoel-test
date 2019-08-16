// all reducers are combined into one index reducer
import {combineReducers} from 'redux';
import users from './users';

export default combineReducers({users});
