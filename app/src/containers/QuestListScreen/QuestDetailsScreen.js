/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, {Component} from "react";
import {Alert, Image, AsyncStorage, View, StatusBar} from "react-native";
import {StackNavigator} from "react-navigation";
import {Container, Content, Spinner, Button, Icon, Text, H1, H2, Grid, Col} from "native-base";
import Moment from "moment";
import CityQuestHeader from "../../components/CQHeader";
import { postRegisterForQuest, postUnregisterFromQuest } from "../../actions/questsActions";
import { loadCurrentQuestStation } from "../../actions/questStationActions";
import { login } from '../../actions/authActions';
import { getQuest, getRegisterErrorMessage, getUserQuestsIsFetching } from "../../reducers/quests";
import { connect } from "react-redux";
import { errorMessage, resetNavigation } from "../../utils/Utils";
import s from "../../style/Style";

class QuestDetailsScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        header: <CityQuestHeader title="Details" includeBackIcon={true} navigation={navigation}/>
    });

    constructor(props) {
        super(props);
        this.ensureLoggedInRegistering = this.ensureLoggedInRegistering.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        const { quest, error, firstRiddle, navigation, isLoggedIn } = this.props;
        if (!error && nextProps.error) {
            errorMessage(nextProps.error, 'danger', 'Okay');
        }
        if (!quest.startDate) {
            if((!quest.registered && nextProps.quest.registered) || (isLoggedIn && quest.registered)) {
                firstRiddle(quest.id);
                resetNavigation(navigation, 'QLQuestStation', 'QuestList', quest.id);
            }
        }
    }

    ensureLoggedInRegistering(quest) {
        if (!this.props.isLoggedIn) {
            this.props.login();
        } else {
            if (!quest.registered) {
                this.props.registerForQuest(quest.id);
            } else {
                this.props.unregisterFromQuest(quest.id);
            }
        }
    }

    render() {
        const { quest, isFetching } = this.props;
        if (isFetching) {
            return <View style={s.contentView}><Spinner/></View>;
        }
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
                                <Button bordered danger block style={{marginTop: 50, borderRadius: 10}} onPress={() => this.ensureLoggedInRegistering(quest)}><Text>Abmelden</Text></Button>
                                : <Button bordered block style={{marginTop: 50, borderRadius: 10}} onPress={() => this.ensureLoggedInRegistering(quest)}><Text>Los gehts!</Text></Button>

                        }
                </Content>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isLoggedIn: state.auth.isLoggedIn,
        isFetching: getUserQuestsIsFetching(state),
        quest: getQuest(state,ownProps.navigation.state.params.questId),
        error: getRegisterErrorMessage(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: () => {
            dispatch(login())
        },
        registerForQuest: (questId) => {
            dispatch(postRegisterForQuest(questId))
        },
        unregisterFromQuest: (questId) => {
            dispatch(postUnregisterFromQuest(questId))
        },
        firstRiddle: (questId) => {
            dispatch(loadCurrentQuestStation(questId))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestDetailsScreen);
