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
//import PickupList from "../pickupDetail";
//import TabThree from "./tabThree";

export default class TabOne extends Component {
    constructor(props) {
        super(props);
        this.state = {
            myNumber: '',
            isDisabled: true
        };
    }
    tab1click= () => {
        this.props.navigation.navigate('PickupList');
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
        if(newText.length==10){
            this.state.isDisabled=false;
        }else{
            this.state.isDisabled=true;
        }
        this.setState({ myNumber: newText });
    }
  render() {
      return (
          <Container style={styles.container}>
              <Content style={{ margin: 10, marginTop: 100 }}>
                  <Form >
                      <Item last>
                          <Input keyboardType='numeric' value={this.state.myNumber} onChangeText={(text)=> this.onChanged(text)} maxLength={10} placeholder="PO Number" secureTextEntry />
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
