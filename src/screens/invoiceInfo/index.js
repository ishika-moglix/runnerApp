import React, { Component } from "react";
import {
  Container, Header, Title, Content, Text, Button, Icon, Footer, FooterTab, Left, Right, Body
} from "native-base";
//import Pdf from 'react-native-pdf';
//import styles from "./styles";
import styles from "../form/styles";
import { AsyncStorage } from "react-native";
import axios from "axios/index";
class Invoiceinfo extends Component {
    constructor(props) {
        super(props);
        const {state} = props.navigation;
        this.state = {
            myInvoiceNumber: state.params.invoice,
            myItems:'',
            myToken:''
        };
        console.log("PROPS " + state.params.invoice);
        AsyncStorage.getItem('token', (err, result) => {
            console.log("storage token in pickup details");
            console.log(result);
            this.state.myToken=result;
            const user = {
                "invoiceNumber":this.state.myInvoiceNumber,
            };
            const AuthStr = 'Bearer '.concat('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM0OCwiZXhwIjoxNTQwMTE2MzAyfQ.m333KIr9e01mCzSYaUJ9A5jlFeFUCqSBjlZJOfjiU9I');
            axios.post(`http://emsqa.moglilabs.com/api/runner/invoiceDetail.json`, user,{ headers: { 'Authorization': AuthStr } })
                .then(res => {
                    console.log(JSON.stringify(res));
                    //console.log(res.data.data.id);
                    if(res.data.success && res.data.code==200){
                        console.log("my po items are here");
                        console.log(res.data.data.poItems);
                        //this.setState({ myItems: res.data.data.poItems });
                        this.state.myItems=res.data.data.invoice.invoiceUrl;
                        this.forceUpdate();
                    }else{
                        alert(res.data.message);
                    }
                });
            console.log(this.state.myItems);
        });
    };
  render() {
      const source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true};
    return (
        <Container>
            <Header style={{ backgroundColor : '#da4439'}}>
                <Left>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                <Title>Invoice</Title>
                </Body>
                <Right />
            </Header>

            <Content padder>
                <Text>{this.state.myItems}</Text>
            </Content>

            <Footer>
                <FooterTab>
                    <Button active full>
                        <Text>Footer</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
  }
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         marginTop: 25,
//     },
//     pdf: {
//         flex:1,
//         width:Dimensions.get('window').width,
//     }
// });

export default Invoiceinfo;
