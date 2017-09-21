/**
 * Created by Dominik Schwarz on 20.09.2017.
 */
import { combineReducers } from 'redux';
import auth from './auth';
import {fixedQuests} from './quests';

const rootReducer = combineReducers({
    auth,
    fixedQuests
});

export default rootReducer;
