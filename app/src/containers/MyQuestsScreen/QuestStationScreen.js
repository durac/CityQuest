6/**
 * Created by Dominik Schwarz on 26.09.2017.
 */
import React, {Component} from "react";
import { Text } from "native-base";
import CityQuestHeader from "../CityQuestHeader";
import { connect } from "react-redux";

class QuestStationScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        header: <CityQuestHeader title='Quest Station'/>
    });

    constructor(props) {
        super(props);
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {

    }

    onRefresh() {

    }

    fetchData(){

    }

    render() {
        return (
            <Text>QuestStation Screen</Text>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => {
    return {

    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QuestStationScreen);
