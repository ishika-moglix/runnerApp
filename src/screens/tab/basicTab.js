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
    Body, Toast
} from "native-base";
import TabOne from "./tabOne";
import TabTwo from "./tabTwo";
import { AsyncStorage,Keyboard } from "react-native";
import axios from "axios/index";
//import TabThree from "./tabThree";

class BasicTab extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profileInfo: [],
            AuthStr: '',
        };
    }
    openSideMenu(){
        Keyboard.dismiss();
        this.props.navigation.navigate("DrawerOpen")
    }
    componentWillMount() {
        AsyncStorage.getItem('token', (err, result) => {
            const user = {};
            if(result){
                this.state.AuthStr = 'Bearer '.concat(result);
                axios.post(global.url+`/api/auth/profile.json`,user, { headers: { 'Authorization': this.state.AuthStr } })
                    .then(res => {
                            console.log(res.ok);
                            if (res.data.success && res.data.code == 200) {
                                console.log("my po items are here");
                                console.log(res.data.data);
                                this.setState({profileInfo: res.data.data});
                            }
                    }).catch(err => this.myerror());
            }else{
                Toast.show({
                    text: "no token Found ! Login Again",
                    buttonText: "Okay",
                    position: "top",
                    type: "danger",
                    duration: 3000
                });
                this.props.navigation.navigate('Home');
            }

        });
    }

    myerror(){
        Toast.show({
            text: "Session Expired. Login Again",
            buttonText: "Okay",
            position: "top",
            type: "danger",
            duration: 2000
        });
        AsyncStorage.clear();
        this.props.navigation.navigate('Home');
    }
  render() {
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
