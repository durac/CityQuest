/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, {Component} from "react";
import { Alert, InteractionManager } from "react-native";
import { Container, Content, Spinner } from "native-base";
import Camera from "react-native-camera";
import { withNavigationFocus } from "react-navigation-is-focused-hoc";
import CityQuestHeader from "../CityQuestHeader";
import { connect } from 'react-redux';
import { errorMessage } from "../../utils/Utils";
import { loadNextRiddle } from "../../actions/questStationActions";
import { getErrorMessage, getIsFetching} from "../../reducers/questStation";

class QRScannerScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dimensions: undefined,
            ready: false,
            questId: undefined
        };
    }

    componentWillReceiveProps(nextProps) {
        if (!this.props.error && nextProps.error) {
            errorMessage(nextProps.error, 'danger', 'Okay');
        }
        /*if (this.props.isFetching && !nextProps.isFetching && !nextProps.error) {
            this.props.navigation.navigate('QuestStation', {questId: this.state.questId});
        }*/
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
        if (this.state.dimensions) {
            var { dimensions } = this.state;
            var { width, height } = dimensions
        }
        if (this.props.isFetching) {
            return (
                <Container>
                    <CityQuestHeader title='Scan QR-Code'/>
                    <Content onLayout={this.onLayout} style={{backgroundColor: 'black'}}>
                        <Spinner color='#634405'/>
                    </Content>
                </Container>
            )
        }
        return (
            <Container>
                <CityQuestHeader title='Scan QR-Code'/>
                <Content onLayout={this.onLayout} style={{backgroundColor: 'black'}}>
                    {
                        this.state.dimensions && this.props.isFocused && this.state.ready ?
                            <Camera
                                ref={(cam) => {
                                        this.camera = cam;
                                    }}
                                style={{height}}
                                aspect={Camera.constants.Aspect.full}
                                onBarCodeRead={(data)=>{this.onQrCodeRead(data.data)}}
                                barCodeTypes={[Camera.constants.BarCodeType.qr]}/>
                            : undefined
                    }
                </Content>
            </Container>
        );
    }

    onLayout = event => {
        if (this.state.dimensions) return; // layout was already called
        let {width, height} = event.nativeEvent.layout;
        this.setState({
            dimensions: {width, height}
        });
    }
}

const mapStateToProps = (state) => {
    return {
        isFetching: getIsFetching(state),
        error: getErrorMessage(state),
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

export default withNavigationFocus(QRScannerScreen, 'QRScanner')

