/**
 * Created by Dominik Schwarz on 21.09.2017.
 */
import React from "react";
import * as ActionTypes from "../actions/questsActions.js";
import { combineReducers } from 'redux';

const byId = (state = {}, action) => {
    if (action.response) {
        return {
            ...state,
            ...action.response.entities.quests
        };
    }
    return state;
};

const availableQuests = (state = {
    isFetching: false,
    fixedQuestIds: [],
    eventQuestIds: [],
    error: ''
}, action) => {
    switch (action.type) {
        case ActionTypes.AVAILABLE_QUESTS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                error: ''
            });
        case ActionTypes.AVAILABLE_QUESTS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            });
        case ActionTypes.FIXED_QUESTS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                fixedQuestIds: action.response.result,
                error: ''
            });
        case ActionTypes.EVENT_QUESTS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                eventQuestIds: action.response.result,
                error: ''
            });
        default:
            return state
    }
};

const userQuestsInitialState = {
    isFetching: false,
    fixedQuestIds: [],
    eventQuestIds: [],
    error: '',
    registerError: ''
};

const handleRegistering = (state, action) => {
    const {result: registeredQuestId, entities} = action.response;
    let newState = userQuestsInitialState;
    if(entities.quests[registeredQuestId].startDate){
        newState.eventQuestIds = [ ...state.eventQuestIds, registeredQuestId ];
        newState.fixedQuestIds = state.fixedQuestIds;
    } else {
        newState.fixedQuestIds = [ ...state.fixedQuestIds, registeredQuestId ];
        newState.eventQuestIds = state.eventQuestIds;
    }
    return newState;
};

const handleUnregistering = (state, action) => {
    const {result: registeredQuestId, entities} = action.response;
    let newState = userQuestsInitialState;
    if(entities.quests[registeredQuestId].startDate){
        newState.eventQuestIds = state.eventQuestIds.filter(id => id !== registeredQuestId);
        newState.fixedQuestIds = state.fixedQuestIds;
    } else {
        newState.fixedQuestIds =  state.fixedQuestIds.filter(id => id !== registeredQuestId);
        newState.eventQuestIds = state.eventQuestIds;
    }
    return newState;
};

const userQuests = (state = userQuestsInitialState, action) => {
    switch (action.type) {
        case ActionTypes.USER_QUESTS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true,
                error: '',
                registerError: ''
            });
        case ActionTypes.USER_QUESTS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            });
        case ActionTypes.REGISTER_QUEST_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                registerError: action.error
            });
        case ActionTypes.USER_FIXED_QUESTS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                fixedQuestIds: action.response.result,
                error: '',
                registerError: ''
            });
        case ActionTypes.USER_EVENT_QUESTS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                eventQuestIds: action.response.result,
                error: '',
                registerError: ''
            });
        case ActionTypes.REGISTER_QUEST_SUCCESS:
            return handleRegistering(state, action);
        case ActionTypes.UNREGISTER_QUEST_SUCCESS:
            return handleUnregistering(state, action);
        default:
            return state
    }
};

const quests = combineReducers({
    byId,
    availableQuests,
    userQuests
});

export default quests;

export const getQuest = (state, id) => state.quests.byId[id];

// getters for availableQuests
export const getAvailableFixedQuests = (state) => {
    const ids = state.quests.availableQuests.fixedQuestIds;
    return ids.map(id => getQuest(state,id))
};
export const getAvailableEventQuests = (state) => {
    const ids = state.quests.availableQuests.eventQuestIds;
    return ids.map(id => getQuest(state,id))
};
export const getAvailableQuestsIsFetching = (state) => state.quests.availableQuests.isFetching;
export const getAvailableQuestsErrorMessage = (state)=> state.quests.availableQuests.error;

// getters for userQuests
export const getUserFixedQuests = (state) => {
    const ids = state.quests.userQuests.fixedQuestIds;
    return ids.map(id => getQuest(state,id))
};
export const getUserEventQuests = (state) => {
    const ids = state.quests.userQuests.eventQuestIds;
    return ids.map(id => getQuest(state,id))
};
export const getNumberOfFixedQuests = (state) => {
    return state.quests.userQuests.fixedQuestIds.length;
};
export const getNumberOfEventQuests = (state) => {
    return state.quests.userQuests.eventQuestIds.length;
};
export const getUserQuestsIsFetching = (state) => state.quests.userQuests.isFetching;
export const getUserQuestsErrorMessage = (state) => state.quests.userQuests.error;
export const getRegisterErrorMessage = (state) => state.quests.userQuests.registerError;
