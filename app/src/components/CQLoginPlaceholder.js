/**
 * Created by Dominik Schwarz on 22.09.2017.
 */
import React from "react";
import PropTypes from 'prop-types';
import { View } from "react-native";
import {Container, Text, Icon, Button} from "native-base";
import s from "../style/Style";
import { connect } from 'react-redux';
import { login } from '../actions/authActions.js';

const LoginPlaceholder = ({onLoginClick}) => (
        <View style={s.placeholderView}>
            <Icon name="log-in" style={[s.placeholderText, {fontSize: 100}]} />
            <Text style={[{paddingTop: 20}, s.placeholderText]}>Bitte logge dich ein,</Text>
            <Text style={s.placeholderText}>um diesen Screen zu sehen.</Text>
            <Button bordered onPress={onLoginClick} style={{marginTop: 20, borderRadius: 10, alignSelf: 'center'}}><Text>Login</Text></Button>
        </View>
);

LoginPlaceholder.propTypes = {
    onLoginClick: PropTypes.func.isRequired
};


const mapDispatchToProps = (dispatch) => {
    return {
        onLoginClick: () => {
            dispatch(login())
        }
    }
};

const CQLoginPlaceholder = connect(
    null,
    mapDispatchToProps
)(LoginPlaceholder);

export default CQLoginPlaceholder;
