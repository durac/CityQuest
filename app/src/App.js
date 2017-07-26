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
        isLoggedIn: false,
        accessToken: ''
    };

    _onLogin() {
        auth0
            .webAuth
            .authorize({scope: 'openid profile read:riddles',   audience: 'https://cityquest.at/api/', responseType: 'token id_token'})
            .then(credentials => {
                this.setState({
                    isLoggedIn: true,
                    accessToken: credentials.accessToken
                });
            })
            .catch(error => {
                console.log(error);
                Alert.alert(
                    'Error',
                    'Oh no! An error occured. Sorry for that!'
                )
            });
    }

    componentDidMount() {
        //Do something here like hide splash screen
    }

    render(){
        if (this.state.isLoggedIn)
            return <RiddleList accessToken={this.state.accessToken}/>;
        else
            return <Login
                onLoginPress={() => this._onLogin()}
            />;

    }
}
