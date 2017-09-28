/**
 * Created by Dominik Schwarz on 20.09.2017.
 */
import {AsyncStorage} from "react-native";
import Auth0 from "react-native-auth0";

let credentials = require('../utils/auth0-credentials');
const auth0 = new Auth0(credentials);

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
const loginSuccess = (accessToken) => {
    return {
        type: LOGIN_SUCCESS,
        accessToken
    }
};
const loginError = (err) => {
    return {
        type: LOGIN_ERROR,
        err
    }
};
export const login = () => dispatch => {
    return auth0
        .webAuth
        .authorize({
            scope: 'openid profile register_for_quest user_quests quest_stations',
            audience: 'https://cityquest.at/api/',
            responseType: 'token'
        })
        .then(
            credentials => {
                let authInfo = {
                    isLoggedIn: true,
                    accessToken: credentials.accessToken
                };
                AsyncStorage.setItem('userinfo', JSON.stringify(authInfo));
                return dispatch(loginSuccess(authInfo.accessToken))
            },
            error => dispatch(loginError(error)));
};


export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const logoutSuccess = () => {
    return {
        type: LOGOUT_SUCCESS
    }
};
export const logout = () => dispatch => {
    AsyncStorage.removeItem('userinfo');
    return dispatch(logoutSuccess());
};


export const USERINFO_REQUEST = 'USERINFO_REQUEST';
export const USERINFO_SUCCESS = 'USERINFO_SUCCESS';
export const USERINFO_ERROR = 'USERINFO_ERROR';
const userinfoSuccess = (userinfo) => {
    return {
        type: USERINFO_SUCCESS,
        userinfo
    }
};
const userinfoError = (error) => {
    return {
        type: USERINFO_ERROR,
        error
    }
};
const userinfoRequest = () => {
    return {
        type: USERINFO_REQUEST
    }
};
export const getUserinfo = (accessToken) => dispatch => {
    dispatch(userinfoRequest());
    return auth0
        .auth
        .userInfo({token: accessToken})
        .then(userinfo => {
            dispatch(userinfoSuccess(userinfo));
        },
        error => dispatch(userinfoError(error)));
};
