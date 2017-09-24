/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, {Component} from "react";
import {Alert, Image, AsyncStorage, View, StatusBar} from "react-native";
import {StackNavigator} from "react-navigation";
import {Container, Header, Title, Content, Button, Icon, Text, H1, H2, Grid, Col, Left} from "native-base";
import Moment from "moment";
import CityQuestHeader from "../CityQuestHeader";
import s from "../../style/Style";
import {getData, postData, login} from "../../utils/Utils.js";
import { postRegisterForQuest, postUnregisterFromQuest } from "../../actions/questsActions.js";
import { connect } from "react-redux";
import { getQuest, getUserQuestsErrorMessage } from "../../reducers/quests";

class QuestDetailsScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        header: <CityQuestHeader title="Details" includeBackIcon={true} navigation={navigation}/>
    });

    constructor(props) {
        super(props);
    }

    render() {
        const {quest} = this.props;
        return (
            <Container>
                <Content>
                    <Image blurRadius={0} style={s.headerImage} source={{uri: quest.image}}>
                        <H1 style={s.detailsTitle}>{quest.name}</H1>
                    </Image>
                    <Content style={{padding: 20}}>
                        <H2>Beschreibung</H2>
                        <Text style={s.description}>{quest.description}</Text>
                        {
                            (quest.startDate) ?
                                <View style={{paddingTop: 20}}><Text style={{fontWeight: "bold"}}>Start: {Moment(quest.startDate).format('DD.MM.YYYY - HH:mm')} Uhr</Text></View>
                                : undefined
                        }
                        <Grid>
                            <Col>
                                <View style={[s.detailsInfoView, {paddingTop: 40}]}><Icon style={s.detailsInfoIcon} name="pin"/><Text stlye={s.detailsInfoText}>  {quest.area}</Text></View>
                                <View style={s.detailsInfoView}>
                                    <Icon name="school" />
                                    <Icon name="school" style={[quest.difficulty == 'EASY' ? {color: 'lightgrey'} : undefined]}/>
                                    <Icon name="school" style={[quest.difficulty == 'HARD' ? undefined : {color: 'lightgrey'}]}/>
                                </View>
                            </Col>
                            <Col>
                                <View style={[s.detailsInfoView, {paddingTop: 40}]}><Icon style={s.detailsInfoIcon} name="time"/><Text stlye={s.detailsInfoText}>  ~{quest.duration} min</Text></View>
                                <View style={s.detailsInfoView}><Icon style={[s.detailsInfoIcon, {paddingLeft: 3}]} name="walk"/><Text stlye={s.detailsInfoText}>   ~{quest.distance} km</Text></View>
                            </Col>
                        </Grid>
                        {
                            quest.registered ?
                                <Button bordered danger block style={{marginTop: 50, borderRadius: 10}} onPress={() => this.props.unregisterFromQuest(quest.id)}><Text>Abmelden</Text></Button>
                                : <Button bordered block style={{marginTop: 50, borderRadius: 10}} onPress={() => this.props.registerForQuest(quest.id)}><Text>Los gehts!</Text></Button>

                        }
                </Content>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        quest: getQuest(state,ownProps.navigation.state.params.questId),
        error: getUserQuestsErrorMessage(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        registerForQuest: (questId) => {
            dispatch(postRegisterForQuest(questId))
        },
        unregisterFromQuest: (questId) => {
            dispatch(postUnregisterFromQuest(questId))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestDetailsScreen);
