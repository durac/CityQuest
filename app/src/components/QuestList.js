/**
 * Created by Dominik Schwarz on 22.09.2017.
 */
import React from "react";
import { View } from "react-native";
import PropTypes from 'prop-types';
import { Left, Right, Body, Icon, Text, Card, CardItem, Thumbnail, H3 } from "native-base";
import s from "../style/Style";
import Moment from "moment";

const QuestList = ({quests, isEvent, onQuestClick}) => (
    <View>
        {quests.map(quest => (
            <Card key={quest.id}>
                <CardItem button onPress={() => onQuestClick(quest)}
                          style={s.cardItem}>
                    <Left>
                        <Thumbnail square
                                   style={s.thumbnail}
                                   source={{uri: quest.image}}/>
                    </Left>
                    <Body>
                    <H3 style={[s.h3, {marginTop : 10, fontWeight: "bold"}]}>{quest.name}</H3>
                    { isEvent &&
                        <Text style={[s.cardInfoText, {marginTop : 3}]}>
                            <Icon name="play" style={s.cardInfoText}/>
                            {Moment(quest.startDate).format('DD.MM.YYYY - HH:mm')} Uhr
                        </Text>
                    }
                    <Text numberOfLines={1} style={[s.cardInfoText, {marginTop : 8}]}><Icon name="pin"
                                                                                            style={s.cardInfoText}/> {quest.area}
                    </Text>
                    <Text style={s.cardInfoText}><Icon name="time" style={s.cardInfoText}/> ~{quest.duration} min</Text>
                    <Text>
                        <Icon name="school" style={s.difficultyIcon}/>
                        <Icon name="school"
                              style={[s.difficultyIcon, quest.difficulty == 'EASY' ? {color: 'lightgrey'} : undefined]}/>
                        <Icon name="school"
                              style={[s.difficultyIcon, quest.difficulty == 'HARD' ? undefined : {color: 'lightgrey'}]}/>
                    </Text>
                    </Body>
                    <Right>
                        <Icon name="ios-arrow-forward" style={s.cardArrow}/>
                    </Right>
                </CardItem>
            </Card>
        ))}
    </View>
);

QuestList.propTypes = {
    quests: PropTypes.array.isRequired,
    isEvent: PropTypes.bool,
    onQuestClick: PropTypes.func.isRequired
};

export default QuestList;
