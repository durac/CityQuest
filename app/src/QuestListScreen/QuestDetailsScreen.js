/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, {Component} from "react";
import {Alert, Image, AsyncStorage} from "react-native";
import {StackNavigator} from "react-navigation";
import {Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, H1} from "native-base";
import { MenuContext } from 'react-native-popup-menu';
import {CityQuestHeader} from "../components/CityQuestHeader";

export default class QuestDetailsScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        header: (
            <CityQuestHeader title='Quest-Liste' includeBackIcon={true} navigation={navigation}/>
        )
    });

    constructor(props) {
        super(props);
    }

    componentDidMount() {
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
