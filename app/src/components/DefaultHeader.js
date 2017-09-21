/**
 * Created by Dominik Schwarz on 20.09.2017.
 */
import React, {PropTypes} from "react";
import {Header, Title, Left, Right, Body, Icon, Text, Button} from "native-base";
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import s from "../style/Style.js";

const DefaultHeader = ({title, includeBackIcon, navigation, isLoggedIn, onLoginClick, onLogoutClick}) => (
    <Header>
        { includeBackIcon ?
            <Left>
                <Button transparent onPress={() => navigation.goBack()}>
                    <Icon name="arrow-back"/>
                </Button>
            </Left>
            : undefined
        }
        <Body>
            <Title>{title}</Title>
        </Body>
        <Right>
            <Menu>
                <MenuTrigger><Icon name="more" style={{padding: 10, color:"white"}}/></MenuTrigger>
                <MenuOptions>
                    { isLoggedIn ?
                    <MenuOption onSelect={onLogoutClick}><Text style={s.popupMenuEntry}>Logout</Text></MenuOption>
                    : <MenuOption onSelect={onLoginClick}><Text style={s.popupMenuEntry}>Login</Text></MenuOption>}
                    <MenuOption><Text style={s.popupMenuEntry}>Info</Text></MenuOption>
                    <MenuOption><Text style={s.popupMenuEntry}>Problem melden</Text></MenuOption>
                    <MenuOption><Text style={s.popupMenuEntry}>Impressum</Text></MenuOption>
                </MenuOptions>
            </Menu>
        </Right>
    </Header>
);

DefaultHeader.propTypes = {
    title: PropTypes.string,
    includeBackIcon: PropTypes.bool,
    navigation: PropTypes.object,
    isLoggedIn: PropTypes.bool,
    onLoginClick: PropTypes.func.isRequired,
    onLogoutClick: PropTypes.func.isRequired
};

export default DefaultHeader;
