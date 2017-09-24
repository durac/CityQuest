/**
 * Created by Dominik Schwarz on 21.09.2017.
 */
import { AsyncStorage} from "react-native";
import { normalize } from 'normalizr';

export const API_ROOT = 'http://192.168.178.60:8080/api/';

const callApi = (endpoint, method, authenticatedRequest, accessToken) => {

    let config = {
        method: method
    };

    if(authenticatedRequest) {
        if(accessToken){
            config.headers = {'Authorization': `Bearer ${accessToken}`}
        } else {
            throw new Error("No token specified!")
        }
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

    let { endpoint, method, schema,  types, authenticatedRequest } = callAPI;

    if (typeof endpoint !== 'string') {
        throw new Error('Specify a string endpoint URL.')
    }

    if (method !== 'GET' && method !== 'POST') {
        throw new Error('Expected GET or POST as method')
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

    let accessToken = null;
    if(authenticatedRequest) {
        accessToken = store.getState().auth.accessToken;
    }

    return callApi(endpoint, method, authenticatedRequest, accessToken).then(
        response => next(actionWith({
            response: schema ? normalize(response,schema) : response,
            authenticatedRequest,
            type: successType
        })),
        error => next(actionWith({
            type: failureType,
            error: error.message || 'Something went wrong. Please try again!'
        }))
    );
}
