import React, { Component } from "react";
import {
    Container, Content, Button, Item, Input, Form, Text
} from "native-base";
import styles from "../form/styles";

//import PickupList from "../pickupDetail";
//import TabThree from "./tabThree";

export default class TabOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mypoNumber: '',
            isDisabled: true
        };
    }
    tab1click= () => {
        this.props.navigation.navigate('PickupList', { poNumber: this.state.mypoNumber });
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
        if(newText.length==5){
            this.state.isDisabled=false;
        }else{
            this.state.isDisabled=true;
        }
        this.setState({ mypoNumber: newText });
    }
  render() {
      return (
          <Container style={styles.container}>
              <Content style={{ margin: 10, marginTop: 100 }}>
                  <Form >
                      <Item last>
                          <Input keyboardType='numeric' value={this.state.mypoNumber} onChangeText={(text)=> this.onChanged(text)} maxLength={10} placeholder="PO Number" />
                      </Item>
                  </Form>
                  <Button block disabled={this.state.isDisabled} onPress={() => this.tab1click()} style={{ margin: 15, marginTop: 50 }}>
                      <Text>Search PO</Text>
                  </Button>
              </Content>
          </Container>
      );
  }
}
