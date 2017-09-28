/**
 * Created by Dominik Schwarz on 19.09.2017.
 */
import { StackNavigator } from "react-navigation";

import MyQuestsScreen from "./MyQuestsScreen";
import QuestStationScreen from "./QuestStationScreen";
import QuestDetailsScreen from "../QuestListScreen/QuestDetailsScreen";

export default (DrawNav = StackNavigator({

    MyQuests: { screen: MyQuestsScreen },
    MyQuestDetails: { screen: QuestDetailsScreen },
    QuestStation: { screen: QuestStationScreen }

}));
