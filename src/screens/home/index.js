import React, { Component } from "react";
import {ImageBackground, StatusBar,ScrollView, Image, TextInput, View, StyleSheet, Animated} from 'react-native';
import {
    Left,
    Right, Header, Title,
    Body, Button, H3, Text, Item,
    Input, Toast
} from "native-base";
import Container from "./Container";
import axios from 'axios';
import { Alert,AsyncStorage,Dimensions,ActivityIndicator,NetInfo } from "react-native";

//import styles from "./styles";

const launchscreenBg = require("../../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../../assets/logo-kitchen-sink.png");
const imageHeight = Math.round(Dimensions.width * 9 / 16);
const imageWidth = Dimensions.width;


class Home extends Component {
    constructor(props) {
        super(props);
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            console.log(connectionInfo.type);
            if(connectionInfo.type=='none'){
                alert("Please check your internet connection before process");
            }
        });
        this.state = {
            myNumber: '',
            isDisabled: true,
            isLoading: false,
        };
        this.checkLogin();
    };
    loginSubmit = event => {
        this.setState({ isLoading: true});
        const user = {
            "phoneNumber": this.state.myNumber
        };
        const headers = {
            'Content-Type': 'application/json',
        };
        axios.post(global.url+`/api/auth/login.json`, user,headers)
            .then(res => {
                this.setState({ isLoading: false });
                console.log(JSON.stringify(res));
                if(res.data.success && res.data.code==200){
                    Toast.show({
                        text: res.data.message,
                        buttonText: "Okay",
                        position: "top",
                        type: "success",
                        duration: 3000
                    });
                    this.props.navigation.navigate("Verify", { userId: res.data.data.id, userNo: this.state.myNumber});
                }else{
                    Toast.show({
                        text: res.data.message,
                        buttonText: "Okay",
                        position: "top",
                        type: "danger",
                        duration: 3000
                    });

                }
            })
    };
    checkLogin(){
        AsyncStorage.getItem('token', (err, result) => {
            console.log("async token");
            console.log(result);
            if(result){
                this.props.navigation.navigate('NHTab');
            }
        });
    }
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
                Toast.show({
                    text: "only number required !",
                    buttonText: "Okay",
                    position: "top",
                    type: "warning",
                    duration: 2000
                });
            }
        };
        //alert(newText.length);
        if(newText.length==10){
            this.state.isDisabled=false;
        }else{
            this.state.isDisabled=true;
        }
        this.setState({ myNumber: newText });
    };
    render() {
        const { isLoading} = this.state;
        <script src="http://localhost:8097"></script>
        return (
            <Container style={[ styles.container, this.props.style || {} ]}>
                { this.renderHeader() }
                { this.renderImage() }
                { this.renderForm() }
                {isLoading && (
                    <ActivityIndicator
                        animating={true}
                        style={styles.indicator}
                        size="large"
                    />
                )}

            </Container>
        );
    }

    renderHeader() {
        return (
            <View>
                <Header style={{ backgroundColor : '#da4439'}}>
                    <Left />
                    <Body>
                    <Title>Runner Login</Title>
                    </Body>
                    <Right />
                </Header>
            </View>
        );
    }

    renderImage(){
        return (
            <View style={styles.loginImageSection}>
                <Image style ={{width:120,height:100}}
                    source={require('../../../assets/moglixRunner.png')} resizeMode="contain"
                />
            </View>
        );
    }
    renderForm() {
        const { isLoading} = this.state;
        return (
            <ScrollView style={{padding: 20}}>
                <Text
                    style={{fontSize: 15}}>
                    Enter Your Mobile number
                </Text>
                <Item style={styles.borderCls}>
                    <Text>+91</Text><Input type="number" value={this.state.myNumber} onChangeText={(text)=> this.onChanged(text)} keyboardType='numeric' placeholder='' maxLength={10} minLength={9} />
                </Item>
                <View style={{margin:12}} />
                <Button full block
                        type="button"
                        disabled={this.state.isDisabled || isLoading}
                    style={{marginTop: 15, alignSelf: "center",flex:1,width:'100%' }}
                    onPress={() => this.loginSubmit()}
                >
                    <Text>Login</Text>
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
    borderCls:{
        borderWidth: 0.5,
        borderColor: '#d6d7da',
    },
    loginImageSection: {
        alignSelf: "center",
        height: 80,
        marginTop:35,
        marginBottom:20,
        textAlign:"center"
    },
    loginImage:{
        width: 60,
        height: 50,

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
export default Home;

