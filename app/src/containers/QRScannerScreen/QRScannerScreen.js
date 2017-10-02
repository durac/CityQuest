/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, {Component} from "react";
import { InteractionManager, View } from "react-native";
import { Container, Content, Header, Spinner } from "native-base";
import Camera from "react-native-camera";
import { withNavigationFocus } from "react-navigation-is-focused-hoc";
import CityQuestHeader from "../../components/CQHeader";
import { connect } from 'react-redux';
import { errorMessage, resetNavigation } from "../../utils/Utils";
import { loadNextRiddle } from "../../actions/questStationActions";
import { getCurrentQuestStation, getErrorMessage, getIsFetching } from "../../reducers/questStation";

class QRScannerScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            ready: false,
            questId: undefined
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.error && nextProps.error) {
            errorMessage(nextProps.error, 'danger', 'Okay');
            this.setState({questId: undefined});
        }
        if (this.state.questId && nextProps.questStation && nextProps.questStation.riddle) {
            resetNavigation(this.props.navigation, 'QLQuestStation', 'QuestList', this.state.questId);
            this.setState({questId: undefined});
        }
    }

    onQrCodeRead(data) {
        if(!this.props.isLoggedIn) {
            errorMessage("Bitte logge dich ein!", '', 'Okay');
            return;
        }
        const questId1 = data.lastIndexOf("questId=");
        const questId2 = data.lastIndexOf("&");
        const code1 = data.lastIndexOf("code=");
        if(questId1 > 0 && questId2 > 0 && code1 > 0) {
            const questId = data.slice(questId1+8,questId2);
            const code = data.slice(code1+5);
            if(questId && code) {
                this.setState({questId: questId});
                this.props.submitQRCode(questId,code);
            }
        } else {
            errorMessage("Wrong QR Code!", 'danger', 'Okay');
        }
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => this.setState({ready: true}));
    }

    render() {
        return (
            <Container>
                <CityQuestHeader title='Scan QR-Code'/>
                <View style={{flex: 1, backgroundColor: 'black'}}>
                    {
                        !this.props.isFetching && this.props.isFocused && this.state.ready ?
                            <Camera
                                ref={(cam) => {
                                        this.camera = cam;
                                    }}
                                style={{flex: 1}}
                                aspect={Camera.constants.Aspect.full}
                                onBarCodeRead={(data)=>{this.onQrCodeRead(data.data)}}
                                barCodeTypes={[Camera.constants.BarCodeType.qr]}/>
                            : undefined
                    }
                </View>
            </Container>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: getIsFetching(state),
        error: getErrorMessage(state),
        questStation: getCurrentQuestStation(state),
        isLoggedIn: state.auth.isLoggedIn
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        submitQRCode: (questId, code) => {
            dispatch(loadNextRiddle(questId, code))
        }
    }
};

QRScannerScreen = connect(mapStateToProps,mapDispatchToProps)(QRScannerScreen);

export default withNavigationFocus(QRScannerScreen, 'QRScannerBottom', false)

