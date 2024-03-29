/**
 * Created by Dominik Schwarz on 20.09.2017.
 */
import { combineReducers } from 'redux';
import auth from './auth';
import quests from './quests';
import questStation from './questStation';

const rootReducer = combineReducers({
    questStation,
    auth,
    quests
});

export default rootReducer;
