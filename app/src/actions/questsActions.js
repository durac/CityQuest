/**
 * Created by Dominik Schwarz on 21.09.2017.
 */
import { CALL_API } from '../middleware/api'
import * as schema from './schema';

export const AVAILABLE_QUESTS_REQUEST = 'AVAILABLE_QUESTS_REQUEST';
export const AVAILABLE_QUESTS_FAILURE = 'AVAILABLE_QUESTS_FAILURE';

export const FIXED_QUESTS_SUCCESS = 'FIXED_QUESTS_SUCCESS';
const fetchFixedQuests = () => {
    return {
        [CALL_API]: {
            types: [ AVAILABLE_QUESTS_REQUEST, FIXED_QUESTS_SUCCESS, AVAILABLE_QUESTS_FAILURE ],
            endpoint: 'activeFixedQuests',
            method: 'GET',
            schema: schema.arrayOfQuests,
            authenticatedRequest: false
        }
    }
};

export const loadFixedQuests = () => dispatch => {
    return dispatch(fetchFixedQuests())
};

export const EVENT_QUESTS_SUCCESS = 'EVENT_QUESTS_SUCCESS';
const fetchEventQuests = () => {
    return {
        [CALL_API]: {
            types: [ AVAILABLE_QUESTS_REQUEST, EVENT_QUESTS_SUCCESS, AVAILABLE_QUESTS_FAILURE ],
            endpoint: 'openedEventQuests',
            method: 'GET',
            schema: schema.arrayOfQuests,
            authenticatedRequest: false
        }
    }
};

export const loadEventQuests = () => dispatch => {
    return dispatch(fetchEventQuests())
};

export const USER_QUESTS_REQUEST = 'USER_QUESTS_REQUEST';
export const USER_QUESTS_FAILURE = 'USER_QUESTS_FAILURE';

export const USER_FIXED_QUESTS_SUCCESS = 'USER_FIXED_QUESTS_SUCCESS';
const fetchUserFixedQuests = () => {
    return {
        [CALL_API]: {
            types: [ USER_QUESTS_REQUEST, USER_FIXED_QUESTS_SUCCESS, USER_QUESTS_FAILURE ],
            endpoint: 'fixedQuestsOfUser',
            method: 'GET',
            schema: schema.arrayOfQuests,
            authenticatedRequest: true
        }
    }
};

export const loadUserFixedQuests = () => dispatch => {
    return dispatch(fetchUserFixedQuests())
};


export const USER_EVENT_QUESTS_SUCCESS = 'USER_EVENT_QUESTS_SUCCESS';
const fetchUserEventQuests = () => {
    return {
        [CALL_API]: {
            types: [ USER_QUESTS_REQUEST, USER_EVENT_QUESTS_SUCCESS, USER_QUESTS_FAILURE ],
            endpoint: 'eventQuestsOfUser',
            method: 'GET',
            schema: schema.arrayOfQuests,
            authenticatedRequest: true
        }
    }
};

export const loadUserEventQuests = () => dispatch => {
    return dispatch(fetchUserEventQuests())
};

export const REGISTER_QUEST_SUCCESS = 'REGISTER_QUEST_SUCCESS';
const registerForQuest = (questId) => {
    return {
        [CALL_API]: {
            types: [ USER_QUESTS_REQUEST, REGISTER_QUEST_SUCCESS, USER_QUESTS_FAILURE ],
            endpoint: 'registerForQuest?questId='+questId,
            method: 'POST',
            schema: schema.quest,
            authenticatedRequest: true
        }
    }
};

export const postRegisterForQuest = (questId) => dispatch => {
    return dispatch(registerForQuest(questId))
};

export const UNREGISTER_QUEST_SUCCESS = 'UNREGISTER_QUEST_SUCCESS';
const unregisterFromQuest = (questId) => {
    return {
        [CALL_API]: {
            types: [ USER_QUESTS_REQUEST, UNREGISTER_QUEST_SUCCESS, USER_QUESTS_FAILURE ],
            endpoint: 'unregisterFromQuest?questId='+questId,
            method: 'POST',
            schema: schema.quest,
            authenticatedRequest: true
        }
    }
};

export const postUnregisterFromQuest = (questId) => dispatch => {
    return dispatch(unregisterFromQuest(questId))
};
