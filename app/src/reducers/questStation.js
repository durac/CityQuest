/**
 * Created by Dominik Schwarz on 26.09.2017.
 */
import React from "react";
import * as ActionTypes from "../actions/questStationActions.js";
import * as AuthActionTypes from "../actions/authActions.js";
import { combineReducers } from 'redux';

const byId = (state = {
    questStation: {},
    riddle: {}
}, action) => {
    if (action.response) {
        const questStations = action.response.entities.questStations;
        const riddles = action.response.entities.riddles;
        return {
            questStation: questStations ? questStations : state.questStation,
            riddle: riddles ? riddles : state.riddle
        };
    }
    return state;
};

const currentQuestStation = (state = {
    isFetching: false,
    id: -1,
    error: ''
}, action) => {
    switch (action.type) {
        case ActionTypes.QUEST_STATION_REQUEST:
        case ActionTypes.NEXT_RIDDLE_REQUEST:
            return Object.assign({}, state, {
                error: '',
                isFetching: true
            });
        case ActionTypes.QUEST_STATION_FAILURE:
        case ActionTypes.NEXT_RIDDLE_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            });
        case ActionTypes.QUEST_STATION_SUCCESS:
        case ActionTypes.NEXT_QUEST_STATION_SUCCESS:
        case ActionTypes.NEXT_RIDDLE_SUCCESS:
            return Object.assign({}, state, {
                id: action.response.result,
                error: '',
                isFetching: false
            });
        case AuthActionTypes.LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                id: -1,
                error: ''
            });
        default:
            return state
    }
};

const questStation = combineReducers({
    byId,
    currentQuestStation
});

export default questStation;

export const getCurrentQuestStation = (state) => {
    const questStationId = state.questStation.currentQuestStation.id;

    if(questStationId < 0) {
        return null;
    }
    return state.questStation.byId.questStation[questStationId];
};
export const getCurrentRiddle = (state) => {
    const questStation = getCurrentQuestStation(state);
    if (!questStation) {
        return null;
    }
    const riddleId = getCurrentQuestStation(state).riddle;
    if (!riddleId) {
        return null;
    }
    return state.questStation.byId.riddle[riddleId];
};
export const getErrorMessage = (state) => state.questStation.currentQuestStation.error;
export const getIsFetching = (state) => state.questStation.currentQuestStation.isFetching;
