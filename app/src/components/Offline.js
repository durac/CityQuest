/**
 * Created by Dominik Schwarz on 20.09.2017.
 */
import React from "react";
import {Container, Header, Body, Title, Content, Icon, Text} from "native-base";
import s from "../style/Style";

const Offline = () => (
    <Container>
        <Header>
            <Body>
                <Title>CityQuest</Title>
            </Body>
        </Header>
        <Content>
            <Icon name="thunderstorm" style={[s.placeholderText, {fontSize: 100, paddingTop: 60}]} />
            <Text style={[s.placeholderText, {fontSize: 25}]}>Offline</Text>
            <Text style={[{paddingTop: 50}, s.placeholderText]}>Für die Nutzung dieser App wird eine</Text>
            <Text style={s.placeholderText}>Internetverbindung benötigt.</Text>
        </Content>
    </Container>
);

export default Offline;
