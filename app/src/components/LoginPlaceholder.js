/**
 * Created by Dominik Schwarz on 22.09.2017.
 */
import React from "react";
import { View } from "react-native";
import {Container, Text, Icon} from "native-base";
import s from "../style/Style";

const LoginPlaceholder = () => (
        <View style={s.placeholderView}>
            <Icon name="log-in" style={[s.placeholderText, {fontSize: 100}]} />
            <Text style={[{paddingTop: 20}, s.placeholderText]}>Bitte logge dich ein,</Text>
            <Text style={s.placeholderText}>um diesen Screen zu sehen.</Text>
        </View>
);

export default LoginPlaceholder;
