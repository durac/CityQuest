/**
 * Created by Dominik Schwarz on 24.07.2017.
 */
import React, { Component } from "react";
import { Alert, Button, StyleSheet, View, Text } from "react-native";

export default class Login extends Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.header}>
                    Auth0Sample - Login
                </Text>
                <Button onPress={this.props.onLoginPress} title="Log In" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    header: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
});

