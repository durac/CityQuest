import React, { Component } from "react";
import { NetInfo } from "react-native";
import { StyleProvider, Container, Header, Body, Title, Content, Icon, Text} from "native-base";
import { updateFocus } from 'react-navigation-is-focused-hoc'

import getTheme from '../native-base-theme/components';
import commonColor from '../native-base-theme/variables/commonColor';
import BottomNavigation from "./BottomNavigation.js";

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            isReady: false,
            isConnected: true
        };
        this.setIsConnected = this.setIsConnected.bind(this);
    }

    setIsConnected() {
        NetInfo.isConnected.fetch().done(
            (isConnected) => { this.setState({ isConnected: isConnected }); }
        );
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener( 'change', this.setIsConnected );
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('change', this.setIsConnected);
    }


    async componentWillMount() {
        this.setState({ isReady: true });
    }



    render() {
        if (!this.state.isReady) {
            return <Text>Wait for it!</Text>
        }
        if(!this.state.isConnected) {
            return (
                <Container>
                    <Header>
                        <Body>
                            <Title>CityQuest</Title>
                        </Body>
                    </Header>
                    <Content>
                        <Icon name="thunderstorm"
                              style={{fontSize: 80, color: 'grey', textAlign: 'center', marginTop: 30}}></Icon>
                        <Text style={{fontSize: 18, color: 'grey', textAlign: 'center'}}>Offline</Text>
                        <Text style={{marginTop: 50}}></Text>
                        <Text style={{fontSize: 18, color: 'grey', textAlign: 'center'}}>Für diese App wird eine</Text>
                        <Text style={{fontSize: 18, color: 'grey', textAlign: 'center'}}>Internetverbindung benötigt.</Text>
                    </Content>
                </Container>
            )
        }
        return (
            <StyleProvider style={getTheme(commonColor)}>
                <BottomNavigation onNavigationStateChange={(prevState, currentState) => { updateFocus(currentState)}}/>
            </StyleProvider>
        );
    }
}


