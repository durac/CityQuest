/**
 * Created by Dominik Schwarz on 26.07.2017.
 */
import { AsyncStorage, Platform } from "react-native";
import Auth0 from "react-native-auth0";
import { Toast } from "native-base";

var credentials = require('./auth0-credentials');
const auth0 = new Auth0(credentials);
const apiUrl = `http://192.168.178.60:8080/api/`;

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

const defaultErrorMessage = () => {
    Toast.show({
        text: 'Ou! Das hat nicht geklappt. Verusuch es doch später noch einmal!',
        type: 'danger',
        buttonText: 'Okay',
        position: 'bottom',
        duration: 2000
    });
};

const errorMessage = (text, type) => {
    Toast.show({
        text: text,
        type: type === undefined ? '' : type,
        buttonText: 'Okay',
        position: 'bottom',
        duration: 2000
    });
};


export const getData = (value, onSuccess, onError, accessToken) => {
    fetch(apiUrl+""+value, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(checkStatus)
        .then((res) => res.text())
        .then(text => text.length ? JSON.parse(text) : {})
        .then(res => typeof onSuccess === 'function' && onSuccess(res))
        .catch(error => {
            console.log(error);
            let resError = JSON.parse(error.response._bodyText);
            errorMessage(resError.message, "warning");
            typeof onError === 'function' && onError(error);
        });
};

export const postData = (value, onSuccess, onError, accessToken) => {
    fetch(apiUrl+""+value, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(checkStatus)
        .then((res) => res.text())
        .then(text => text.length ? JSON.parse(text) : {})
        .then(res => typeof onSuccess === 'function' && onSuccess(res))
        .catch(error => {
            console.log(error);
            let resError = JSON.parse(error.response._bodyText);
            errorMessage(resError.message, "warning");
            typeof onError === 'function' && onError(error);
        });
};

export const login = (onSuccess) => {
    auth0
        .webAuth
        .authorize({
            scope: 'openid profile create:register_for_quest',
            audience: 'https://cityquest.at/api/',
            responseType: 'token'
        })
        .then(credentials => {
            let authInfo = {
                isLoggedIn: true,
                accessToken: credentials.accessToken
            };
            AsyncStorage.setItem('userinfo', JSON.stringify(authInfo));
            Toast.show({
                text: 'Anmeldung erfolgreich!',
                buttonText: 'Okay',
                position: 'bottom',
                duration: 1500
            });
            typeof onSuccess === 'function' && onSuccess(authInfo);
        })
        .catch(error => {
            console.log(error);
        });
};

export const logout = (onSuccess) => {
    if (Platform.OS === 'android') {
        AsyncStorage.removeItem('userinfo');
        Toast.show({
            text: 'Abmeldung erfolgreich!',
            buttonText: 'Okay',
            position: 'bottom',
            duration: 1500
        });
        typeof onSuccess === 'function' && onSuccess();
    } else {
        auth0.webAuth
            .clearSession({})
            .then(success => {
                AsyncStorage.removeItem('userinfo');
                Toast.show({
                    text: 'Abmeldung erfolgreich!',
                    buttonText: 'Okay',
                    position: 'bottom',
                    duration: 1500
                });
                typeof onSuccess === 'function' && onSuccess();
            })
            .catch(error => {
                console.log(error)
                defaultErrorMessage();
            });
    }
};
