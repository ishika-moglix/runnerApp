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
import {  FlatList, StyleSheet, View } from 'react-native';
//import styles from "./styles";


class PickupList extends Component {
  render() {
      var items = [
          {name:'Simon Mignolet',qty:10},
          {name:'Nathaniel Clyne',qty:20},
          {name:'Dejan Lovren',qty:22},
          {name:'Mama Sakho',qty:25},
          {name:'Emre Can',qty:78},
          {name:'Dejan Lovren',qty:22},
          {name:'Mama Sakho',qty:25},
          {name:'Emre Can',qty:78},
      ];
    return (
      <Container>
          <Header style={{ backgroundColor : '#da4439'}}>
              <Left>
                  <Button transparent onPress={() => this.props.navigation.goBack()}>
                      <Icon name="arrow-back" />
                  </Button>
              </Left>
              <Body>
              <Title>Po no 77486</Title>
              </Body>
              <Right />
          </Header>

        <Content padder>
            <List dataArray={items}
                  renderRow={(item) =>
                      <ListItem>
                          <Text>{item.name}</Text>
                          <Text>QTY: {item.qty}</Text>
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
