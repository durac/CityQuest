/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, {Component} from "react";
import { Alert} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Spinner} from 'native-base';
import { MenuContext } from 'react-native-popup-menu';
import {login} from '../utils/Utils';

export default class QRScannerScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }


    render() {
        return (
                <Container>
                    <Header>
                        <Body>
                        <Title>Profil</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={login}>
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
