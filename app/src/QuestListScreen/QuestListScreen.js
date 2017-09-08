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

export default class QuestListScreen extends Component {

    state = {
        isLoggedIn: false,
        accessToken: '',
        userId: ''
    };

    _onLogin() {
        auth0
            .webAuth
            .authorize({scope: 'openid profile read:riddles',   audience: 'https://cityquest.at/api/', responseType: 'token id_token'})
            .then(credentials => {
                auth0
                    .auth
                    .userInfo({token: credentials.accessToken})
                    .then(userinfo => {
                        this.setState({
                            isLoggedIn: true,
                            accessToken: credentials.accessToken,
                            userId: userinfo.sub.split('|')[1]
                        });

                    })
                    .catch(error => {
                        console.log(error);
                        Alert.alert('Error','Oh no! An error occured. Sorry for that!');
                    });

            })
            .catch(error => {
                console.log(error);
                Alert.alert('Error','Oh no! An error occured. Sorry for that!');
            });
    }

    componentDidMount() {
        //Do something here like hide splash screen
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>Quest-Liste</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this._onLogin()}>
                            <Icon name="more"/>
                        </Button>
                    </Right>
                </Header>
                <Content padder>
                    <Card>
                        <CardItem>
                            <Left>
                                <Image
                                    style={{width: 120, height: 120, borderRadius: 10}}
                                    source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                                />
                            </Left>
                            <Body>
                                <Text>Test Quest</Text>
                                <Text></Text>
                                <Text >GeekyAnts</Text>
                                <Text >GeekyAnts</Text>
                                <Text >GeekyAnts</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
}
