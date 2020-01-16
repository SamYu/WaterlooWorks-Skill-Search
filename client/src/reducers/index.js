import { combineReducers } from 'redux';
import * as jobReducers from './jobReducers';
import * as userReducers from './userReducers';

export default combineReducers({ ...jobReducers, ...userReducers });
