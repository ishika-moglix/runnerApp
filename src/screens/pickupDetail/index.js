import React, { Component } from "react";
import {
    Container,
    Header,
    Toast,
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
    Body,
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
            UserAuth:string='',
            showToast: false
        };
        console.log("PROPS " + state.params.poNumber);
        AsyncStorage.getItem('token', (err, result) => {
            this.state.myToken=result;
            const user = {
                "poIds":this.state.myPONumber,
            };
            if(result){
                this.state.UserAuth='Bearer '.concat(result);
            axios.post(`http://emsqa.moglilabs.com/api/runner/poDetail.json`, user,{ headers: { 'Authorization': this.state.UserAuth } })
                .then(res => {
                    if(res.data.code==200){
                        if(res.data.success){
                            console.log("my po items are here");
                            console.log(res.data.data.poItems);
                            //this.setState({ myItems: res.data.data.poItems });
                            this.state.myItems=res.data.data.poItems;
                            console.log(this.state.myItems);
                            this.setState({ isLoading: false });
                            this.forceUpdate();
                        }else{
                            Toast.show({
                                text: res.data.message,
                                buttonText: "Okay",
                                duration: 3000
                            })
                            this.setState({ isLoading: false });
                        }
                    }else if(res.data.code==401){
                        this.setState({ isLoading: false });
                        Toast.show({
                            text: res.data.message,
                            buttonText: "Okay",
                            position: "top",
                            type: "danger",
                            duration: 3000
                        })
                        this.props.navigation.navigate('Home');
                    }
                });
            }
            else{
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
    markPickupdone(){
        let pickupArray=[];
        console.log("mark pickup done clicked");
        console.log(this.state.myItems);
        console.log(this.state.myItems.length);
        for(var t=0;t<this.state.myItems.length;t++){
            console.log(this.state.myItems[t].productId);
            pickupArray.push({
                "id": this.state.myItems[t].id,
                "quantity": this.state.myItems[t].remainingQuantity
            })
        }
        axios.post(`http://emsqa.moglilabs.com/api/runner/markPickupDone.json`,{
            "pickupItems": pickupArray
        },{ headers: { 'Authorization': this.state.UserAuth } })
            .then(res => {
                if(res.data.success && res.data.code==200){
                    console.log(res);
                    Toast.show({
                        text: res.data.message,
                        buttonText: "Okay",
                        position: "top",
                        type: "success",
                        duration: 3000
                    });
                    this.props.navigation.navigate('NHTab');
                }else if(!res.data.success && res.data.code==200){
                    Toast.show({
                        text: res.data.message,
                        buttonText: "Okay",
                        position: "top",
                        type: "warning",
                        duration: 3000
                    })
                }else if(res.data.code==401){
                    Toast.show({
                        text: res.data.message,
                        buttonText: "Okay",
                        position: "top",
                        type: "danger",
                        duration: 3000
                    });
                    this.props.navigation.navigate('Home');
                }
            });
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
              <Title>No-{this.state.myPONumber}</Title>
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
                        <Left>
                    <Text>{item.productName} {"\n"} QTY: {item.quantity}</Text>
                        </Left>
                        <Right>
                    <Button disabled={item.remainingQuantity==0} transparent onPress={() => this.decreaseValue( item, index )}>
                    <Icon name="remove" />
                    </Button>
                    <Text textAlign="right" style={{textAlign: 'right'}}>
                    {item.remainingQuantity}</Text>
                    <Button  disabled={item.remainingQuantity==item.quantity} transparent onPress={() => this.increaseValue( item, index )}>
                    <Icon name="add" />
                    </Button>
                        </Right>
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
            <Button onPress={() => this.markPickupdone()} active full>
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
