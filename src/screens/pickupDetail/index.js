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
          'Simon Mignolet',
          'Nathaniel Clyne',
          'Dejan Lovren',
          'Mama Sakho',
          'Emre Can'
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
                          <Text>{item}</Text>
                      </ListItem>
                  }>
            </List>
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

export default PickupList;
