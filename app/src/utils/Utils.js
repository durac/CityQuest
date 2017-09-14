/**
 * Created by Dominik Schwarz on 26.07.2017.
 */
import { AsyncStorage } from "react-native";
import Auth0 from "react-native-auth0";
import { Toast } from "native-base";

var credentials = require('./auth0-credentials');
const auth0 = new Auth0(credentials);

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
}

export const getData = (value, onSuccess, onError, accessToken) => {
    const url = `http://192.168.178.60:8080/api/${value}`;
    fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(checkStatus)
        .then(res => res.json())
        .then(onSuccess)
        .catch(error => {
            console.warn(error);
            defaultErrorMessage();
            onError(error);
        });
};

export const postData = (value, onSuccess, onError, accessToken) => {
    const url = `http://192.168.178.60:8080/api/${value}`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(checkStatus)
        .then(res => res.json())
        .then(onSuccess)
        .catch(error => {
            console.warn(error);
            defaultErrorMessage();
            onError(error);
        });
};

export const login = (onSuccess) => {
    auth0
        .webAuth
        .authorize({
            scope: 'openid profile create:register_for_quest',
            audience: 'https://cityquest.at/api/',
            responseType: 'token id_token'
        })
        .then(credentials => {
            auth0
                .auth
                .userInfo({token: credentials.accessToken})
                .then(userinfo => {
                    let user = {
                        isLoggedIn: true,
                        accessToken: credentials.accessToken,
                        userId: userinfo.sub.split('|')[1]
                    };
                    AsyncStorage.setItem('userinfo', JSON.stringify(user));
                    Toast.show({
                        text: 'Anmeldung erfolgreich!',
                        buttonText: 'Okay',
                        position: 'bottom',
                        duration: 1500
                    });
                    onSuccess(user);
                })
                .catch(error => {
                    console.log(error);
                });

        })
        .catch(error => {
            console.log(error);
        });
};

export const logout = (onSuccess) => {
    AsyncStorage.removeItem('userinfo');
    Toast.show({
        text: 'Abmeldung erfolgreich!',
        buttonText: 'Okay',
        position: 'bottom',
        duration: 1500
    });
    onSuccess();
};
