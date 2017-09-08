/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, { Component } from "react";
import QuestListScreen from "./QuestListScreen/QuestListScreen.js";
import MyQuestsScreen from "./MyQuestsScreen/MyQuestsScreen.js";
import QRScannerScreen from "./QRScannerScreen/QRScannerScreen.js";
import ProfileScreen from "./ProfileScreen/ProfileScreen.js";
import { TabNavigator, TabView, TabBarBottom } from "react-navigation";
import {Button, Text, Icon, Item, Footer, FooterTab, Label} from "native-base";
const BottomNavigation = TabNavigator(
    {
        QuestList: { screen: QuestListScreen },
        MyQuests: { screen: MyQuestsScreen },
        QRScanner: { screen: QRScannerScreen },
        Profile: { screen: ProfileScreen }
    },
    {
        tabBarPosition: "bottom",
        tabBarComponent: props => {
            return (
                <Footer>
                    <FooterTab>
                        <Button
                            vertical
                            active={props.navigationState.index === 0}
                            onPress={() => props.navigation.navigate("QuestList")}
                        >
                            <Icon active name="list" />
                            <Text>Quests</Text>
                        </Button>
                        <Button
                            vertical
                            active={props.navigationState.index === 1}
                            onPress={() => props.navigation.navigate("MyQuests")}
                        >
                            <Icon name="bulb" />
                            <Text>MyQuest</Text>
                        </Button>
                        <Button
                            vertical
                            active={props.navigationState.index === 2}
                            onPress={() => props.navigation.navigate("QRScanner")}
                        >
                            <Icon name="qr-scanner" />
                            <Text>QR</Text>
                        </Button>
                        <Button
                            vertical
                            active={props.navigationState.index === 3}
                            onPress={() => props.navigation.navigate("Profile")}
                        >
                            <Icon name="person" />
                            <Text>Profil</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            );
        }
    }
);
export default BottomNavigation;
