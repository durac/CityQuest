/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, {Component} from "react";
import { Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { StyleProvider, Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text, Spinner} from 'native-base';
import getTheme from '../../native-base-theme/components';
import commonColor from '../../native-base-theme/variables/commonColor';

export default class QRScannerScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    
    componentDidMount() {
    }

    render() {
        return (
            <StyleProvider style={getTheme(commonColor)}>
                <Container>
                    <Header>
                        <Body>
                        <Title>Meine Quests</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this._onLogin()}>
                                <Icon name="more" />
                            </Button>
                        </Right>
                    </Header>
                    <Content>
                        <Text>
                            MyQuest
                        </Text>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }
}
