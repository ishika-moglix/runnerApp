import React, { Component } from "react";
import {ImageBackground, StatusBar,ScrollView, Image, TextInput, View, StyleSheet, Animated} from 'react-native';
import { Left,
    Right,Header,Title, Container,
    Body,Button, H3, Text,Item,
    Input,Icon } from "native-base";
import axios from "axios/index";
import { AsyncStorage } from "react-native"
//import BasicTab from "../tab/basicTab";
//import Container from "./Container";
//import styles from "./styles";

const launchscreenBg = require("../../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../../assets/logo-kitchen-sink.png");

class Verify extends Component {
    constructor(props) {
        super(props);
        const {state} = props.navigation;
        console.log("PROPS " + state.params.userId);
        this.state = {
            myNumber: '',
            isDisabled: true,
            userId:state.params.userId
        }
    };
    verifyOtp= event => {
        const user = {
            "id":this.state.userId,
            "otp": this.state.myNumber
        };
        const headers = {
            'Content-Type': 'application/json',
        };
        axios.post(`http://emsqa.moglilabs.com/api/auth/verifyOtp.json`, user,headers)
            .then(res => {
                console.log(JSON.stringify(res));
                //console.log(res.data.data.id);
                if(res.data.success && res.data.code==200){
                    console.log(res.data.data.token);
                    AsyncStorage.setItem('token', res.data.data.token, () => {
                        AsyncStorage.getItem('token', (err, result) => {
                            console.log("storage token get");
                            console.log(result);
                        });
                    });
                   // AsyncStorage.setItem('token', res.data.data.token);
                    this.props.navigation.navigate('NHTab');
                }else{
                    alert(res.data.message);
                }
            })

    };
    onChanged(text){
        let newText = '';
        let numbers = '0123456789';
        var i ;
        for (i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                alert("please enter numbers only");
            }
        };
        //alert(newText.length);
        if(newText.length==6){
            this.state.isDisabled=false;
        }else{
            this.state.isDisabled=true;
        }
        this.setState({ myNumber: newText });
    };
    render() {
        return (
            <Container style={[ styles.container, this.props.style || {} ]}>
                { this.renderHeader() }
                { this.renderImage() }
                { this.renderForm() }
                { this.renderFooter() }
            </Container>
        );
    }

    renderHeader() {
        return (
            <View >
                <Header style={{ backgroundColor : '#da4439'}}>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Verification</Title>
                    </Body>
                    <Right />
                </Header>
            </View>
        );
    }

    renderImage(){
        return (
            <View style={styles.loginImageSection}>
                <Image style={styles.loginImage}
                       source={require('../../../assets/moglixRunner.png')}
                       style={styles.images}
                />
            </View>
        );
    }
    renderForm() {
        return (
            <ScrollView style={{padding: 20}}>
                <Text
                    style={{fontSize: 15}}>
                    Enter OTP sent to {"\n"} Your Mobile number
                </Text>
                <Item>
                    <Input type="number" value={this.state.myNumber} onChangeText={(text)=> this.onChanged(text)} keyboardType='numeric' placeholder='- - - - - -' maxLength={6}/>
                </Item>
                <View style={{margin:12}} />
                <Button full success
                        disabled={this.state.isDisabled}
                        style={{marginTop: 15, alignSelf: "center" }}
                        onPress={() => this.verifyOtp()}
                >
                    <Text>Verify</Text>
                </Button>
            </ScrollView>
        );
    }
    renderFooter(){
        return (
            <View>
                <Text style={styles.footerStyle}>
                    By, continuing you agree to  {"\n"}our <Text style={{color: 'red'}}> Privacy Policy </Text> and <Text style={{color: 'red'}}> Terms and Condition </Text>
                </Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowOffset: { height: -5, width:-5},
        shadowRadius: 10,
    },
    loginImageSection: {
        alignSelf: "center",
        height: 100,
        marginTop: 15,
    },
    loginImage:{
        width: 150, height: 150
    },
    footerStyle: {
        margin: 10,
        marginLeft:15,
        fontSize: 15
    },
    image: {
        width: '100%',
        height: '50%',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

export default Verify;



