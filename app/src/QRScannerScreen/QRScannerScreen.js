/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, {Component} from "react";
import {Alert, InteractionManager} from "react-native";
import {StackNavigator} from "react-navigation";
import {Container, Header, Title, Content, Button, Left, Right, Body, Icon} from "native-base";
import Camera from "react-native-camera";
import { withNavigationFocus } from 'react-navigation-is-focused-hoc'
import { MenuContext } from 'react-native-popup-menu';
import {login} from '../utils/Utils';

class QRScannerScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            dimensions: undefined,
            ready: false
        };
    }

    onQrCodeRead() {
        alert("hey spotted barcode!");
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => this.setState({ready: true}));
    }

    render() {
        if (this.state.dimensions) {
            var {dimensions} = this.state;
            var {width, height} = dimensions
        }
        return (
            <Container>
                <Header>
                    <Body>
                    <Title>Scan QR-Code</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={login}>
                            <Icon name="more"/>
                        </Button>
                    </Right>
                </Header>
                <Content onLayout={this.onLayout} style={{backgroundColor: 'black'}}>
                    {
                        this.state.dimensions && this.props.isFocused && this.state.ready ?
                            <Camera
                                ref={(cam) => {
                                        this.camera = cam;
                                    }}
                                style={{height}}
                                aspect={Camera.constants.Aspect.full}
                                onBarCodeRead={()=>{this.onQrCodeRead()}}
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

export default withNavigationFocus(QRScannerScreen, 'QRScanner')

