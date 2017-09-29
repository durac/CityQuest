/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, {Component} from "react";
import { StyleSheet, View, Image } from "react-native";
import {Container, Content, Icon, Text, Spinner, H1, H2, H3, Grid, Col, Row} from 'native-base';
import CityQuestHeader from "../../components/CQHeader";
import { connect } from 'react-redux';
import CQLoginPlaceholder from "../../components/CQLoginPlaceholder";
import { getUserinfo } from "../../actions/authActions";
import {getNumberOfFixedQuests, getNumberOfEventQuests} from "../../reducers/quests";
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
        const { isLoggedIn, isFetching, userinfo, fixedQuestsNumber, eventQuestsNumber } = this.props;
        if (isFetching) {
            return <Container>
                    <CityQuestHeader title='Profil'/>
                    <View style={s.contentView}><Spinner/></View>
                </Container>;
        }
        return (
            <Container>
                <CityQuestHeader title='Profil'/>
                {!isLoggedIn ? <CQLoginPlaceholder/>
                : <View style={{flex: 1}}>
                    <View style={s.profileBackground}>
                        <Image source={{uri: userinfo.picture}} style={s.profileAvatar}/>
                        <H1 numberOfLines={1} style={s.profileNameText}>{userinfo.name}</H1>
                    </View>
                    <Grid >
                        <Col style={s.profileCol}>
                            <Row style={s.profileElement}>
                                <Text style={{marginTop: 20}}>#Quests</Text>
                                <H1 style={s.profileElementNumber}> {fixedQuestsNumber+eventQuestsNumber} </H1>
                            </Row>
                            <Row style={s.profileElement}>
                                <Text style={{marginTop: -30}}>#Fixed</Text>
                                <H1 style={s.profileElementNumber}> {fixedQuestsNumber} </H1>
                            </Row>
                        </Col>
                        <Col style={s.profileCol}>
                            <Row style={s.profileElement}>
                                <Text style={{marginTop: 20}}>Bestes Erg.</Text>
                                <H1 style={s.profileElementNumber}> 2.</H1>
                            </Row>
                            <Row style={s.profileElement}>
                                <Text style={{marginTop: -30}}>#Events</Text>
                                <H1 style={s.profileElementNumber}> {eventQuestsNumber} </H1>
                            </Row>
                        </Col>
                    </Grid>
                </View>}
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: state.auth.isFetching,
        isLoggedIn: state.auth.isLoggedIn,
        accessToken: state.auth.accessToken,
        userinfo: state.auth.userinfo,
        fixedQuestsNumber: getNumberOfFixedQuests(state),
        eventQuestsNumber: getNumberOfEventQuests(state)
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
