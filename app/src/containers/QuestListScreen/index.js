/**
 * Created by Dominik Schwarz on 09.09.2017.
 */
import { StackNavigator } from "react-navigation";

import QuestListScreen from "./QuestListScreen.js";
import QuestDetailsScreen from "./QuestDetailsScreen.js";
import QuestStationScreen from "../MyQuestsScreen/QuestStationScreen";
import RiddleScreen from "../MyQuestsScreen/RiddleScreen";

export default (DrawNav = StackNavigator({

    QuestList: { screen: QuestListScreen },
    QuestDetails: { screen: QuestDetailsScreen },
    Riddle: { screen: RiddleScreen },
    QuestStation: { screen: QuestStationScreen }

}));
