/**
 * Created by Dominik Schwarz on 20.09.2017.
 */
import { combineReducers } from 'redux';
import auth from './auth';
import { quests } from './quests';

const rootReducer = combineReducers({
    auth,
    quests
});

export default rootReducer;
