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
import {
    getAvailableFixedQuests,
    getAvailableEventQuests,
    getAvailableQuestsIsFetching,
    getAvailableQuestsErrorMessage
} from "../../reducers/quests";
import { errorMessage } from "../../utils/Utils"

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

    componentWillMount() {
        this.fetchData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            errorMessage(nextProps.error, 'danger', 'Retry', () => this.fetchData());
        }
    }

    onRefresh() {
        this.setState({isRefreshing: true});
        this.fetchData();
        this.setState({isRefreshing: false});
    }

    fetchData() {
        this.props.loadFixedQuests();
        this.props.loadEventQuests();
    }

    render() {
        const { isFetching, fixedQuests, eventQuests, navigation } = this.props;
        if (isFetching && !fixedQuests.length && !eventQuests.length) {
            return <Spinner color='#634405'/>;
        }
        return (
            <Container>
                <Content refreshControl={
                    <RefreshControl refreshing={this.state.isRefreshing} onRefresh={() => this.onRefresh()} />}>
                    <View style={{padding: 7}}>
                        <QuestList quests={fixedQuests} onQuestClick={(quest) => navigation.navigate('QuestDetails', {questId: quest.id})} />
                        {eventQuests.length > 0 && <H3 style={{marginLeft : 8, marginTop: 5}}>Event-Quests</H3>}
                        <QuestList quests={eventQuests} isEvent={true} onQuestClick={(quest) => navigation.navigate('QuestDetails', {questId: quest.id})} />
                        <View style={{marginTop : 5}} />
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fixedQuests: getAvailableFixedQuests(state),
        eventQuests: getAvailableEventQuests(state),
        error: getAvailableQuestsErrorMessage(state),
        isFetching: getAvailableQuestsIsFetching(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadFixedQuests: () => {
            dispatch(loadFixedQuests())
        },
        loadEventQuests: () => {
            dispatch(loadEventQuests())
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestListScreen);
