/**
 * Created by Dominik Schwarz on 26.07.2017.
 */
import { Toast } from "native-base";

export const defaultErrorMessage = () => {
    Toast.show({
        text: 'Ou! Das hat nicht geklappt. Verusuch es doch später noch einmal!',
        type: 'danger',
        buttonText: 'Okay',
        position: 'bottom',
        duration: 2000
    });
};

export const errorMessage = (message, type, buttonText, onButtonClick) => {
    Toast.show({
        text: message,
        type: type || '',
        buttonText: buttonText || 'Okay',
        position: 'bottom',
        onClose: onButtonClick
    });
};
