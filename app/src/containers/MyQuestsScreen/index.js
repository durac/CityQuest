/**
 * Created by Dominik Schwarz on 19.09.2017.
 */
import { StackNavigator } from "react-navigation";

import MyQuestsScreen from "./MyQuestsScreen";
import RiddleScreen from "./RiddleScreen";
import QuestStationScreen from "./QuestStationScreen";
import QuestDetailsScreen from "../QuestListScreen/QuestDetailsScreen";

export default (DrawNav = StackNavigator({

    MyQuests: { screen: MyQuestsScreen },
    QuestDetails: { screen: QuestDetailsScreen },
    Riddle: { screen: RiddleScreen },
    QuestStation: { screen: QuestStationScreen }

}));
