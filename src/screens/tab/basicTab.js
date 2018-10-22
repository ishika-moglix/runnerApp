import React, { Component } from "react";
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Tabs,
  Tab,
  Right,
  Left,
  Body
} from "native-base";
import TabOne from "./tabOne";
import TabTwo from "./tabTwo";
import { AsyncStorage,Keyboard } from "react-native";
//import TabThree from "./tabThree";

class BasicTab extends Component {
    openSideMenu(){
        Keyboard.dismiss();
        this.props.navigation.navigate("DrawerOpen")
    }
  render() {
      AsyncStorage.getItem('token', (err, result) => {
          console.log("storage token get later");
          console.log(result);
      });
      //console.log(AsyncStorage.getItem('token'));
    return (
      <Container>
        <Header style={{ backgroundColor: '#D9232D' }}
                androidStatusBarColor="#D9232D" hasTabs>
            <Left>
            <Button
                transparent
                onPress={() => this.openSideMenu()}
            >
                <Icon name="menu" />
            </Button>
        </Left>
          <Body>
            <Title> Moglix Runner</Title>
          </Body>
          <Right />
        </Header>

        <Tabs tabBarSelectedItemStyle={{borderBottomWidth:1}}>
          <Tab tabStyle={{ backgroundColor: '#D9232D' }}
               androidStatusBarColor="#D9232D" activeTabStyle={{backgroundColor: '#D9232D',color:'#fff'}}  textStyle={{color: '#dddddd'}} heading="Pickup">
            <TabOne navigation={this.props.navigation} />
          </Tab>
          <Tab tabStyle={{ backgroundColor: '#D9232D' }}
               androidStatusBarColor="#D9232D" textStyle={{color: '#dddddd'}} activeTabStyle={{backgroundColor: '#D9232D' ,color: '#fff',}}  heading="Delivery">
            <TabTwo navigation={this.props.navigation} />
          </Tab>
          {/*<Tab heading="Tab3">*/}
            {/*<TabThree />*/}
          {/*</Tab>*/}
        </Tabs>
      </Container>
    );
  }
}

export default BasicTab;
