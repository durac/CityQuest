/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, {Component} from "react";
import { StackNavigator } from 'react-navigation';
import {Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Spinner} from 'native-base';
import CityQuestHeader from "../CityQuestHeader";
import { connect } from 'react-redux';
import LoginPlaceholder from "../../components/LoginPlaceholder";

class ProfileScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {
    }


    render() {
        const { isLoggedIn } = this.props;
        if (!isLoggedIn) {
            return (
                <Container>
                    <CityQuestHeader title='Profil'/>
                    <LoginPlaceholder />
                </Container>
            );
        }
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


const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.auth.isLoggedIn
    }
};

const mapDispatchToProps = (dispatch) => {
    return {

        }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileScreen);
