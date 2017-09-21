/**
 * Created by Dominik Schwarz on 20.09.2017.
 */
import React from "react";
import {AsyncStorage} from "react-native";
import * as ActionTypes from "../actions/authActions.js";

const jwtDecode = require('jwt-decode');

let initialState = {
    accessToken: null,
    isLoggedIn: false,
    error: ''
};


//TODO get accessToken from persistent store
/*
const getInitialState = () => {
    AsyncStorage.getItem('userinfo', (err,result) => {
        const res = JSON.parse(result);
        if (res) {
            initialState.accessToken = res.accessToken;
            initialState.isLoggedIn = true;
        }
    });
    return initialState;
};

const checkTokenExpiry = (initialState) => {
    getAccessToken(initialState);
    let accessToken = initialState.accessToken;
    if (accessToken) {
        let jwtExp = jwtDecode(accessToken).exp;
        let expiryDate = new Date(0);
        expiryDate.setUTCSeconds(jwtExp);

        if (new Date() < expiryDate) {
            return true;
        }
    }
    return false;
};*/

const auth = (state = initialState, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN_SUCCESS:
            return Object.assign({}, state, {
                isLoggedIn: true,
                accessToken: action.accessToken,
                error: ''
            });
        case ActionTypes.LOGIN_ERROR:
            return Object.assign({}, state, {
                isLoggedIn: false,
                accessToken: null,
                error: action.error
            });
        case ActionTypes.LOGOUT_SUCCESS:
            return Object.assign({}, state, {
                isLoggedIn: false,
                accessToken: null
            });
        default:
            return state
    }
};

export default auth;
