import React, { Component } from "react";
import { StyleProvider } from "native-base";
import { updateFocus } from 'react-navigation-is-focused-hoc'

import getTheme from '../native-base-theme/components';
import commonColor from '../native-base-theme/variables/commonColor';
import BottomNavigation from "./BottomNavigation.js";

export default class App extends Component {

    constructor() {
        super();
        this.state = {
            isReady: false
        };
    }

    async componentWillMount() {
        this.setState({ isReady: true });
    }

    render() {
        if (!this.state.isReady) {
            return <Text>Wait for it!</Text>
        }
        return (
            <StyleProvider style={getTheme(commonColor)}>
                <BottomNavigation onNavigationStateChange={(prevState, currentState) => { updateFocus(currentState)}}/>
            </StyleProvider>
        );
    }
}


