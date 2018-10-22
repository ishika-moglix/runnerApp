import React, { Component } from "react";
import {Header,Container, Content,Icon,Title,  Button,Right,Item,Body, Input, Form,Left, Text} from "native-base";
import {StyleSheet,View} from "react-native";
import Home from "../home";


//import PickupList from "../pickupDetail";
//import TabThree from "./tabThree";

export default class TabOne extends Component {
    constructor(props) {
        super(props);
        const {state} = props.navigation;
        if(state.params){
            console.log(state.params.from);
            this.state = {
                mypoNumber: '',
                isDisabled: true,
                showHeader:state.params.from
            };
        }else{
            this.state = {
                mypoNumber: '',
                isDisabled: true,
                showHeader:false
            };
        }
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
        if(this.state.showHeader){
            return (
                <Container>
                    { this.renderHeader()}
                    { this.renderForm() }
                </Container>
            );
        }else{
            return (
                <Container style ={{backgroundColor:'#f2f2f2'}}>
                    { this.renderForm()}
                </Container>
            );
        }
    }
    renderHeader() {
        return (
            <View>
                <Header style={{ backgroundColor : '#da4439'}}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Search Pickup</Title>
                    </Body>
                    <Right />
                </Header>
            </View>
        );
    }
  renderForm(){
      return (
      <Content style={{ margin: 10, marginTop: 100}}>
          <Form>
              <View style={{borderColor:'#e0e0e',borderRadius:4,borderWidth:1,borderColor: '#d6d7da',
                  marginLeft:15,marginRight:15,shadowColor:'rgba(0, 0, 0, 0.05)',shadowOffset: { height: 3, width:0}}}>
                  <Input style={{textAlign:'center',backgroundColor:'#fff'}} keyboardType='numeric' value={this.state.mypoNumber} onChangeText={(text)=> this.onChanged(text)} maxLength={10} placeholder="PO Number" />
              </View>
          </Form>
          <Button block disabled={this.state.isDisabled} onPress={() => this.tab1click()} style={{  margin:15,marginTop: 20,paddingTop:5,paddingBottom:5 }}>
              <Text>Search PO</Text>
          </Button>
      </Content>
      )
   }
}
const styles = StyleSheet.create({
    container: {
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowOffset: { height: -5, width:-5},
        shadowRadius: 10,

    }});
