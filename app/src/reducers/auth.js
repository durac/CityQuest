/**
 * Created by Dominik Schwarz on 20.09.2017.
 */
import React from "react";
import {AsyncStorage} from "react-native";
import * as ActionTypes from "../actions/index.js";

const jwtDecode = require('jwt-decode');

const getAccessToken = async () => {
    let userinfo = await AsyncStorage.getItem('userinfo');
    if(userinfo) {
        return JSON.parse(userinfo).accessToken;
    }
    return null;
};

const checkTokenExpiry = async () => {
    let accessToken = await getAccessToken();
    if (accessToken) {
        let jwtExp = jwtDecode(accessToken).exp;
        let expiryDate = new Date(0);
        expiryDate.setUTCSeconds(jwtExp);

        if (new Date() < expiryDate) {
            return true;
        }
    }
    return false;
};

const auth = (state = {
    isLoggedIn:  false, //TODO call checkTokenExpiry -> issue: async function
    accessToken: null, //TODO call getAccessToken -> issue: async function
    error: ''
}, action) => {
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
            console.log(Object.assign({}, state, {
                isLoggedIn: false,
                accessToken: null,
                error: action.error
            }));
            return Object.assign({}, state, {
                isLoggedIn: false,
                accessToken: null
            });
        default:
            return state
    }
};

export default auth;
