/**
 * Created by Dominik Schwarz on 26.07.2017.
 */

const checkStatus = (response) => {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error;
    }
};

export const fetchData = (value, onSuccess, onError, accessToken) => {
    const url = `http://192.168.178.67:8080/api/${value}`;
    fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    }).then(checkStatus)
        .then(res => res.json())
        .then(onSuccess)
        .catch(error => {
            console.warn(error);
            onError(error);
        });
};
