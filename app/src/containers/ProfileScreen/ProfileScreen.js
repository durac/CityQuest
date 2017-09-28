/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, {Component} from "react";
import { StyleSheet, View, Image } from "react-native";
import {Container, Content, Icon, Text, Spinner, H1} from 'native-base';
import CityQuestHeader from "../CityQuestHeader";
import { connect } from 'react-redux';
import LoginPlaceholder from "../../components/LoginPlaceholder";
import { getUserinfo } from "../../actions/authActions"
import s from "../../style/Style";

class ProfileScreen extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const {isLoggedIn, accessToken, getUserinfo} = this.props;
        if(isLoggedIn) {
            getUserinfo(accessToken);
        }
    }

    componentWillReceiveProps(nextProps) {
        const {isLoggedIn, accessToken, getUserinfo} = this.props;
        if (nextProps.isLoggedIn && !isLoggedIn) {
            getUserinfo(nextProps.accessToken);
        }
    }

    render() {
        const { isLoggedIn, isFetching, userinfo } = this.props;
        if (isFetching) {
            return <Container>
                    <CityQuestHeader title='Profil'/>
                    <View style={s.contentView}><Spinner/></View>
                </Container>;
        }
        return (
            <Container>
                <CityQuestHeader title='Profil'/>
                {!isLoggedIn ? <LoginPlaceholder />
                : <Content>
                    <Image source={require('../../../assets/profileBG.png')} style={styles.profileBackground}>
                        <Image source={{uri: userinfo.picture}} style={styles.avatar}/>
                        <H1 style={styles.nameText}>{userinfo.nickname}</H1>
                    </Image>
                </Content>}
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    profileBackground: {
        width: null,
        height: 200,
        justifyContent: 'flex-end',
        alignItems: 'stretch',
        backgroundColor: "lightgray"
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: 'center'
    },
    nameText: {
        fontSize: 32,
        lineHeight: 42,
        fontWeight: "bold",
        paddingLeft: 20,
        color: "#fff",
        paddingVertical: 10
    }
});

const mapStateToProps = (state) => {
    return {
        isFetching: state.auth.isFetching,
        isLoggedIn: state.auth.isLoggedIn,
        accessToken: state.auth.accessToken,
        userinfo: state.auth.userinfo
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUserinfo: (accessToken) => {
            dispatch(getUserinfo(accessToken))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ProfileScreen);
