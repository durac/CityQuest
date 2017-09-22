/**
 * Created by Dominik Schwarz on 21.09.2017.
 */
import React from "react";
import * as ActionTypes from "../actions/questsActions.js";

export const quests = (state = {
    isFetching: false,
    fixedQuests: [],
    eventQuests: [],
    error: ''
}, action) => {
    switch (action.type) {
        case ActionTypes.FIXED_QUESTS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.FIXED_QUESTS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                fixedQuests: action.response,
                error: ''
            });
        case ActionTypes.FIXED_QUESTS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            });
        case ActionTypes.EVENT_QUESTS_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            });
        case ActionTypes.EVENT_QUESTS_SUCCESS:
            return Object.assign({}, state, {
                isFetching: false,
                eventQuests: action.response,
                error: ''
            });
        case ActionTypes.EVENT_QUESTS_FAILURE:
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            });
        default:
            return state
    }
};
