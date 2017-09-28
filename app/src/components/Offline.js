/**
 * Created by Dominik Schwarz on 20.09.2017.
 */
import React from "react";
import { View } from "react-native";
import {Container, Header, Body, Title, Content, Icon, Text, Footer, FooterTab, Button} from "native-base";
import s from "../style/Style";

const Offline = () => (
    <Container>
        <Header>
            <Body>
                <Title>CityQuest</Title>
            </Body>
        </Header>
        <View style={s.placeholderView}>
            <Icon name="rainy" style={[s.placeholderText, {fontSize: 100, marginTop: -30}]} />
            <Text style={[s.placeholderText, {fontSize: 25}]}>Offline</Text>
            <Text style={[{paddingTop: 20}, s.placeholderText]}>Für die Nutzung dieser App wird eine</Text>
            <Text style={s.placeholderText}>Internetverbindung benötigt.</Text>
        </View>
        <Footer>
            <FooterTab>
                <Button vertical active>
                    <Icon name="list" />
                    <Text uppercase={false}>Quests</Text>
                </Button>
                <Button vertical>
                    <Icon name="bulb" />
                    <Text uppercase={false}>MyQuests</Text>
                </Button>
                <Button vertical>
                    <Icon name="qr-scanner" />
                    <Text uppercase={false}>QR</Text>
                </Button>
                <Button vertical>
                    <Icon name="person" />
                    <Text uppercase={false}>Profil</Text>
                </Button>
            </FooterTab>
        </Footer>
    </Container>
);

export default Offline;
