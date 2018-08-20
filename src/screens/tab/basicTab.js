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
import TabThree from "./tabThree";

class BasicTab extends Component {
  render() {
    return (
      <Container>
        <Header style={{ backgroundColor: '#da4439' }}
                androidStatusBarColor="#da4439" hasTabs>
            <Left>
            <Button
                transparent
                onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
                <Icon name="menu" />
            </Button>
        </Left>
          <Body>
            <Title> Moglix Runner1</Title>
          </Body>
          <Right />
        </Header>

        <Tabs tabBarUnderlineStyle={{borderBottomWidth:2}}>
          <Tab tabStyle={{ backgroundColor: '#da4439' }}
               androidStatusBarColor="#da4439" activeTabStyle={{backgroundColor: 'red'}}  textStyle={{color: '#fff'}} heading="Pickup">
            <TabOne />
          </Tab>
          <Tab tabStyle={{ backgroundColor: '#da4439' }}
               androidStatusBarColor="#da4439" textStyle={{color: '#fff'}} activeTabStyle={{backgroundColor: 'red'}}  heading="Delivery">
            <TabTwo />
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
