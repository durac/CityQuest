/**
 * Created by Dominik Schwarz on 25.09.2017.
 */
import React, {Component} from "react";
import {Container, Spinner, Content, Button, Icon, Text, H1, Form, Item, Input} from "native-base";
import CityQuestHeader from "../CityQuestHeader";
import { loadNextRiddle, submitAnswer} from "../../actions/questStationActions.js";
import { connect } from "react-redux";
import { errorMessage, resetNavigation } from "../../utils/Utils";
import { getCurrentRiddle, getErrorMessage, getIsFetching} from "../../reducers/questStation";

class RiddleScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        header: <CityQuestHeader title='Rätsel'/>
    });

    constructor(props) {
        super(props);
        this.state = {
            answer : ''
        }
    }

    componentWillMount() {
        this.props.nextRiddle(this.props.questId,'code1');
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.error) {
            errorMessage(nextProps.error, 'danger', 'Okay');
        }
    }
    
    handleSubmit() {
        const {submitAnswer, questId, error, navigation } = this.props;
        submitAnswer(questId, this.state.answer);
        resetNavigation('QuestStation', questId, navigation);
    }

    render() {
        const { riddle, isFetching } = this.props;
        if (isFetching || !riddle) {
            return <Spinner color='#634405'/>;
        }
        return (
            <Container>
                <Content style={{padding: 20}}>
                    <H1>{riddle.name}</H1>
                    <Text style={{marginTop: 20}}>{riddle.description}</Text>
                    <Form>
                        <Item rounded last style={{marginTop: 50}}>
                            <Input value={this.state.answer} onChangeText={(answer) => this.setState({ answer: answer })}/>
                        </Item>
                        <Button bordered block style={{marginTop: 50, borderRadius: 10}} onPress={() => this.handleSubmit()}><Text>Überprüfen!</Text></Button>
                    </Form>
                </Content>
            </Container>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        questId: ownProps.navigation.state.params.questId,
        riddle: getCurrentRiddle(state),
        error: getErrorMessage(state),
        isFetching: getIsFetching(state)
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        nextRiddle: (questId, code) => {
            dispatch(loadNextRiddle(questId, code))
        },
        submitAnswer: (questId, answer) => {
            dispatch(submitAnswer(questId, answer))
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RiddleScreen);
