/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, {Component} from "react";
import { Alert} from 'react-native';
import { StackNavigator } from 'react-navigation';
import {Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Spinner} from 'native-base';
import { MenuContext } from 'react-native-popup-menu';
import {CityQuestHeader} from "../components/CityQuestHeader";

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
                    <CityQuestHeader title='Profil'/>
                    <Content>
                        <Text>
                            Profile
                        </Text>
                    </Content>
                </Container>
        );
    }
}
