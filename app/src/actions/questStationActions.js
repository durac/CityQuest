/**
 * Created by Dominik Schwarz on 26.09.2017.
 */
import { CALL_API } from '../middleware/api'
import * as schema from './schema';

export const QUEST_STATION_REQUEST = 'QUEST_STATION_REQUEST';
export const QUEST_STATION_FAILURE = 'QUEST_STATION_FAILURE';

export const QUEST_STATION_SUCCESS = 'QUEST_STATION_SUCCESS';
const currentQuestStation = (questId) => {
    return {
        [CALL_API]: {
            types: [ QUEST_STATION_REQUEST, QUEST_STATION_SUCCESS, QUEST_STATION_FAILURE ],
            endpoint: 'currentQuestStation?questId='+questId,
            method: 'GET',
            schema: schema.questStation,
            authenticatedRequest: true
        }
    }
};

export const loadCurrentQuestStation = (questId) => dispatch => {
    return dispatch(currentQuestStation(questId))
};

export const NEXT_QUEST_STATION_SUCCESS = 'NEXT_QUEST_STATION_SUCCESS';
const nextQuestStation = (questId, answer) => {
    return {
        [CALL_API]: {
            types: [ QUEST_STATION_REQUEST, NEXT_QUEST_STATION_SUCCESS, QUEST_STATION_FAILURE ],
            endpoint: 'nextQuestStation?questId='+questId+'&answer='+answer,
            method: 'GET',
            schema: schema.questStation,
            authenticatedRequest: true
        }
    }
};

export const submitAnswer = (questId, answer) => dispatch => {
    return dispatch(nextQuestStation(questId, answer))
};

export const NEXT_RIDDLE_REQUEST = 'NEXT_RIDDLE_REQUEST';
export const NEXT_RIDDLE_FAILURE = 'NEXT_RIDDLE_FAILURE';
export const NEXT_RIDDLE_SUCCESS = 'NEXT_RIDDLE_SUCCESS';
const nextRiddle = (questId, code) => {
    return {
        [CALL_API]: {
            types: [ NEXT_RIDDLE_REQUEST, NEXT_RIDDLE_SUCCESS, NEXT_RIDDLE_FAILURE ],
            endpoint: 'getRiddle?questId='+questId+'&code='+code,
            method: 'GET',
            schema: schema.questStation,
            authenticatedRequest: true
        }
    }
};

export const loadNextRiddle = (questId, code) => dispatch => {
    return dispatch(nextRiddle(questId, code))
};
