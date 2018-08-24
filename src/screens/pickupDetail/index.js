import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Content,
  Text,
  Button,
  Icon,
  Footer,
  FooterTab,
  Left,
  Right,
    List, ListItem,
    Body
} from "native-base";
import { AsyncStorage } from "react-native";
import axios from "axios/index";
//import styles from "./styles";


class PickupList extends Component{
    constructor(props) {
        super(props);
        const {state} = props.navigation;
        this.state = {
            myPONumber: state.params.poNumber,
            myItems:'',
            myToken:''
        };
        console.log("PROPS " + state.params.poNumber);
        AsyncStorage.getItem('token', (err, result) => {
            console.log("storage token in pickup details");
            console.log(result);
            this.state.myToken=result;
            const user = {
                "poIds":this.state.myPONumber,
            };
            const AuthStr = 'Bearer '.concat('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM0OCwiZXhwIjoxNTQwMTE2MzAyfQ.m333KIr9e01mCzSYaUJ9A5jlFeFUCqSBjlZJOfjiU9I');
            axios.post(`http://emsqa.moglilabs.com/api/runner/poDetail.json`, user,{ headers: { 'Authorization': AuthStr } })
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
  render() {
      var items=[];
      // var items = [
      //     {name:'Simon Mignolet',qty:10},
      // ];
      console.log("list is here");
      if(this.state.myItems){
          items=this.state.myItems;
          console.log(this.state.myItems.lenght);
      }
    return (
      <Container>
          <Header style={{ backgroundColor : '#da4439'}}>
              <Left>
                  <Button transparent onPress={() => this.props.navigation.goBack()}>
                      <Icon name="arrow-back" />
                  </Button>
              </Left>
              <Body>
              <Title>Po no {this.state.myPONumber}</Title>
              </Body>
              <Right />
          </Header>

        <Content padder>
            <List dataArray={items}
                  renderRow={(item) =>
                      <ListItem>
                          <Text>{item.productName}</Text>
                          <Text>QTY: {item.quantity}</Text>
                          <Button transparent onPress={() => this.props.navigation.goBack()}>
                              <Icon name="minus" />
                          </Button>
                          <Text textAlign="right" style={{textAlign: 'right'}}>
                              5</Text>
                          <Button transparent onPress={() => this.props.navigation.goBack()}>
                              <Icon name="plus" />
                          </Button>
                          {/*<Text>*/}
                              {/*<b>Some Text</b>*/}
                          {/*</Text>*/}
                      </ListItem>
                  }>
            </List>
        </Content>

        <Footer>
          <FooterTab>
            <Button active full>
              <Text>Pickup Done</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
}


export default PickupList;
