/**
 * Created by Dominik Schwarz on 21.09.2017.
 */
import React from "react";
import * as ActionTypes from "../actions/questsActions.js";

export const fixedQuests = (state = {
    isFetching: false,
    fixedQuests: [],
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
                fixedQuests: [],
                error: action.error
            });
        default:
            return state
    }
};
