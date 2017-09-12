/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, {Component} from "react";
import {Alert, Image, AsyncStorage} from "react-native";
import {StackNavigator} from "react-navigation";
import {StyleProvider, Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, H1} from "native-base";
import {login} from "../utils/Utils";

export default class QuestDetailsScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        header: (
            <Header>
                <Left>
                    <Button transparent onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back"/>
                    </Button>
                </Left>
                <Body>
                <Title>Quest Details</Title>
                </Body>
                <Right>
                    <Button transparent onPress={login}>
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
        AsyncStorage.getItem('userinfo', (err, result) => {
            Alert.alert(result);
        });
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
