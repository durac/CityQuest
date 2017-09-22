/**
 * Created by Dominik Schwarz on 22.09.2017.
 */
import React from "react";
import {Container, Content, Text} from "native-base";
import s from "../style/Style";

const LoginPlaceholder = () => (
    <Container>
        <Content>
                <Text style={[{paddingTop: 100}, s.placeholderText]}>Bitte logge dich zum</Text>
                <Text style={s.placeholderText}>Abrufen deiner Quests ein.</Text>
        </Content>
    </Container>
);

export default LoginPlaceholder;
