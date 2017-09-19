/**
 * Created by Dominik Schwarz on 13.09.2017.
 */
import React, {Component, PropTypes} from "react";
import { AsyncStorage, Alert } from "react-native";
import {Header, Title, Left, Right, Body, Icon, Text, Button} from "native-base";
import {Menu, MenuOptions, MenuOption, MenuTrigger} from 'react-native-popup-menu';
import s from "../style/Style.js";
import {login, logout} from "../utils/Utils";

export class CityQuestHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false
        };
        this.renderLoginOrLogout = this.renderLoginOrLogout.bind(this);
    }
    
    renderLoginOrLogout() {
        AsyncStorage.getItem('userinfo', (err, result) => {
            const res = JSON.parse(result);
            if(res && res.isLoggedIn) {
                this.setState({
                    isLoggedIn: true
                });
            } else {
                this.setState({
                    isLoggedIn: false
                });
            }
        });
        return this.state.isLoggedIn ?
            <MenuOption onSelect={() => logout(() => {this.setState({ isLoggedIn: false})})}><Text style={s.popupMenuEntry}>Logout</Text></MenuOption>
            : <MenuOption onSelect={() => login(() => {this.setState({ isLoggedIn: true})})}><Text style={s.popupMenuEntry}>Login</Text></MenuOption>;
    }

    render() {
        return (
            <Header>
                { this.props.includeBackIcon ?
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    : undefined
                }
                <Body>
                <Title>{this.props.title}</Title>
                </Body>
                <Right>
                    <Menu>
                        <MenuTrigger><Icon name="more" style={{padding: 10, color:"white"}}/></MenuTrigger>
                        <MenuOptions>
                            {this.renderLoginOrLogout()}
                            <MenuOption><Text style={s.popupMenuEntry}>Info</Text></MenuOption>
                            <MenuOption><Text style={s.popupMenuEntry}>Problem melden</Text></MenuOption>
                            <MenuOption><Text style={s.popupMenuEntry}>Impressum</Text></MenuOption>
                        </MenuOptions>
                    </Menu>
                </Right>
            </Header>
        )
    }
}

CityQuestHeader.propTypes = {
    title: PropTypes.string,
    includeBackIcon: PropTypes.bool,
    navigation: PropTypes.object
};
