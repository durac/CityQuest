/**
 * Created by Dominik Schwarz on 20.09.2017.
 */
import React from "react";
import {Container, Header, Body, Title, Content, Icon, Text} from "native-base";

const Offline = () => (
    <Container>
        <Header>
            <Body>
                <Title>CityQuest</Title>
            </Body>
        </Header>
        <Content>
            <Icon name="thunderstorm" style={{fontSize: 80, color: 'grey', textAlign: 'center', paddingTop: 60}} />
            <Text style={{fontSize: 20, color: 'grey', textAlign: 'center'}}>Offline</Text>
            <Text style={{paddingTop: 50, fontSize: 15, color: 'grey', textAlign: 'center'}}>Für die Nutzung dieser App wird eine</Text>
            <Text style={{fontSize: 15, color: 'grey', textAlign: 'center'}}>Internetverbindung benötigt.</Text>
        </Content>
    </Container>
);

export default Offline;
