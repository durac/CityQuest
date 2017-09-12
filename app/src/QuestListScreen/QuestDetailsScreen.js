/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, {Component} from "react";
import Auth0 from 'react-native-auth0';
import { Alert, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { StyleProvider, Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, H1} from 'native-base';

var credentials = require('../utils/auth0-credentials');
const auth0 = new Auth0(credentials);

export default class QuestDetailsScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: (
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                <Title>Quest Details</Title>
                </Body>
                <Right>
                    <Button transparent>
                        <Icon name="more"/>
                    </Button>
                </Right>
            </Header>
        )
    });

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        //Do something here like hide splash screen
    }

    render() {
        let quest = [];
        if (this.props.navigation.state.params.eventQuest == undefined) {
            quest = this.props.navigation.state.params.fixedQuest;
        } else {
            quest = this.props.navigation.state.params.eventQuest;
        }
        return (
            <Container>
                <Content padder>
                    <H1>{quest.name}</H1>
                </Content>
            </Container>
        );
    }
}
