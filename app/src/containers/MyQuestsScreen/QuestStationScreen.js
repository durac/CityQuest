/**
 * Created by Dominik Schwarz on 25.09.2017.
 */
import React, {Component} from "react";
import { View } from "react-native";
import { Container, Spinner, Content, Button, Text, H1, H2, Form, Item, Input } from "native-base";
import CityQuestHeader from "../CityQuestHeader";
import { submitAnswer} from "../../actions/questStationActions.js";
import { connect } from "react-redux";
import { errorMessage } from "../../utils/Utils";
import { getCurrentQuestStation, getCurrentRiddle, getErrorMessage, getIsFetching} from "../../reducers/questStation";

class QuestStationScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        header: <CityQuestHeader title='Quest Station'/>
    });

    constructor(props) {
        super(props);
        this.state = {
            answer : ''
        }
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.error && nextProps.error) {
            errorMessage(nextProps.error, 'danger', 'Okay');
        }
    }
    
    handleSubmit() {
        const { submitAnswer, questId } = this.props;
        submitAnswer(questId, this.state.answer);
    }

    render() {
        const { questStation, riddle, isFetching } = this.props;
        if (isFetching) {
            return (
                <Container>
                    <Content>
                        <Spinner color='#634405'/>
                    </Content>
                </Container>
            )
        }
        if(!riddle) {
            return (
                <Container>
                    <Content style={{padding: 20}}>
                        <H2>Gut gemacht! Auf zum nächsten Rätsel.</H2>
                    </Content>
                </Container>
            )
        }
        return (
            <Container>
                <Content style={{padding: 20}}>
                    <H1>{riddle.name}</H1>
                    <Text style={{marginTop: 20}}>{riddle.description}</Text>
                    <Form>
                        <Item rounded last style={{marginTop: 50, borderRadius: 10}}>
                            <Input value={this.state.answer} onChangeText={(answer) => this.setState({ answer: answer })}/>
                        </Item>
                        <Button bordered block style={{marginTop: 20, borderRadius: 10}} onPress={() => this.handleSubmit()}><Text>Überprüfen!</Text></Button>
                        <View style={{marginTop : 20}} />
                    </Form>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        isFetching: getIsFetching(state),
        questId: ownProps.navigation.state.params.questId,
        questStation: getCurrentQuestStation(state),
        riddle: getCurrentRiddle(state),
        error: getErrorMessage(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitAnswer: (questId, answer) => {
            dispatch(submitAnswer(questId, answer))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestStationScreen);
