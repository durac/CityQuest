/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, { Component } from "react";
import QuestListScreen from "./containers/QuestListScreen/index.js";
import MyQuestsScreen from "./containers/MyQuestsScreen/index.js";
import QRScannerScreen from "./containers/QRScannerScreen/QRScannerScreen.js";
import ProfileScreen from "./containers/ProfileScreen/ProfileScreen.js";
import { TabNavigator, TabView, TabBarBottom } from "react-navigation";
import {Button, Text, Icon, Item, Footer, FooterTab, Label} from "native-base";

const BottomNavigation = TabNavigator(
    {
        QuestListBottom: { screen: QuestListScreen },
        MyQuestsBottom: { screen: MyQuestsScreen },
        QRScannerBottom: { screen: QRScannerScreen },
        ProfileBottom: { screen: ProfileScreen }
    },
    {
        tabBarPosition: "bottom",
        swipeEnabled: false,
        animationEnabled: false,
        tabBarComponent: props => {
            return (
                <Footer>
                    <FooterTab>
                        <Button
                            vertical
                            active={props.navigationState.index === 0}
                            onPress={() => props.navigation.navigate("QuestListBottom")}
                        >
                            <Icon name="list" />
                            <Text uppercase={false}>Quests</Text>
                        </Button>
                        <Button
                            vertical
                            active={props.navigationState.index === 1}
                            onPress={() => props.navigation.navigate("MyQuestsBottom")}
                        >
                            <Icon name="bulb" />
                            <Text uppercase={false}>MyQuests</Text>
                        </Button>
                        <Button
                            vertical
                            active={props.navigationState.index === 2}
                            onPress={() => props.navigation.navigate("QRScannerBottom")}
                        >
                            <Icon name="qr-scanner" />
                            <Text uppercase={false}>QR</Text>
                        </Button>
                        <Button
                            vertical
                            active={props.navigationState.index === 3}
                            onPress={() => props.navigation.navigate("ProfileBottom")}
                        >
                            <Icon name="person" />
                            <Text uppercase={false}>Profil</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            );
        }
    }
);
export default BottomNavigation;
