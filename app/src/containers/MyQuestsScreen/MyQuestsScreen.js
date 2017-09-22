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

class MyQuestsScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        header: <CityQuestHeader title='Meine Quests'/>
    });

    constructor(props) {
        super(props);
        this.state = {
            refreshing: false
        };
        this.loadData = this.loadData.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }

    componentDidMount() {
        this.loadData();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.isLoggedIn && !this.props.isLoggedIn) {
            this.props.loadUserFixedQuests();
            this.props.loadUserEventQuests();
        }
    }

    onRefresh() {
        this.setState({refreshing: true});
        this.loadData();
        this.setState({refreshing: false});
    }

    loadData(){
        if (this.props.isLoggedIn) {
            this.props.loadUserFixedQuests();
            this.props.loadUserEventQuests();
        }
    }

    render() {
        if (!this.props.isLoggedIn) {
            return <LoginPlaceholder />
        }
        return (
            <Container>
                <Content refreshControl={<RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />}>
                    { this.props.isFetching ?
                        <Spinner color='#634405'/>
                        :<View style={{padding: 7}}>
                            <QuestList quests={this.props.fixedQuests}
                                   onQuestClick={(quest) => this.props.navigation.navigate('QuestDetails', {fixedQuest: quest})}/>
                            {this.props.eventQuests.length > 0 &&
                            <H3 style={{marginLeft : 8, marginTop: 5}}>Event-Quests</H3>}
                            <QuestList quests={this.props.eventQuests}
                                   onQuestClick={(quest) => this.props.navigation.navigate('QuestDetails', {eventQuest: quest})}/>
                            <View style={{marginTop : 5}}/>
                        </View>
                    }
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fixedQuests: state.userQuests.fixedQuests,
        eventQuests: state.userQuests.eventQuests,
        error: state.userQuests.error,
        isFetching: state.userQuests.isFetching,
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
