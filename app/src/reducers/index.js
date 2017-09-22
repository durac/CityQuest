/**
 * Created by Dominik Schwarz on 20.09.2017.
 */
import { combineReducers } from 'redux';
import auth from './auth';
import { quests, userQuests } from './quests';

const rootReducer = combineReducers({
    auth,
    quests,
    userQuests
});

export default rootReducer;
