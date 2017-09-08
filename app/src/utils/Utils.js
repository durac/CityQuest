/**
 * Created by Dominik Schwarz on 26.07.2017.
 */


var Utils = {
    checkStatus: function(response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            let error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    }
};

export { Utils as default };
