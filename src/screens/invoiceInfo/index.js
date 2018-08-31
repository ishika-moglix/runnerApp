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
//import {TabTwo} from "../tab/tabTwo";
import axios from "axios/index";
var ImagePicker = require('react-native-image-picker');
var options = {
    title: 'Upload POD',
    storageOptions: {
        skipBackup: true,
        path: 'images'
    }
};
let mytest;
class Invoiceinfo extends Component {

    constructor(props) {
        super(props);
        const {state} = props.navigation;
        console.log(state.params);
        this.state = {
            myItems:state.params.invoice.invoiceUrl,
            active: false,
            myImgaeBase:'',
            invoiceNo: state.params.invoice.invoiceNumber
        };
        console.log("PROPS " + state.params.invoice.invoiceUrl);
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
                    <Title>Invoice: {this.state.invoiceNo}</Title>
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
                {/*<Image source={this.state.avatarSource} style={styles.uploadAvatar} />*/}
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
              <Image  source={{
                  isStatic: true,
                  uri: 'data:image/jpeg;base64,'+this.state.myImgaeBase,
              }} style={{width: 100, height: 100}} />
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
                    <Text style={{color: 'red'}}> Upload Pod </Text>
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
                this.state.myImgaeBase= response.data
                this.forceUpdate();
                this.storePicture(response);
            }
        });
    }
    // uploadImage = event => {
    //     const user = {
    //         "phoneNumber": this.state.myNumber
    //     };
    //     const headers = {
    //         'Content-Type': 'application/json',
    //     };
    //     AsyncStorage.getItem('token', (err, result) => {
    //         console.log("storage token in pickup details");
    //         console.log(result);
    //         this.state.myToken=result;
    //
    //         const user = {
    //             "packetId":58984,
    //             "fileToUpload":'https://www.google.co.in/images/branding/googlelogo/2x/googlelogo_color_272x92dp.png',
    //             "podDate":'2018-08-22'
    //         };
    //         const AuthStr = 'Bearer '.concat('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM0OCwiZXhwIjoxNTQwMTE2MzAyfQ.m333KIr9e01mCzSYaUJ9A5jlFeFUCqSBjlZJOfjiU9I');
    //         axios.post(`http://emsqa.moglilabs.com/api/runner/markDeliveredPod.json`, user,{ headers: { 'Authorization': AuthStr } })
    //             .then(res => {
    //                 console.log(JSON.stringify(res));
    //                 //console.log(res.data.data.id);
    //                 if(res.data.success && res.data.code==200){
    //                     console.log("my po items are here");
    //                     console.log(res.data.data.poItems);
    //                     //this.setState({ myItems: res.data.data.poItems });
    //                     this.state.myItems=res.data.data.poItems;
    //                     this.forceUpdate();
    //                 }else{
    //                     alert(res.data.message);
    //                 }
    //             });
    //         console.log(this.state.myItems);
    //     });
    // };
    storePicture(file) {
        console.log(file);
        if (file) {
            // Create the form data object
            // let filename = file.uri
            // let fileUrl = (!filename.match(/^file:/) ? 'file://' : '') + filename
            // console.log("fileurl ="+fileUrl);
            // console.log("filename ="+filename);
            // console.log("name= "+fileUrl.split(/[\\/]/).pop());
            // GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest
            // global.FormData = global.originalFormData
//            console.log("type =" + mime.lookup(fileUrl));
            var photo = {
                // uri: 'file://'+file.path,
                uri: file.path,
                type: file.type,
                name: file.fileName,
            };
            console.log(photo);
            // const testbody = new FormData();
            // testbody.append('fileToUpload', photo);
            // console.log(testbody);
            // var xhr = new XMLHttpRequest();
            // xhr.open('POST', `http://emsqa.moglilabs.com/api/runner/uplodaDemoFile.json`);
            // xhr.send(testbody);

            // const formdata = new FormData();
            // formdata.append('fileToUpload', photo);
            // console.log("formdata is here");
            // console.log(formdata);
            // this.mytest=formdata;
            // let options1: FileUploadOptions = {
            //     fileKey: "upload_data",
            //     fileName: filename,
            //     chunkedMode: false,
            //     mimeType: "multipart/form-data",
            //     params: {'supplier_id': param1, 'doc_name': "pan_card"}
            // };
            // formdata.append('packetId', '58984')
            // formdata.append('podDate', '2018-08-22')
            // Create the config object for the POST
            // You typically have an OAuth2 token that you use for authentication
            // const AuthStr = 'Bearer '.concat('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM0OCwiZXhwIjoxNTQwMTE2MzAyfQ.m333KIr9e01mCzSYaUJ9A5jlFeFUCqSBjlZJOfjiU9I');
            // const config = {
            //     method: 'POST',
            //
            //     headers: {
            //         'Accept': 'application/json',
            //         'Content-Type': 'multipart/form-data;',
            //         // 'Authorization': 'Bearer ' + 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM0OCwiZXhwIjoxNTQwMTE2MzAyfQ.m333KIr9e01mCzSYaUJ9A5jlFeFUCqSBjlZJOfjiU9I'
            //     },
            //     // mimeType: "multipart/form-data",
            //     // data: this.mytest,
            //     body: formdata
            // };
            /*axios.post(`http://emsqa.moglilabs.com/api/runner/uplodaDemoFile.json`, config)
                .then(res => {

                    console.log(JSON.stringify(res));
                });
            fetch('http://emsqa.moglilabs.com/api/runner/uplodaDemoFile.json', config)
                .then(responseData => {
                    // Log the response form the server
                    // Here we get what we sent to Postman back
                    console.log(responseData);
                })
                .catch(err => {
                    console.log("error log is here"+err);
                });*/
            const parts = file.path.split('/');
            const data = new FormData();
            data.append('fileToUpload', {
                uri: file.uri,
                type: file.type, // or photo.type
                name: parts[parts.length - 1]
            });
            console.log(data);
            axios({
                method: 'post',
                url: 'http://emsqa.moglilabs.com/api/runner/uplodaDemoFile.json',
                data: data,
                config: { headers: {'Content-Type': 'multipart/form-data' }}
            }).then(res => {
                console.log(res);
                alert(JSON.stringify(res));
            }).catch(err => {
                console.log("error log is here"+err);
                alert("err")
                alert(JSON.stringify(err));
                // alert(err);
            });
            // fetch('http://emsqa.moglilabs.com/api/runner/uplodaDemoFile.json', {
            //     method: 'post',
            //     body: data
            // }).then(res => {
            //     console.log(res);
            //     alert("success")
            //     alert(JSON.stringify(res));
            //     console.log(res);
            //     alert(res._bodyInit);
            // }).catch(err => {
            //     console.log("error log is here"+err);
            //     alert(JSON.stringify(err));
            //    // alert(err);
            // });
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
