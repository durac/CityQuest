/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, {Component} from "react";
import {View, RefreshControl} from "react-native";
import {Container, Header, Title, Content, Text, Spinner, H3} from "native-base";
import CityQuestHeader from "../CityQuestHeader";
import QuestList from "../../components/QuestList";
import {connect} from "react-redux";
import { loadFixedQuests, loadEventQuests } from "../../actions/questsActions";
import { loadCurrentQuestStation } from "../../actions/questStationActions";
import {
    getAvailableFixedQuests,
    getAvailableEventQuests,
    getAvailableQuestsIsFetching,
    getAvailableQuestsErrorMessage
} from "../../reducers/quests";
import { errorMessage, resetNavigation } from "../../utils/Utils"

class QuestListScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        header: <CityQuestHeader title="CityQuest"/>
    });

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.error && nextProps.error) {
            errorMessage(nextProps.error, 'danger', 'Retry', () => this.fetchData());
        }
        this.setState({isRefreshing: false});
    }

    onRefresh() {
        this.setState({isRefreshing: true});
        this.fetchData();
    }

    fetchData() {
        this.props.loadFixedQuests();
        this.props.loadEventQuests();
    }

    onFixedQuestClick(quest) {
        const { navigation, currenQuestStation, isLoggedIn } = this.props;
        if (quest.registered && isLoggedIn) {
            currenQuestStation(quest.id);
            navigation.navigate('QuestStation', {questId: quest.id});
        } else {
            navigation.navigate('QuestDetails', {questId: quest.id});
        }
    }

    onEventQuestClick(quest) {
        this.props.navigation.navigate('QuestDetails', {questId: quest.id});
    }

    render() {
        const { isFetching, fixedQuests, eventQuests } = this.props;
        if (isFetching && !fixedQuests.length && !eventQuests.length) {
            return (
                <Container>
                    <Content>
                        <Spinner color='#634405'/>
                    </Content>
                </Container>
            )
        }
        return (
            <Container>
                <Content refreshControl={
                    <RefreshControl refreshing={this.state.isRefreshing} onRefresh={() => this.onRefresh()} />}>
                    <View style={{padding: 7}}>
                        <QuestList quests={fixedQuests} onQuestClick={(quest) => this.onFixedQuestClick(quest)} />
                        {eventQuests.length > 0 && <H3 style={{marginLeft : 8, marginTop: 5}}>Event-Quests</H3>}
                        <QuestList quests={eventQuests} isEvent={true} onQuestClick={(quest) => this.onEventQuestClick(quest)} />
                        <View style={{marginTop : 5}} />
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: getAvailableQuestsIsFetching(state),
        fixedQuests: getAvailableFixedQuests(state),
        eventQuests: getAvailableEventQuests(state),
        error: getAvailableQuestsErrorMessage(state),
        isLoggedIn: state.auth.isLoggedIn
    }
};

const mergeProps = (stateProps, dispatchProps, ownProps) => {
    const { dispatch } = dispatchProps;
    const { isLoggedIn } = stateProps;
    return {
        ...stateProps,
        ...ownProps,
        loadFixedQuests: () => {
            dispatch(loadFixedQuests(isLoggedIn))
        },
        loadEventQuests: () => {
            dispatch(loadEventQuests(isLoggedIn))
        },
        currenQuestStation: (questId) => {
            dispatch(loadCurrentQuestStation(questId))
        }
    }
};
export default connect(
    mapStateToProps,
    null,
    mergeProps
)(QuestListScreen);
