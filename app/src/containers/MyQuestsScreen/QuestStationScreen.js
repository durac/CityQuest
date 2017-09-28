/**
 * Created by Dominik Schwarz on 25.09.2017.
 */
import React, {Component} from "react";
import { View } from "react-native";
import { Container, Spinner, Content, Button, Text, H1, H2, Form, Item, Input, Icon} from "native-base";
import CityQuestHeader from "../CityQuestHeader";
import { submitAnswer} from "../../actions/questStationActions.js";
import { connect } from "react-redux";
import { errorMessage } from "../../utils/Utils";
import { getCurrentQuestStation, getCurrentRiddle, getErrorMessage, getIsFetching} from "../../reducers/questStation";
import MapView from "react-native-maps";
import s from "../../style/Style";

class QuestStationScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        header: null
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

        this.setState({riddleName: this.props.riddle.name});
        submitAnswer(questId, this.state.answer);
    }

    render() {
        const { questStation, riddle, isFetching, navigation } = this.props;
        if (isFetching) {
            return (
                <Container>
                    <CityQuestHeader title='' includeBackIcon={true} navigation={navigation}/>
                    <View style={s.contentView}><Spinner/></View>
                </Container>
            );
        }
        if(questStation && !riddle) {
            return (
                <Container>
                    <CityQuestHeader title={questStation.name} includeBackIcon={true} navigation={navigation}/>
                    <View style={s.contentView} >
                        {
                            questStation.finished ?
                                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                                    <Icon name="trophy" style={{fontSize: 100}}/>
                                    <H1 style={{padding: 20}}>Gratuliere!</H1>
                                    <H2 style={{paddingLeft: 20}}>Du hast alle Rätsel gelöst!</H2>
                                </View>
                            : <View style={{flex: 1}}>
                                <H2 style={{flex: 1, padding: 20}}>Richtig!</H2>
                                <Text style={{flex: 1, paddingLeft: 20, marginTop: -10}}>Das nächste Rätsel findest du hier:</Text>
                                <MapView
                                    style={{flex: 10}}
                                    initialRegion={{
                                        latitude: questStation.latitude,
                                        longitude: questStation.longitude,
                                        latitudeDelta: 0.002,
                                        longitudeDelta: 0.002
                                    }}
                                    >
                                    <MapView.Marker
                                        coordinate={{
                                            latitude: questStation.latitude,
                                            longitude: questStation.longitude
                                        }}
                                        description='Nachstes Rätsel'
                                        image={require('../../../assets/pin.png')}
                                    />
                                </MapView>
                            </View>
                        }
                    </View>
                </Container>
            )
        }
        return (
            <Container>
                <CityQuestHeader title={questStation.name} includeBackIcon={true} navigation={navigation}/>
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
