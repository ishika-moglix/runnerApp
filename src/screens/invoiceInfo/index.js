import React, { Component } from "react";
import {
    Container, Fab,
    IconNB, Header, Title, Content, Text, Button, Icon, Footer, FooterTab, Left, Right, Body, Toast
} from "native-base";
//import Pdf from 'react-native-pdf';
//import styles from "./styles";
//import styles from "../form/styles";
import {ImageBackground,BackHandler,ActivityIndicator, StatusBar,ScrollView, Image, TextInput,  Dimensions, View, StyleSheet, Animated} from 'react-native';
import Pdf from 'react-native-pdf';
import { AsyncStorage } from "react-native";
//import {TabTwo} from "../tab/tabTwo";
import axios from "axios/index";
import RNImageToPdf from "react-native-image-to-pdf";
var ImagePicker = require('react-native-image-picker');
var options = {
    title: 'Upload POD',
    quality: 0.4,
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
let mytest;
class Invoiceinfo extends Component {

    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        var today = new Date();
        finaldate=today.getFullYear() +"-"+ parseInt(today.getMonth()+1) + "-" +today.getDate();
        const {state} = props.navigation;
        console.log(state.params);
        this.state = {
            myItems:state.params.invoice.invoiceUrl,
            active: false,
            myarr:[],
            myImgaeBase:'',
            invoiceNo: state.params.invoice.invoiceNumber,
            packetI: state.params.invoice.packetId,
            AuthStr: '',
            isLoading: false,
        };
        console.log("PROPS " + state.params.invoice.invoiceUrl);
        AsyncStorage.getItem('token', (err, result) => {
            if (result) {
                this.state.AuthStr = 'Bearer '.concat(result);
            } else{
                Toast.show({
                    text: "no token Found ! Login Again",
                    buttonText: "Okay",
                    position: "top",
                    type: "danger",
                    duration: 3000
                });
                this.props.navigation.navigate('Home')
            }
        });
    };
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        if(this.props.navigation.state.routeName=="Invoiceinfo"){
            this.props.navigation.goBack(null);
            return false;
        }
    }
    renderHeader() {
        return (
            <View >
                <Header style={{ backgroundColor : '#da4439'}}>
                    <Left>
                        <Button  transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Invoice: {this.state.invoiceNo}</Title>
                    </Body>
                    <Right />
                </Header>
            </View>
        );
    }
    render() {
        const { isLoading} = this.state;
        return (
            <Container style={[ styles.container, this.props.style || {} ]}>
                { this.renderHeader() }
                { this.renderPdf() }
                { this.renderImages() }
                {isLoading && (
                    <ActivityIndicator
                        animating={true}
                        style={styles.indicator}
                        size="large"
                    />
                )}

                { this.renderFooter() }
                {/*<Image source={this.state.avatarSource} style={styles.uploadAvatar} />*/}
            </Container>
        );
    }
    renderImages(){
        return (
            <View>
        {this.state.myarr.map(myresponse => (
            <Image  source={{
                isStatic: true,
                uri: 'data:image/jpeg;base64,'+myresponse,
            }} style={{width: 100, height: 100}} />
        ))}
            </View>
        )
    }
    // mergeImage(){
    //     RNImageToPdf.createPDFbyImages({
    //         imagePaths: this.state.myarr,
    //         name: "PDF_Name"
    //     }).then((pdf) => {
    //         console.log("pdf ", pdf);
    //         alert(pdf);
    //     }).catch((err) => alert(err));
    // }
    renderPdf() {
      if(this.state.myItems){
      const source = {uri:'http://'+this.state.myItems,cache:true};
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
              <Image  source={{
                  isStatic: true,
                  uri: 'data:image/jpeg;base64,'+this.state.myImgaeBase,
              }} style={{width: 100, height: 100}} />
          </View>
      )
      }
      else{
          return (
              <Text>No Pdf to shown</Text>
          )
      }
  }
    renderFooter(){
        const { isLoading} = this.state;
        return (
            <View>
                <Button full primary disabled={ isLoading}
                        style={styles.footerStyle}
                        onPress={() => this.openPicker()}
                        // onPress={() => this.openPicker()}
                >
                    <Text style={{color: 'black'}}> Upload Pod </Text>
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
                console.log(response.path);
                console.log(response);
               // You can also display the image using data:
                //let source = { uri: 'data:image/jpeg;base64,' + response.data };
                let source = 'data:image/jpeg;base64,' + response.data;
                this.state.myImgaeBase= response.data;
                this.forceUpdate();
                this.storePicture(response);
            }
        });
    }
    storePicture(file) {
        console.log(file);
        if (file) {
            this.setState({ isLoading: true });
            const parts = file.path.split('/');
            const data = new FormData();
            data.append('fileToUpload', {
                uri: file.uri,
                type: file.type, // or photo.type
                name: parts[parts.length - 1]
            });
            data.append('packetId',this.state.packetI);
            data.append('podDate',finaldate);
            fetch(global.url+'/api/runner/markDeliveredPod.json', {
                method: 'post',
                headers:{'Authorization':this.state.AuthStr},
                body: data
            }).then(res => {
                this.setState({ isLoading: false });
                res.json().then(function(data) {
                    console.log(data);
                    alert(data.message);
                    if(data.code==200 && data.success){
                        this.props.navigation.navigate('NHDelivery');
                    }
                })
            }).catch(err => {
                this.setState({ isLoading: false });
                console.log("error log is here"+err);
                //alert(JSON.stringify(err));
                Toast.show({
                    text: "Session Expired. Login Again",
                    buttonText: "Okay",
                    position: "top",
                    type: "danger",
                    duration: 2000
                });
                AsyncStorage.clear();
                this.props.navigation.navigate('Home');
                err.json().then(function(data) {
                    console.log(data);
                    alert(data.message);
                })
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
