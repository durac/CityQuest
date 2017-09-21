import React, { Component } from "react";
import { NetInfo, AsyncStorage} from "react-native";
import { Root, StyleProvider } from "native-base";
import { updateFocus } from 'react-navigation-is-focused-hoc'
import { MenuContext } from 'react-native-popup-menu';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux'
import thunk from 'redux-thunk'
import api from './middleware/api'
import rootReducer from './reducers/index.js';
import Offline from './components/Offline'
import getTheme from '../native-base-theme/components/index.js';
import commonColor from '../native-base-theme/variables/commonColor';
import BottomNavigation from "./BottomNavigation.js";

const middleware = [ thunk, api ];
let store = createStore(rootReducer, applyMiddleware(...middleware));

export default class App extends Component {

    constructor() {
        super();
        this.state = {
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
        NetInfo.isConnected.addEventListener( 'connectionChange', this.setIsConnected );
    }

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.setIsConnected);
    }


    async componentWillMount() {
        this.setState({ isReady: true });
    }



    render() {
        return (
            <Root>
                <StyleProvider style={getTheme(commonColor)}>
                    { this.state.isConnected ?
                        <MenuContext>
                            <Provider store={store}>
                                <BottomNavigation
                                    onNavigationStateChange={(prevState, currentState) => { updateFocus(currentState)}}/>
                            </Provider>
                        </MenuContext>
                        : <Offline />
                    }
                </StyleProvider>
            </Root>
        );
    }
}


