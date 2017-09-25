/**
 * Created by Dominik Schwarz on 25.09.2017.
 */
import React, {Component} from "react";

class RiddleScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        header: <CityQuestHeader title='Meine Quests'/>
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
            <Text>Riddle Screen</Text>
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
)(RiddleScreen);
