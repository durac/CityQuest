/**
 * Created by Dominik Schwarz on 21.09.2017.
 */
import { CALL_API } from '../middleware/api'

export const FIXED_QUESTS_REQUEST = 'FIXED_QUESTS_REQUEST';
export const FIXED_QUESTS_SUCCESS = 'FIXED_QUESTS_SUCCESS';
export const FIXED_QUESTS_FAILURE = 'FIXED_QUESTS_FAILURE';

const fetchFixedQuests = () => {
    return {
        [CALL_API]: {
            types: [ FIXED_QUESTS_REQUEST, FIXED_QUESTS_SUCCESS, FIXED_QUESTS_FAILURE ],
            endpoint: 'activeFixedQuests',
            authenticatedRequest: false
        }
    }
};

export const loadFixedQuests = () => dispatch => {
    return dispatch(fetchFixedQuests())
};

export const EVENT_QUESTS_REQUEST = 'EVENT_QUESTS_REQUEST';
export const EVENT_QUESTS_SUCCESS = 'EVENT_QUESTS_SUCCESS';
export const EVENT_QUESTS_FAILURE = 'EVENT_QUESTS_FAILURE';

const fetchEventQuests = () => {
    return {
        [CALL_API]: {
            types: [ EVENT_QUESTS_REQUEST, EVENT_QUESTS_SUCCESS, EVENT_QUESTS_FAILURE ],
            endpoint: 'openedEventQuests',
            authenticatedRequest: false
        }
    }
};

export const loadEventQuests = () => dispatch => {
    return dispatch(fetchEventQuests())
};
