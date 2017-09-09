/**
 * Created by Dominik Schwarz on 08.09.2017.
 */
import React, {Component} from "react";
import { Alert, StyleSheet} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { StyleProvider, Container, Header, Title, Content, Button, Left, Right, Body, Icon, Text } from 'native-base';
import Camera from 'react-native-camera';

export default class QRScannerScreen extends Component {

    state = {
        dimensions: undefined
    };

    onQrCodeRead() {
        alert("hey spotted barcode!");
    }


    componentDidMount() {
        //Do something here like hide splash screen
    }

    render() {
        if (this.state.dimensions) {
            var { dimensions } = this.state
            var { width, height } = dimensions
        }
        return (
                <Container>
                    <Header>
                        <Body>
                        <Title>Scan QR-Code</Title>
                        </Body>
                        <Right>
                            <Button transparent onPress={() => this._onLogin()}>
                                <Icon name="more"/>
                            </Button>
                        </Right>
                    </Header>
                    <Content onLayout={this.onLayout}>
                        {
                            this.state.dimensions ?
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
        if (this.state.dimensions) return // layout was already called
        let {width, height} = event.nativeEvent.layout
        this.setState({dimensions: {width, height}})
    }
}
