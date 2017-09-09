/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, {Component} from "react";
import { Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { StyleProvider, Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text } from 'native-base';

export default class QRScannerScreen extends Component {

    state = {
    };
    
    componentDidMount() {
        //Do something here like hide splash screen
    }

    render() {
        return (
                <Container>
                    <Header>
                        <Body>
                        <Title>Profil</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this._onLogin()}>
                                <Icon name="more"/>
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                        <Text>
                            Profile
                        </Text>
                    </Content>
                </Container>
        );
    }
}
