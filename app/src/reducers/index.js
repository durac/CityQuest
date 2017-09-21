/**
 * Created by Dominik Schwarz on 20.09.2017.
 */
import { combineReducers } from 'redux';
import auth from './auth';

const rootReducer = combineReducers({
    auth
});

export default rootReducer;
