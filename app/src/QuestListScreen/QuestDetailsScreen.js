/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, {Component} from "react";
import {Alert, Image, AsyncStorage, View, StatusBar} from "react-native";
import {StackNavigator} from "react-navigation";
import {Container, Header, Title, Content, Button, Icon, Text, H1, H2, Grid, Col, Left} from "native-base";
import Moment from "moment";
import CityQuestHeader from "../components/CityQuestHeader";
import s from "../style/Style";
import {getData, postData, login} from "../utils/Utils.js";
export default class QuestDetailsScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        header: <CityQuestHeader title="Details" includeBackIcon={true} navigation={navigation}/>
    });

    constructor(props) {
        super(props);
        this.state = {
            quest: [],
            registered: false
        };
        this.registerForQuest = this.registerForQuest.bind(this);
        this.unregisterFromQuest = this.unregisterFromQuest.bind(this);
        this.isRegistered = this.isRegistered.bind(this);
    }

    componentWillMount() {
        if (this.props.navigation.state.params.eventQuest == undefined) {
            this.setState({
                quest: this.props.navigation.state.params.fixedQuest
            });
        } else {
            this.setState({
                quest: this.props.navigation.state.params.eventQuest
            });
        }
        this.isRegistered();
    }

    registerForQuest(){
        AsyncStorage.getItem('userinfo', (err, result) => {
            const res = JSON.parse(result);
            if(res != undefined){
                postData('registerForQuest?questId='+this.state.quest.id, () =>{
                    this.setState({
                        registered: true
                    });
                }, () => {}, res.accessToken);
            } else {
                login(this.registerForQuest);
            }
        });
    }

    unregisterFromQuest(){
        AsyncStorage.getItem('userinfo', (err, result) => {
            const res = JSON.parse(result);
            if(res != undefined){
                postData('unregisterFromQuest?questId='+this.state.quest.id, () => {
                    this.setState({
                        registered: false
                    });
                }, () => {}, res.accessToken);
            }
        });
    }

    isRegistered() {
        AsyncStorage.getItem('userinfo', (err, result) => {
            const res = JSON.parse(result);
            if(res != undefined){
                getData('isRegistered?questId='+this.state.quest.id,
                    apiRes => {
                        this.setState({
                            registered: apiRes
                        });
                    }, () => {}, res.accessToken);
            }
        });
    };

    render() {
        return (
            <Container>
                <Content>
                    <Image blurRadius={0} style={s.headerImage} source={{uri: this.state.quest.image}}>
                        <H1 style={s.detailsTitle}>{this.state.quest.name}</H1>
                    </Image>
                    <Content style={{padding: 20}}>
                        <H2>Beschreibung</H2>
                        <Text style={s.description}>{this.state.quest.description}</Text>
                        {
                            (this.state.quest.startDate) ?
                                <View style={{paddingTop: 20}}><Text style={{fontWeight: "bold"}}>Start: {Moment(this.state.quest.startDate).format('DD.MM.YYYY - HH:mm')} Uhr</Text></View>
                                : undefined
                        }
                        <Grid>
                            <Col>
                                <View style={[s.detailsInfoView, {paddingTop: 40}]}><Icon style={s.detailsInfoIcon} name="pin"/><Text stlye={s.detailsInfoText}>  {this.state.quest.area}</Text></View>
                                <View style={s.detailsInfoView}>
                                    <Icon name="school" />
                                    <Icon name="school" style={[this.state.quest.difficulty == 'EASY' ? {color: 'lightgrey'} : undefined]}/>
                                    <Icon name="school" style={[this.state.quest.difficulty == 'HARD' ? undefined : {color: 'lightgrey'}]}/>
                                </View>
                            </Col>
                            <Col>
                                <View style={[s.detailsInfoView, {paddingTop: 40}]}><Icon style={s.detailsInfoIcon} name="time"/><Text stlye={s.detailsInfoText}>  ~{this.state.quest.duration} min</Text></View>
                                <View style={s.detailsInfoView}><Icon style={[s.detailsInfoIcon, {paddingLeft: 3}]} name="walk"/><Text stlye={s.detailsInfoText}>   ~{this.state.quest.distance} km</Text></View>
                            </Col>
                        </Grid>
                        {
                            this.state.registered ?
                                <Button bordered danger block style={{marginTop: 50, borderRadius: 10}} onPress={this.unregisterFromQuest}><Text>Abmelden</Text></Button>
                                : <Button bordered block style={{marginTop: 50, borderRadius: 10}} onPress={this.registerForQuest}><Text>Los gehts!</Text></Button>

                        }
                </Content>
                </Content>
            </Container>
        );
    }
}
