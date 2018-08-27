import React, { Component } from "react";
import {
  Container, Header, Title, Content, Text, Button, Icon, Footer, FooterTab, Left, Right, Body
} from "native-base";
//import Pdf from 'react-native-pdf';
//import styles from "./styles";
//import styles from "../form/styles";
import { StyleSheet, Dimensions, View } from 'react-native';
import Pdf from 'react-native-pdf';

import axios from "axios/index";
class Invoiceinfo extends Component {
    constructor(props) {
        super(props);
        const {state} = props.navigation;
        this.state = {
            myItems:state.params.invoice,
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
                { this.renderImage() }
            </Container>
        );
    }
renderImage() {
      if(this.state.myItems){
          { this.renderHeader() }
      const source = {uri:'http://'+this.state.myItems,cache:true};
      //const source = require('./test.pdf');  // ios only
      //const source = {uri:'bundle-assets://test.pdf'};

      //const source = {uri:'file:///sdcard/test.pdf'};
      //const source = {uri:"data:application/pdf;base64,..."};

      return (
          <View style={styles.container}>
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
          </View>
      )
      }
      else{
          return (
              <Text>Getting info</Text>
          )
      }
  }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginTop: 25,
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowOffset: { height: -5, width:-5},
        shadowRadius: 10,
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
    }
});

export default Invoiceinfo;
