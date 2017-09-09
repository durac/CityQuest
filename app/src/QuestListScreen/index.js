/**
 * Created by Dominik Schwarz on 09.09.2017.
 */
import React, { Component } from "react";
import { StackNavigator } from "react-navigation";

import QuestListScreen from "./QuestListScreen.js";
import QuestDetailsScreen from "./QuestDetailsScreen.js";

export default (DrawNav = StackNavigator({

    QuestList: { screen: QuestListScreen },
    QuestDetails: { screen: QuestDetailsScreen },

}));