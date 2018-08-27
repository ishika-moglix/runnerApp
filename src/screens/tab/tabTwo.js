import React, { Component } from "react";
import {
    Container,
    Content,
    Button,
    Item,
    Input,
    Form,
    Text
} from "native-base";
import styles from "../form/styles";
import axios from "axios/index";
import { AsyncStorage } from "react-native";

export default class TabTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoiceNumber: '',
            isDisabled: true,
            myItems:'',
            myToken:''
        };
    }
    tab2click= () => {
        AsyncStorage.getItem('token', (err, result) => {
            this.state.myToken=result;
            const user = {
                "invoiceNumber":this.state.invoiceNumber,
            };
            const AuthStr = 'Bearer '.concat('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM0OCwiZXhwIjoxNTQwMTE2MzAyfQ.m333KIr9e01mCzSYaUJ9A5jlFeFUCqSBjlZJOfjiU9I');
            axios.post(`http://emsqa.moglilabs.com/api/runner/invoiceDetail.json`, user,{ headers: { 'Authorization': AuthStr } })
                .then(res => {
                    console.log(JSON.stringify(res));
                    //console.log(res.data.data.id);
                    if(res.data.success && res.data.code==200){
                        console.log("my po items are here");
                        console.log(res.data.data.invoice.invoiceUrl);
                        //this.setState({ myItems: res.data.data.poItems });
                        this.state.myItems=res.data.data.invoice.invoiceUrl;
                        console.log(this.state.myItems);
                        alert(this.state.myItems.length);
                        this.props.navigation.navigate('Invoiceinfo', { invoice: this.state.myItems });
                    }else{
                        alert(res.data.message);
                    }
                });
            console.log(this.state.myItems);
        });

    };
    onChanged(text){
        let newText = '';
        let numbers = '0123456789';
        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                alert("please enter numbers only");
            }
        };
        if(newText.length>=4){
            this.state.isDisabled=false;
        }else{
            this.state.isDisabled=true;
        }
        this.setState({ invoiceNumber: newText });
    }
  render() {
      return (
          <Container style={styles.container}>
              <Content style={{ margin: 10, marginTop: 100 }}>
                  <Form >
                      <Item last>
                          <Input keyboardType='numeric' value={this.state.invoiceNumber} onChangeText={(text)=> this.onChanged(text)} maxLength={10} placeholder="Invoice Number"  />
                      </Item>
                  </Form>
                  <Button block disabled={this.state.isDisabled} onPress={() => this.tab2click()} style={{ margin: 15, marginTop: 50 }}>
                      <Text>Search Invoice</Text>
                  </Button>
              </Content>
          </Container>
      );
  }
}
