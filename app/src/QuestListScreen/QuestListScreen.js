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
import {getData} from "../utils/Utils";
import s from "../style/Style";
import {CityQuestHeader} from "../components/CityQuestHeader";

var credentials = require("../utils/auth0-credentials");
const auth0 = new Auth0(credentials);

export default class QuestListScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        header: <CityQuestHeader title='CityQuest'/>
    });

    constructor(props) {
        super(props);
        this.state = {
            fixedQuests: [],
            eventQuests: [],
            loading: true,
            refreshing: false,
        };
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
                <CardItem button onPress={() => this.props.navigation.navigate('QuestDetails', {fixedQuest: f, title: f.name})}
                          style={s.cardItem}>
                    <Left>
                        <Thumbnail square
                                   style={s.thumbnail}
                                   source={{uri: f.image}}/>
                    </Left>
                    <Body>
                    <H3 style={[s.h3, {marginTop : 10, fontWeight: "bold"}]}>{f.name}</H3>
                    <Text numberOfLines={1} style={[s.cardInfoText, {marginTop : 8}]}><Icon name="pin" style={s.cardInfoText}/> {f.area}</Text>
                    <Text style={s.cardInfoText}><Icon name="time" style={s.cardInfoText}/> ~{f.duration} min</Text>
                    <Text>
                        <Icon name="school" style={s.difficultyIcon}/>
                        <Icon name="school" style={[s.difficultyIcon, f.difficulty == 'EASY' ? {color: 'lightgrey'} : undefined]}/>
                        <Icon name="school" style={[s.difficultyIcon, f.difficulty == 'HARD' ? undefined : {color: 'lightgrey'}]}/>
                    </Text>
                    </Body>
                    <Right>
                        <Icon name="ios-arrow-forward" style={s.cardArrow}/>
                    </Right>
                </CardItem>
            </Card>
        );
        const eventQuests = this.state.eventQuests.map((e, i) =>
            <Card key={i}>
                <CardItem button onPress={() => this.props.navigation.navigate('QuestDetails', {eventQuest: e, title: e.name})}
                          style={s.cardItem}>
                    <Left>
                        <Thumbnail square
                                   style={s.thumbnail}
                                   source={{uri: e.image}}
                        />
                    </Left>
                    <Body>
                    <H3 numberOfLines={1} style={[s.h3, {marginTop : 10, fontWeight: "bold"}]}>{e.name}</H3>
                    <Text style={[s.cardInfoText, {marginTop : 3}]}><Icon name="play"
                                                                          style={s.cardInfoText}/> {Moment(e.startDate).format('DD.MM.YYYY - HH:mm')} Uhr
                    </Text>
                    <Text numberOfLines={1} style={s.cardInfoText}><Icon name="pin" style={s.cardInfoText}/> {e.area}</Text>
                    <Text style={s.cardInfoText}><Icon name="time" style={s.cardInfoText}/> ~{e.duration} min</Text>
                    <Text><Icon name="school" style={s.difficultyIcon}/>
                        <Icon name="school" style={[s.difficultyIcon, e.difficulty == 'EASY' ? {color: 'lightgrey'} : undefined]}/>
                        <Icon name="school" style={[s.difficultyIcon, e.difficulty == 'HARD' ? undefined : {color: 'lightgrey'}]}/></Text>
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

    onRefresh() {
        this.setState({refreshing: true});
        this.fetchFixedQuests();
        this.fetchEventQuests();
    }

    fetchFixedQuests() {
        this.setState({loading: true});
        getData('activeFixedQuests',
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
        getData('openedEventQuests',
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
