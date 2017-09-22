/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, {Component} from "react";
import {RefreshControl, View, AsyncStorage} from "react-native";
import {StackNavigator} from "react-navigation";
import {
    Container,
    Header,
    Title,
    Content,
    Button,
    Left,
    Right,
    Body,
    Icon,
    Text,
    Card,
    CardItem,
    Spinner,
    Thumbnail,
    H2,
    H3
} from "native-base";
import Moment from "moment";
import CityQuestHeader from "../CityQuestHeader";
import {getData} from "../../utils/Utils";
import s from "../../style/Style";

export default class MyQuestsScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        header: <CityQuestHeader title='Meine Quests'/>
    });

    constructor(props) {
        super(props);
        this.state = {
            fixedQuests: [],
            eventQuests: [],
            loading: true,
            refreshing: false
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
                <CardItem button
                          onPress={() => this.props.navigation.navigate('QuestDetails', {fixedQuest: f})}
                          style={s.cardItem}>
                    <Left>
                        <Thumbnail square
                                   style={s.thumbnail}
                                   source={{uri: f.image}}/>
                    </Left>
                    <Body>
                    <H3 style={[s.h3, {marginTop : 10, fontWeight: "bold"}]}>{f.name}</H3>
                    <Text numberOfLines={1} style={[s.cardInfoText, {marginTop : 8}]}><Icon name="pin"
                                                                                            style={s.cardInfoText}/> {f.area}
                    </Text>
                    <Text style={s.cardInfoText}><Icon name="time" style={s.cardInfoText}/> ~{f.duration} min</Text>
                    <Text>
                        <Icon name="school" style={s.difficultyIcon}/>
                        <Icon name="school"
                              style={[s.difficultyIcon, f.difficulty == 'EASY' ? {color: 'lightgrey'} : undefined]}/>
                        <Icon name="school"
                              style={[s.difficultyIcon, f.difficulty == 'HARD' ? undefined : {color: 'lightgrey'}]}/>
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
                <CardItem button
                          onPress={() => this.props.navigation.navigate('QuestDetails', {eventQuest: e})}
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
                                                                          style={s.cardInfoText}/> {Moment(e.startDate).format('DD.MM.YYYY - HH:mm')}
                        Uhr
                    </Text>
                    <Text numberOfLines={1} style={s.cardInfoText}><Icon name="pin" style={s.cardInfoText}/> {e.area}</Text>
                    <Text style={s.cardInfoText}><Icon name="time" style={s.cardInfoText}/> ~{e.duration} min</Text>
                    <Text><Icon name="school" style={s.difficultyIcon}/>
                        <Icon name="school"
                              style={[s.difficultyIcon, e.difficulty == 'EASY' ? {color: 'lightgrey'} : undefined]}/>
                        <Icon name="school"
                              style={[s.difficultyIcon, e.difficulty == 'HARD' ? undefined : {color: 'lightgrey'}]}/></Text>
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
                        {this.state.eventQuests.length ?
                            <H3 style={{marginLeft : 8, marginTop: 5}}>Event-Quests</H3> : undefined}
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
        AsyncStorage.getItem('userinfo', (err, result) => {
            const res = JSON.parse(result);
            if (res != undefined) {
                getData('fixedQuestsOfUser',
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
                    }, res.accessToken);
            } else {
                this.setState({
                    fixedQuests: [],
                    loading: false,
                    refreshing: false
                });
            }
        });
    };

    fetchEventQuests() {
        this.setState({loading: true});
        AsyncStorage.getItem('userinfo', (err, result) => {
            const res = JSON.parse(result);
            if (res != undefined) {
                getData('eventQuestsOfUser',
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
                    }, res.accessToken);
            } else {
                this.setState({
                    eventQuests: [],
                    loading: false,
                    refreshing: false
                });
            }
        });

    };
}
