/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, {Component} from "react";
import Auth0 from "react-native-auth0";
import {Alert, View, RefreshControl, AsyncStorage} from "react-native";
import {StackNavigator} from "react-navigation";
import {Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Card, CardItem,
    Spinner, Thumbnail, H2, H3} from "native-base";
import Moment from "moment";
import {fetchData} from "../utils/Utils";
import s from "../style/Style";
import {CityQuestHeader} from "../components/CityQuestHeader";

var credentials = require("../utils/auth0-credentials");
const auth0 = new Auth0(credentials);

export default class QuestListScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        header: <CityQuestHeader title='Quest-Liste'/>
    });

    constructor(props) {
        super(props);
        this.state = {
            fixedQuests: [],
            eventQuests: [],
            ready: false,
            loading: true,
            refreshing: false,
            isLoggedIn: false,
            accessToken: '',
            userId: ''
        };
        this.difficultyToSymbol = this.difficultyToSymbol.bind(this);
        this.fetchFixedQuests = this.fetchFixedQuests.bind(this);
        this.fetchEventQuests = this.fetchEventQuests.bind(this);
        this.onRefresh = this.onRefresh.bind(this);
    }

    componentDidMount() {
        this.fetchFixedQuests();
        this.fetchEventQuests();
    }


    render() {
        const fixedQuests = this.state.fixedQuests.map((f, i) =>
            <Card key={i}>
                <CardItem button onPress={() => this.props.navigation.navigate('QuestDetails', {fixedQuest: f})}
                          style={s.cardItem}>
                    <Left>
                        <Thumbnail square
                                   style={s.thumbnail}
                                   source={{uri: f.image}}/>
                    </Left>
                    <Body>
                    <H3 style={[s.h3, {marginTop : 10}]}>{f.name}</H3>
                    <Text style={[s.infoText, {marginTop : 8}]}><Icon name="pin" style={s.infoText}/> {f.area}</Text>
                    <Text style={s.infoText}><Icon name="time" style={s.infoText}/> {f.duration} min</Text>
                    {this.difficultyToSymbol(f.difficulty)}
                    </Body>
                    <Right>
                        <Icon name="ios-arrow-forward" style={s.cardArrow}/>
                    </Right>
                </CardItem>
            </Card>
        );
        const eventQuests = this.state.eventQuests.map((e, i) =>
            <Card key={i}>
                <CardItem button onPress={() => this.props.navigation.navigate('QuestDetails', {eventQuest: e})}
                          style={s.cardItem}>
                    <Left>
                        <Thumbnail square
                                   style={s.thumbnail}
                                   source={{uri: e.image}}
                        />
                    </Left>
                    <Body>
                    <H3 style={[s.h3, {marginTop : 10}]}>{e.name}</H3>
                    <Text style={[s.infoText, {marginTop : 3}]}><Icon name="play"
                                                        style={s.infoText}/> {Moment(e.startDate).format('DD.MM.YYYY HH:mm')}
                    </Text>
                    <Text style={s.infoText}><Icon name="pin" style={s.infoText}/> {e.area}</Text>
                    <Text style={s.infoText}><Icon name="time" style={s.infoText}/> {e.duration} min</Text>
                    {this.difficultyToSymbol(e.difficulty)}
                    </Body>
                    <Right>
                        <Icon name="ios-arrow-forward" style={s.cardArrow}/>
                    </Right>
                </CardItem>
            </Card>
        );
        return (
            <Container>
                <Content refreshControl={
                    <RefreshControl refreshing={this.state.refreshing} onRefresh={this.onRefresh} />
                }>
                    { this.state.loading ?
                        <Spinner color='#634405'/>
                        : <View style={{padding: 7}}>
                            {fixedQuests}
                            <H3 style={{marginLeft : 8, marginTop: 5}}>Event-Quests</H3>
                            {eventQuests}
                            <Text style={{marginTop : 5}}></Text>
                        </View>
                    }
                </Content>
            </Container>
        );
    }

    difficultyToSymbol(difficulty) {
        return <Text><Icon name="school" style={s.difficultyIcon}/>
            <Icon name="school" style={[s.difficultyIcon, (difficulty == 'EASY') ? {color: 'lightgrey'} : undefined]}/>
            <Icon name="school" style={[s.difficultyIcon, difficulty == 'HARD' ? undefined : {color: 'lightgrey'}]}/></Text>;
    }

    onRefresh() {
        this.setState({refreshing: true});
        this.fetchFixedQuests();
        this.fetchEventQuests();
    }

    fetchFixedQuests() {
        this.setState({loading: true});
        fetchData('activeFixedQuests',
            res => {
                this.setState({
                    fixedQuests: res,
                    loading: false,
                    refreshing: false
                });
            },
            error => {
                this.setState({
                    loading: false,
                    refreshing: false
                });
                Alert.alert(
                    'Da stimmt was nicht!',
                    'Leider konnten keine Daten empfangen werden. Bitte versuche es noch einmal.'
                );
            });
    };

    fetchEventQuests() {
        this.setState({loading: true});
        fetchData('openedEventQuests',
            res => {
                this.setState({
                    eventQuests: res,
                    loading: false,
                    refreshing: false
                });
            },
            error => {
                this.setState({
                    loading: false,
                    refreshing: false
                });
                Alert.alert(
                    'Da stimmt was nicht!',
                    'Leider konnten keine Daten empfangen werden. Bitte versuche es noch einmal.'
                );
            });
    };
}
