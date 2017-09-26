/**
 * Created by Dominik Schwarz on 26.07.2017.
 */
import { Toast } from "native-base";
import { NavigationActions } from "react-navigation";

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

export const resetNavigation = (targetRoute, questId, navigation) => {
    const resetAction = NavigationActions.reset({
        index: 1,
        actions: [
            NavigationActions.navigate({ routeName: "QuestList"}),
            NavigationActions.navigate({ routeName: targetRoute, params: {questId: questId}})
        ]
    });
    navigation.dispatch(resetAction);
};
