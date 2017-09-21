/**
 * Created by Dominik Schwarz on 21.09.2017.
 */
import { AsyncStorage} from "react-native";

export const API_ROOT = 'http://192.168.178.60:8080/api/'

const callApi = (endpoint, authenticatedRequest) => {

    let config = {};

    if(authenticatedRequest) {
        AsyncStorage.getItem('userinfo', (err, result) => {
            const res = JSON.parse(result);
            if (res != undefined) {
                config = {
                    headers: {'Authorization': `Bearer ${res.accessToken}`}
                }
            }
            else {
                throw new Error("No token saved!")
            }
        });
    }

    return fetch(API_ROOT + endpoint, config)
        .then(response =>
            response.json()
                .then(resource => ({ resource, response }))
        ).then(({ resource, response }) => {
            if (!response.ok) {
                return Promise.reject(resource)
            }
            return resource
        })
};

export const CALL_API = 'Call API';

export default store => next => action => {

    const callAPI = action[CALL_API];

    if (typeof callAPI === 'undefined') {
        return next(action)
    }

    let { endpoint, types, authenticatedRequest } = callAPI;

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.')
    }

    if (!Array.isArray(types) || types.length !== 3) {
        throw new Error('Expected an array of three action types.')
    }

    if (!types.every(type => typeof type === 'string')) {
        throw new Error('Expected action types to be strings.')
    }

    const actionWith = (data) => {
        const finalAction = Object.assign({}, action, data);
        delete finalAction[CALL_API];
        return finalAction
    };

    const [ requestType, successType, failureType ] = types;
    next(actionWith({ type: requestType }));

    return callApi(endpoint, authenticatedRequest).then(
        response => next(actionWith({
            response,
            authenticatedRequest,
            type: successType
        })),
        error => next(actionWith({
            type: failureType,
            error: error.message || 'Error!'
        }))
    );
}
