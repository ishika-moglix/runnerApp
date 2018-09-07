import React, { Component } from "react";
import {
  Container, Header, Title,  List, ListItem, Thumbnail,
  Content, Button, Icon, Text, Body, Left, Right, View} from "native-base";
import { StyleSheet } from "react-native";
import axios from "axios/index";
import { AsyncStorage } from "react-native";
const cover = require("../../../assets/web-cover1.jpg");
const datas = [];

class Profile extends Component {
    constructor(props) {
        super(props);
        this.getProfile();
        this.state = {
            profileInfo: [],
        };
    }
    getProfile= () => {
        AsyncStorage.getItem('token', (err, result) => {
            //this.state.myToken=result;
            //console.log(this.state.myToken);
            const user = {};
            const AuthStr = 'Bearer '.concat('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM0OCwiZXhwIjoxNTQwMTE2MzAyfQ.m333KIr9e01mCzSYaUJ9A5jlFeFUCqSBjlZJOfjiU9I');
            axios.post(`http://emsqa.moglilabs.com/api/auth/profile.json`,user, { headers: { 'Authorization': AuthStr } })
                .then(res => {
                    if(res.data.success && res.data.code==200){
                        console.log("my po items are here");
                        console.log(res.data.data);
                        //this.state.profileInfo=res.data.data;
                        this.setState({ profileInfo: res.data.data });
                       //  this.forceUpdate();
                    }else{
                        alert(res.data.message);
                    }
                });
            //console.log(this.state.myItems);
        });

    };
  render() {
    return (
      <Container style={styles.container}>
        <Header style={{ backgroundColor : '#da4439'}}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate("DrawerOpen")}
            >
              <Icon name="menu" />
            </Button>
          </Left>
          <Body>
            <Title>User Profile</Title>
          </Body>
          <Right />
        </Header>
          <Content>
              <Thumbnail small source={cover} style={styles.mb10} />
                      <ListItem>
                          <Left>
                              <Text>
                                  Name
                              </Text>
                          </Left>
                              <Text style={{textAlign: 'right'}}>
                                  {this.state.profileInfo.userName}
                              </Text>
                      </ListItem>
              <ListItem>
                  <Left>
                      <Text>
                          Email
                      </Text>
                  </Left>
                      <Text style={{textAlign: 'right'}}>
                          {this.state.profileInfo.userEmail}
                      </Text>
              </ListItem>
              <ListItem>
                  <Left>
                      <Text>
                          Number
                      </Text>
                  </Left>
                      <Text style={{textAlign: 'right'}}>
                          {this.state.profileInfo.userPhone}
                      </Text>
              </ListItem>
          </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFF"
    },
    mb10: {
        marginBottom: 10,
        alignItems: "center"
    }
});
export default Profile;
