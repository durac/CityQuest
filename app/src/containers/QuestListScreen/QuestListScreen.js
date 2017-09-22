/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, {Component} from "react";
import { View, RefreshControl } from "react-native";
import { Container, Header, Title, Content, Text, Spinner, H3 } from "native-base";
import CityQuestHeader from "../CityQuestHeader";
import QuestList from "../../components/QuestList";
import { connect } from "react-redux";
import { loadFixedQuests, loadEventQuests } from "../../actions/questsActions.js";

class QuestListScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        header: <CityQuestHeader title="CityQuest"/>
    });

    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false
        };
        this.onRefresh = this.onRefresh.bind(this);
    }

    componentWillMount() {
        this.props.loadFixedQuests();
        this.props.loadEventQuests();
    }

    onRefresh() {
        this.setState({isRefreshing: true});
        this.props.loadFixedQuests();
        this.props.loadEventQuests();
        this.setState({isRefreshing: false});
    }

    render() {
        return (
            <Container>
                <Content refreshControl={
                    <RefreshControl refreshing={this.state.isRefreshing} onRefresh={this.onRefresh} />
                }>
                    { this.props.isFetching ?
                        <Spinner color='#634405'/>
                        : <View style={{padding: 7}}>
                            <QuestList quests={this.props.fixedQuests} onQuestClick={(quest) => this.props.navigation.navigate('QuestDetails', {fixedQuest: quest})} />
                            {this.props.eventQuests.length ?
                                <H3 style={{marginLeft : 8, marginTop: 5}}>Event-Quests</H3> : undefined}
                            <QuestList quests={this.props.eventQuests} isEvent={true} onQuestClick={(quest) => this.props.navigation.navigate('QuestDetails', {eventQuest: quest})} />
                            <Text style={{marginTop : 5}}></Text>
                        </View>
                    }
                </Content>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        fixedQuests: state.quests.fixedQuests,
        eventQuests: state.quests.eventQuests,
        error: state.quests.error,
        isFetching: state.quests.isFetching
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
