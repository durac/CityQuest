/**
 * Created by Dominik Schwarz on 21.07.2017.
 */
import React, {Component} from "react";
import Auth0 from 'react-native-auth0';
import { Alert, Text, TouchableHighlight, View } from 'react-native';

import Login from './Login';
import RiddleList from './RiddleList';
var credentials = require('./auth0-credentials');
const auth0 = new Auth0(credentials);

export default class App extends Component {

    state = {
        isLoggedIn: false
    }

    _onLogin() {
        auth0
            .webAuth
            .authorize({scope: 'openid email', audience: 'https://' + credentials.domain + '/userinfo'})
            .then(credentials => {
                console.log(credentials.accessToken);
                Alert.alert(
                    'Success',
                    'AccessToken: ' + credentials.accessToken,
                    [
                        {text: 'OK', onPress: () => console.log('OK Pressed')},
                    ],
                    { cancelable: false }
                )
                this.setState({isLoggedIn: true});
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        //Do something here like hide splash screen
    }

    render(){
        if (this.state.isLoggedIn)
            return <RiddleList/>;
        else
            return <Login
                onLoginPress={() => this._onLogin()}
            />;

    }
}
