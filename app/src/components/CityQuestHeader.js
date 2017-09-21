/**
 * Created by Dominik Schwarz on 13.09.2017.
 */
import React from "react";
import { connect } from 'react-redux';
import { login, logout } from '../actions/index.js';
import DefaultHeader from './DefaultHeader';

const mapStateToProps = (state, ownProps) => {
    return {
        title: ownProps.title,
        includeBackIcon: ownProps.includeBackIcon,
        navigation: ownProps.navigation,
        isLoggedIn: state.isLoggedIn
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        onLoginClick: () => {
            dispatch(login())
        },
        onLogoutClick: () => {
            dispatch(logout())
        }
    }
};

const CityQuestHeader = connect(
    mapStateToProps,
    mapDispatchToProps
)(DefaultHeader);

export default CityQuestHeader;
