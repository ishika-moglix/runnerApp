import React, { Component } from "react";
import {
    Container, Header, Title, ListItem,
    Content, Button, Icon, Text, Body, Left, Right, Toast
} from "native-base";
import { StyleSheet } from "react-native";
import axios from "axios/index";
import { AsyncStorage } from "react-native";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.getProfile();
        this.state = {
            profileInfo: [],
            AuthStr: '',
        };
    }
    getProfile= () => {
        AsyncStorage.getItem('token', (err, result) => {
            const user = {};
            if(result){
                this.state.AuthStr = 'Bearer '.concat(result);
                axios.post(global.url+`/api/auth/profile.json`,user, { headers: { 'Authorization': this.state.AuthStr } })
                    .then(res => {
                        if(res.data.success && res.data.code==200){
                            console.log("my po items are here");
                            console.log(res.data.data);
                            this.setState({ profileInfo: res.data.data });
                        }else if(res.data.code==401){
                            this.setState({ isLoading: false });
                            Toast.show({
                                text: res.data.message,
                                buttonText: "Okay",
                                position: "top",
                                type: "danger",
                                duration: 3000
                            });
                            this.props.navigation.navigate('Home');
                        }else{
                            alert(res.data.message);
                        }
                    });
            }else{
                Toast.show({
                    text: "no token Found ! Login Again",
                    buttonText: "Okay",
                    position: "top",
                    type: "danger",
                    duration: 3000
                });
                this.props.navigation.navigate('Home')
            }

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
    );}}

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
