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
import { AsyncStorage,FlatList,View,StyleSheet,ActivityIndicator } from "react-native";
import axios from "axios/index";
//import styles from "./styles";


class PickupList extends Component{
    constructor(props) {
        super(props);
        const {state} = props.navigation;
        this.state = {
            myPONumber: state.params.poNumber,
            myItems:'',
            myToken:'',
            isLoading: true,
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
                        console.log(this.state.myItems);
                        this.setState({ isLoading: false });
                        this.forceUpdate();
                    }else{
                        alert(res.data.message);
                    }
                });
            console.log(this.state.myItems);
        });
    };
    decreaseValue(selectedItem,index){
        let { myItems } = this.state;
        let targetPost = myItems[index];
        --targetPost.remainingQuantity;
        this.setState({ myItems });
    }
    increaseValue(selectedItem,index){
        let { myItems } = this.state;
        let targetPost = myItems[index];
        ++targetPost.remainingQuantity;
        this.setState({ myItems });
    }
  render() {
      const { isLoading} = this.state;
      var items=[];
      console.log("list is here");
      if(this.state.myItems){
          items=this.state.myItems;
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
            {isLoading && (
            <ActivityIndicator
                animating={true}
                style={styles.indicator}
                size="large"
            />
            )}
            <FlatList
                extraData={this.state}
                data={this.state.myItems}
                showsVerticalScrollIndicator={false}
                renderItem={({item,index}) =>
                    <ListItem>
                    <Text>{item.productName} {"\n"} QTY: {item.quantity}</Text>
                    <Button disabled={item.remainingQuantity==0} transparent onPress={() => this.decreaseValue( item, index )}>
                    <Icon name="remove" />
                    </Button>
                    <Text textAlign="right" style={{textAlign: 'right'}}>
                    {item.remainingQuantity}</Text>
                    <Button  disabled={item.remainingQuantity==item.quantity} transparent onPress={() => this.increaseValue( item, index )}>
                    <Icon name="add" />
                    </Button>
                    {/*<Text>*/}
                    {/*<b>Some Text</b>*/}
                    {/*</Text>*/}
                    </ListItem>
                }
                keyExtractor={item => item.productName}
            />
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

const styles = StyleSheet.create({
    container: {
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowOffset: { height: -5, width:-5},
        shadowRadius: 10,
    },
    indicator: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: 100,
        color:"#C00",
    },
    buttonColor:{
        elevation: 1,
    },
    flatview: {
        justifyContent: 'center',
        paddingTop: 30,
        borderRadius: 2,

    },
    viewText: {
        fontFamily: 'Verdana',
        fontSize: 15
    },
    separator: {
        height: 0.5,
        width: "80%",
        alignSelf: 'center',
        backgroundColor: "#555"
    }
});
export default PickupList;
