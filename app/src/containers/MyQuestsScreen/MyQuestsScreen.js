/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, {Component} from "react";
import { RefreshControl, View } from "react-native";
import { Container, Content, Text, Spinner, H3} from "native-base";
import CityQuestHeader from "../CityQuestHeader";
import QuestList from "../../components/QuestList";
import LoginPlaceholder from "../../components/LoginPlaceholder";
import { connect } from "react-redux";
import { loadUserFixedQuests, loadUserEventQuests } from "../../actions/questsActions.js";
import {
    getUserFixedQuests,
    getUserEventQuests,
    getUserQuestsIsFetching,
    getUserQuestsErrorMessage
} from "../../reducers/quests";
import { errorMessage } from "../../utils/Utils"


class MyQuestsScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        header: <CityQuestHeader title='Meine Quests'/>
    });

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggedIn && !this.props.isLoggedIn) {
            this.props.loadUserFixedQuests();
            this.props.loadUserEventQuests();
        }
        if (nextProps.error) {
            errorMessage(nextProps.error, 'danger', 'Retry', () => this.fetchData());
        }
    }

    onRefresh() {
        this.setState({refreshing: true});
        this.fetchData();
        this.setState({refreshing: false});
    }

    fetchData(){
        if (this.props.isLoggedIn) {
            this.props.loadUserFixedQuests();
            this.props.loadUserEventQuests();
        }
    }

    render() {
        const { isLoggedIn, isFetching, error, fixedQuests, eventQuests, navigation } = this.props;
        if (!isLoggedIn) {
            return <LoginPlaceholder />
        }
        if (isFetching && !fixedQuests.length && !eventQuests.length) {
            return <Spinner color='#634405'/>;
        }
        return (
            <Container>
                <Content refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />}>
                    <View style={{padding: 7}}>
                        <QuestList quests={fixedQuests}
                                   onQuestClick={(quest) => navigation.navigate('QuestDetails', {questId: quest.id})}/>
                        {this.props.eventQuests.length > 0 &&
                        <H3 style={{marginLeft : 8, marginTop: 5}}>Event-Quests</H3>}
                        <QuestList quests={eventQuests}
                                   onQuestClick={(quest) => navigation.navigate('QuestDetails', {questId: quest.id})}/>
                        <View style={{marginTop : 5}}/>
                    </View>
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fixedQuests: getUserFixedQuests(state),
        eventQuests: getUserEventQuests(state),
        error: getUserQuestsErrorMessage(state),
        isFetching: getUserQuestsIsFetching(state),
        isLoggedIn: state.auth.isLoggedIn
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadUserFixedQuests: () => {
            dispatch(loadUserFixedQuests())
        },
        loadUserEventQuests: () => {
            dispatch(loadUserEventQuests())
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyQuestsScreen);
