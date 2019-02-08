import React, { Component } from "react";
import {ImageBackground,StatusBar,BackHandler,ScrollView, Image, TextInput, View, StyleSheet, Animated} from 'react-native';
import {
    Left, Right, Header, Title, Body, Button, H3, Text, Item, Input, Toast} from "native-base";
import Container from "./Container";
import axios from 'axios';
import { Alert,AsyncStorage,Dimensions,ActivityIndicator,NetInfo,Linking } from "react-native";
import VersionNumber from 'react-native-version-number';
import { PermissionsAndroid } from 'react-native';

const launchscreenBg = require("../../../assets/launchscreen-bg.png");
const launchscreenLogo = require("../../../assets/logo-kitchen-sink.png");
const imageHeight = Math.round(Dimensions.width * 9 / 16);
const imageWidth = Dimensions.width;


class Home extends Component {
    // async componentDidMount() {
    //     await request_READ_PHONE_STATE() ;
    // }
trypermission(){
    try {
        const granted = PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
            {
                'title': 'Required Read State Permission',
                'message': 'Runner App Required Read State permission for device verification'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log("You can use the camera")
        } else {
            //this.askagain();
            console.log("Camera permission denied")
        }
    } catch (err) {
        console.log(err);
    }
}
askagain(){
    //alert("asking again");
    const granted = PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
        {
            'title': 'Required Read State Permission',
            'message': 'Runner App Required Read State permission for device verification'
        }
    )
}

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            if(connectionInfo.type=='none'){
                alert("Please check your internet connection before process");
            }else {
                this.trypermission();
                this.checkVersion();
            }
        });

        this.state = {
            myNumber: '',
            isDisabled: true,
            isLoading: false,
            modalVisible: false,
        };

    };
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        AsyncStorage.getItem('token', (err, result) => {
            console.log(result);
            if(result!=null){
                this.props.navigation.navigate('NHTab');
            }
        });
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        if(this.props.navigation.state.routeName=="Home"){
            BackHandler.exitApp();
            return true;
        }
    }

    loginSubmit = event => {
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE).then(response => {
            // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'

           if(!response){
               this.trypermission();
           }else {
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
                       BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
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
           }
        })

    };
    checkVersion(){
        console.log(VersionNumber.appVersion);
        fetch(global.url+'/api/auth/config.json', {
            method: 'get'
        }).then(res => {
            res.json().then(function(data) {
                console.log(data);
                if(data.code==200 && data.success){
                    console.log(data.list[1].value);
                    console.log(VersionNumber.appVersion);
                    if(data.list[1].value==VersionNumber.appVersion){
                        console.log("things matched");
                    }else{
                        console.log("install new app");
                        Alert.alert(
                            'New Version is Available on Store',
                            'Please Install New Version to Access',
                            [
                                {text: 'Update Now', onPress: () => Linking.openURL("market://details?id=com.moglix.runner")},
                            ],
                            { cancelable: false }
                        )
                        //this.toggleModal(true);
                    }
                }else{
                    Toast.show({
                        text: "Check your Internet",
                        buttonText: "Okay",
                        position: "top",
                        type: "warning",
                        duration: 2000
                    });
                }
            })
        }).catch(err => {
            err.json().then(function(data) {
                console.log(data);
                //alert(data.message);
            })
        });
    }
    checkmyLogin1= event => {
        console.log("in check my login1");

    };
    // _checkmyLogin(){
    //     console.log("in check my login ");
    //     AsyncStorage.getItem('token', (err, result) => {
    //         console.log("async token");
    //         console.log(result);
    //         if(result){
    //             this.props.navigation.navigate('NHTab');
    //         }
    //     });
    // };
    toggleModal(visible) {
        this.setState({ modalVisible: visible });
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
                <Text style={{textAlign: 'center' , marginBottom: 20, fontSize: 20}}> {this.state.device_IMEI} </Text>
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
    },
    modalContent: {
        height: 100,
        backgroundColor: "white",
        padding: 22,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 4,
        borderColor: "rgba(0, 0, 0, 0.1)"
    },
    modal: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: '#3f2949',
        marginTop: 10
    }
});
export default Home;
