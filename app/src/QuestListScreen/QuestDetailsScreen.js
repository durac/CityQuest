/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, {Component} from "react";
import Auth0 from 'react-native-auth0';
import { Alert, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { StyleProvider, Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Card, CardItem} from 'native-base';

var credentials = require('../utils/auth0-credentials');
const auth0 = new Auth0(credentials);

export default class QuestDetailsScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: (
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                <Title>Quest Details</Title>
                </Body>
                <Right>
                    <Button transparent onPress={() => this._onLogin()}>
                        <Icon name="more"/>
                    </Button>
                </Right>
            </Header>
        )
    });

    state = {
        isLoggedIn: false,
        accessToken: '',
        userId: ''
    };

    componentDidMount() {
        //Do something here like hide splash screen
    }

    render() {
        return (
            <Container>
                <Content padder>
                    <Text>Details</Text>
                </Content>
            </Container>
        );
    }
}
