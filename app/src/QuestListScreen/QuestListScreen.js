/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, {Component} from "react";
import Auth0 from "react-native-auth0";
import {Alert, StyleSheet} from "react-native";
import {StackNavigator} from "react-navigation";
import {
    StyleProvider,
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
import Moment from 'moment';

import Utils from "../utils/Utils";

var credentials = require('../utils/auth0-credentials');
const auth0 = new Auth0(credentials);

export default class QuestListScreen extends Component {

    static onLogin() {
        auth0
            .webAuth
            .authorize({
                scope: 'openid profile read:riddles',
                audience: 'https://cityquest.at/api/',
                responseType: 'token id_token'
            })
            .then(credentials => {
                auth0
                    .auth
                    .userInfo({token: credentials.accessToken})
                    .then(userinfo => {
                        this.setState({
                            isLoggedIn: true,
                            accessToken: credentials.accessToken,
                            userId: userinfo.sub.split('|')[1]
                        });

                    })
                    .catch(error => {
                        console.log(error);
                        Alert.alert('Error', 'Oh no! An error occured. Sorry for that!');
                    });

            })
            .catch(error => {
                console.log(error);
                Alert.alert('Error', 'Oh no! An error occured. Sorry for that!');
            });
    }

    static navigationOptions = ({navigation}) => ({
        header: (
            <Header>
                <Body>
                <Title>Quest-Liste</Title>
                </Body>
                <Right>
                    <Button transparent onPress={() => this.onLogin()}>
                        <Icon name="more"/>
                    </Button>
                </Right>
            </Header>
        )
    });

    constructor(props) {
        super(props);
        this.state = {
            fixedQuests: [],
            eventQuests: [],
            loading: true,
            refreshing: false,
            isLoggedIn: false,
            accessToken: '',
            userId: ''
        };
        this.difficultyToSymbol = this.difficultyToSymbol.bind(this);
        this.fetchFixedQuests = this.fetchFixedQuests.bind(this);
        this.fetchEventQuests = this.fetchEventQuests.bind(this);
    }

    componentDidMount() {
        this.fetchFixedQuests();
        this.fetchEventQuests();
    }

    render() {
        if (this.state.loading)
            return (
                <Container>
                    <Content padder>
                        <Spinner color='#634405'/>
                    </Content>
                </Container>
            )
        else {
            const fixedQuests = this.state.fixedQuests.map((f, i) =>
                <Card key={i}>
                    <CardItem button onPress={() => this.props.navigation.navigate("QuestDetails")} style={styles.cardItem}>
                        <Left>
                            <Thumbnail square
                                       style={styles.thumbnail}
                                       source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}/>
                        </Left>
                        <Body>
                            <H3 style={{marginTop : 10}}>{f.name}</H3>
                            <Text style={{marginTop : 8}}></Text>
                            <Text style={styles.infoText}><Icon name="pin" style={styles.infoText}/> {f.area}</Text>
                            <Text style={styles.infoText}><Icon name="time" style={styles.infoText}/> {f.duration} min</Text>
                            {this.difficultyToSymbol(f.difficulty)}
                        </Body>
                        <Right>
                            <Icon name="ios-arrow-forward" style={styles.cardArrow}/>
                        </Right>
                    </CardItem>
                </Card>
            );
            const eventQuests = this.state.eventQuests.map((e, i) =>
                <Card key={i}>
                    <CardItem button onPress={() => this.props.navigation.navigate("QuestDetails")} style={styles.cardItem}>
                        <Left>
                            <Thumbnail square
                                       style={styles.thumbnail}
                                       source={{uri: 'https://facebook.github.io/react/img/logo_og.png'}}
                            />
                        </Left>
                        <Body>
                            <H3  style={{marginTop : 10}}>{e.name}</H3>
                            <Text style={{marginTop : 3}}></Text>
                            <Text style={styles.infoText}><Icon name="play" style={styles.infoText}/> {Moment(e.startDate).format('DD.MM.YYYY HH:mm')}</Text>
                            <Text style={styles.infoText}><Icon name="pin" style={styles.infoText}/> {e.area}</Text>
                            <Text style={styles.infoText}><Icon name="time" style={styles.infoText}/> {e.duration} min</Text>
                            {this.difficultyToSymbol(e.difficulty)}
                        </Body>
                        <Right>
                            <Icon name="ios-arrow-forward" style={styles.cardArrow}/>
                        </Right>
                    </CardItem>
                </Card>
            );
            return (
                <Container>
                    <Content padder>
                        <Text style={{marginLeft : 8}}>Dauerhafte Quests</Text>
                        {fixedQuests}
                        <Text style={{marginLeft : 8}}>Event-Quests</Text>
                        {eventQuests}
                        <Text style={{marginLeft : 5}}></Text>
                    </Content>
                </Container>
            );
        }
    }

    difficultyToSymbol(difficulty) {
        if(difficulty == 'EASY') {
            return <Text><Icon name="school" style={styles.difficultyIcon}/>
                 <Icon name="school" style={[styles.difficultyIcon, {color: 'lightgrey'}]}/>
                 <Icon name="school" style={[styles.difficultyIcon, {fontSize: 18, color: 'lightgrey'}]}/></Text>;
        } else if(difficulty == 'MEDIUM') {
            return <Text><Icon name="school" style={styles.difficultyIcon}/>
                 <Icon name="school" style={styles.difficultyIcon}/>
                 <Icon name="school" style={[styles.difficultyIcon, {color: 'lightgrey'}]}/></Text>;
        } else {
            return <Text><Icon name="school" style={styles.difficultyIcon}/>
                 <Icon name="school" style={styles.difficultyIcon} />
                 <Icon name="school" style={styles.difficultyIcon}/></Text>;
        }
    }

    fetchFixedQuests() {
        const url = `http://192.168.178.67:8080/api/activeFixedQuests`;
        this.setState({loading: true});
        fetch(url, {
            headers: {}
        })
            .then(Utils.checkStatus)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    fixedQuests: res,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({loading: false});
                console.error(error);
                Alert.alert(
                    'Error',
                    'Oh no! An error occured. Sorry for that!'
                );
            });
    };

    fetchEventQuests() {
        const url = `http://192.168.178.67:8080/api/openedEventQuests`;
        this.setState({loading: true});
        fetch(url, {
            headers: {}
        })
            .then(Utils.checkStatus)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    eventQuests: res,
                    loading: false,
                    refreshing: false
                });
            })
            .catch(error => {
                this.setState({loading: false});
                console.error(error);
                Alert.alert(
                    'Error',
                    'Oh no! An error occured. Sorry for that!'
                );
            });
    };
}

const styles = StyleSheet.create({
    cardItem: {
        marginLeft: 0,
        paddingLeft: 0,
        marginTop: 0,
        paddingTop: 0,
        marginBottom: 0,
        paddingBottom: 0
    },
    thumbnail: {
        width: 125,
        height: 125,
        borderBottomLeftRadius: 10,
        borderTopLeftRadius: 10
    },
    cardArrow: {
        fontSize: 30
    },
    infoText: {
        fontSize: 14
    },
    difficultyIcon: {
        fontSize: 18
    }
});
