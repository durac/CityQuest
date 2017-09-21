/**
 * Created by Dominik Schwarz on 19.09.2017.
 */
import { StackNavigator } from "react-navigation";

import MyQuestsScreen from "./MyQuestsScreen.js";
import QuestDetailsScreen from "../QuestListScreen/QuestDetailsScreen.js";

export default (DrawNav = StackNavigator({

    MyQuests: { screen: MyQuestsScreen },
    QuestDetails: { screen: QuestDetailsScreen }

}));
