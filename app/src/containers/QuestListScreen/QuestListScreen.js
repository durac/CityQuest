/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, {Component} from "react";
import {View, RefreshControl} from "react-native";
import {Container, Header, Title, Content, Text, Spinner, H3} from "native-base";
import CityQuestHeader from "../../components/CQHeader";
import QuestList from "../../components/QuestList";
import {connect} from "react-redux";
import { loadFixedQuests, loadEventQuests } from "../../actions/questsActions";
import {
    getAvailableFixedQuests,
    getAvailableEventQuests,
    getAvailableQuestsIsFetching,
    getAvailableQuestsErrorMessage
} from "../../reducers/quests";
import { errorMessage } from "../../utils/Utils";
import s from "../../style/Style";
import Moment from "moment";

class QuestListScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        header: <CityQuestHeader title="Verfügbare Quests"/>
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
            errorMessage(nextProps.error, 'danger', 'Okay');
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
        const { navigation, isLoggedIn } = this.props;
        if (isLoggedIn && quest.registered) {
            navigation.navigate('QuestStation', {questId: quest.id});
        } else {
            navigation.navigate('QuestDetails', {questId: quest.id});
        }
    }

    onEventQuestClick(quest) {
        const { navigation, isLoggedIn } = this.props;
        if (isLoggedIn && quest.registered && Moment(quest.startDate) < Moment() && Moment(quest.endDate) > Moment()) {
            navigation.navigate('QuestStation', {questId: quest.id});
        } else {
            navigation.navigate('QuestDetails', {questId: quest.id});
        }
    }

    render() {
        const { isFetching, fixedQuests, eventQuests } = this.props;
        if (isFetching && !fixedQuests.length && !eventQuests.length) {
            return <View style={s.contentView}><Spinner/></View>;
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
        }
    }
};
export default connect(
    mapStateToProps,
    null,
    mergeProps
)(QuestListScreen);
