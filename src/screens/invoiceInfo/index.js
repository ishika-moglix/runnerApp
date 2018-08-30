import React, { Component } from "react";
import {
  Container,Fab,
    IconNB, Header, Title, Content, Text, Button, Icon, Footer, FooterTab, Left, Right, Body
} from "native-base";
//import Pdf from 'react-native-pdf';
//import styles from "./styles";
//import styles from "../form/styles";
import {ImageBackground, StatusBar,ScrollView, Image, TextInput,  Dimensions, View, StyleSheet, Animated} from 'react-native';
import Pdf from 'react-native-pdf';
import { AsyncStorage } from "react-native";
import axios from "axios/index";
var ImagePicker = require('react-native-image-picker');
var options = {
    title: 'Upload POD',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};

class Invoiceinfo extends Component {
    constructor(props) {
        super(props);
        const {state} = props.navigation;
        this.state = {
            myItems:state.params.invoice,
            active: false
        };
        console.log("PROPS " + state.params.invoice);

    };
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
    render() {
        return (
            <Container style={[ styles.container, this.props.style || {} ]}>
                { this.renderHeader() }
                { this.renderPdf() }
                { this.renderFooter() }
                <Image source={this.state.avatarSource} style={styles.uploadAvatar} />
            </Container>
        );
    }
    renderPdf() {
      if(this.state.myItems){
      const source = {uri:'http://'+this.state.myItems,cache:true};
      //const source = require('./test.pdf');  // ios only
      //const source = {uri:'bundle-assets://test.pdf'};

      //const source = {uri:'file:///sdcard/test.pdf'};
      //const source = {uri:"data:application/pdf;base64,..."};

      return (
          <View style={styles.container2}>
              <Pdf
                  source={source}
                  onLoadComplete={(numberOfPages,filePath)=>{
                      console.log(`number of pages: ${numberOfPages}`);
                  }}
                  onPageChanged={(page,numberOfPages)=>{
                      console.log(`current page: ${page}`);
                  }}
                  onError={(error)=>{
                      console.log(error);
                  }}
                  style={styles.pdf}/>
              <Image source={this.state.avatarSource} style={styles.uploadAvatar} />
          </View>
      )
      }
      else{
          return (
              <Text>Getting info</Text>
          )
      }
  }
    renderFooter(){
        return (
            <View>
                <Button full primary
                        style={styles.footerStyle}
                        onPress={() => this.openPicker()}
                >
                    <Text style={{color: 'red'}}> Approve </Text>
                </Button>
            </View>
        );
    }
    openPicker(){
        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info below in README)
         */
        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
               // let source = { uri: response.uri };
                console.log(response.uri);
                console.log(response);
               // You can also display the image using data:
                //let source = { uri: 'data:image/jpeg;base64,' + response.data };
                let source = 'data:image/jpeg;base64,' + response.data;
                this.setState({
                    avatarSource: source
                });
                this.forceUpdate();
                this.storePicture(source);
                //this.uploadImage();
            }
        });
    }
    uploadImage = event => {
        const user = {
            "phoneNumber": this.state.myNumber
        };
        const headers = {
            'Content-Type': 'application/json',
        };
        AsyncStorage.getItem('token', (err, result) => {
            console.log("storage token in pickup details");
            console.log(result);
            this.state.myToken=result;

            const user = {
                "packetId":58984,
                "fileToUpload":'https://www.google.co.in/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
                "podDate":'2018-08-22'
            };
            const AuthStr = 'Bearer '.concat('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM0OCwiZXhwIjoxNTQwMTE2MzAyfQ.m333KIr9e01mCzSYaUJ9A5jlFeFUCqSBjlZJOfjiU9I');
            axios.post(`http://emsqa.moglilabs.com/api/runner/markDeliveredPod.json`, user,{ headers: { 'Authorization': AuthStr } })
                .then(res => {
                    console.log(JSON.stringify(res));
                    //console.log(res.data.data.id);
                    if(res.data.success && res.data.code==200){
                        console.log("my po items are here");
                        console.log(res.data.data.poItems);
                        //this.setState({ myItems: res.data.data.poItems });
                        this.state.myItems=res.data.data.poItems;
                        this.forceUpdate();
                    }else{
                        alert(res.data.message);
                    }
                });
            console.log(this.state.myItems);
        });
    };
    storePicture(PicturePath) {
        console.log(PicturePath);
        if (PicturePath) {
            // Create the form data object
            let formdata = new FormData();
            global.FormData =global.originalFormData;
            formdata.append('fileToUpload', PicturePath);
            formdata.append('packetId', '58984')
            formdata.append('podDate', '2018-08-22')
            // data.append('picture', {
            //     "fileToUpload": PicturePath,
            //     name: 'selfie.jpg',
            //     type: 'image/jpg',
            //     "packetId":58984,
            //     "podDate":'2018-08-22'
            // });

            // Create the config object for the POST
            // You typically have an OAuth2 token that you use for authentication
            const AuthStr = 'Bearer '.concat('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM0OCwiZXhwIjoxNTQwMTE2MzAyfQ.m333KIr9e01mCzSYaUJ9A5jlFeFUCqSBjlZJOfjiU9I');
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM0OCwiZXhwIjoxNTQwMTE2MzAyfQ.m333KIr9e01mCzSYaUJ9A5jlFeFUCqSBjlZJOfjiU9I'
                },
                body: formdata
            };
            axios.post(`http://emsqa.moglilabs.com/api/runner/markDeliveredPod.json`, config,{ headers: { 'Authorization': AuthStr }})
                .then(res => {
                    console.log(JSON.stringify(res));
                });
            fetch('http://emsqa.moglilabs.com/api/runner/markDeliveredPod.json', config)
                .then(responseData => {
                    // Log the response form the server
                    // Here we get what we sent to Postman back
                    console.log(responseData);
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }
}

const styles = StyleSheet.create({
    container: {
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowOffset: { height: -5, width:-5},
        shadowRadius: 10,
    },
    container2:{
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
    },
    footerStyle: {
        margin: 10,
        marginLeft:15,
        fontSize: 15
    }
});

export default Invoiceinfo;
