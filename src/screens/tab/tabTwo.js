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

export default class TabTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            invoiceNumber: '',
            isDisabled: true
        };
    }
    tab2click= () => {
        this.props.navigation.navigate('Invoiceinfo', { invoice: this.state.invoiceNumber });
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
