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
    Item,
    Input,
    CheckBox,
    Footer,
    FooterTab,
    Left,
    Right,
    List, ListItem,
    Body,
} from "native-base";
import { AsyncStorage,FlatList,ButtonBox,View,StyleSheet,ActivityIndicator } from "react-native";
import axios from "axios/index";
//import styles from "./styles";


class PickupList extends Component{
    constructor(props) {
        super(props);
        const {state} = props.navigation;
        this.state = {
            myPONumber: state.params.poNumber,
            //myItems:'',
            myItems:[
                { "productName": "5001","name":{"title":"mr","first":"charlie","last":"lévesque"}, "quantity": "2" , "remainingQuantity": "1", "status": true},
                { "productName": "5002","name":{"title":"ms","first":"charlie","last":"lévesque"}, "quantity": "22", "remainingQuantity": "22" , "status": false},
                { "productName": "5005","name":{"title":"shree","first":"charlie","last":"lévesque"}, "quantity": "23" , "remainingQuantity": "23", "status": "false"},
                { "productName": "5007","name":{"title":"ms","first":"charlie","last":"lévesque"}, "quantity": "3", "remainingQuantity": "3" , "status": "false"},
                { "productName": "5006","name":{"title":"ms","first":"charlie","last":"lévesque"}, "quantity": "7", "remainingQuantity": "7" , "status": "false"},
                { "productName": "5003","name":{"title":"ms","first":"charlie","last":"lévesque"}, "quantity": "5" , "remainingQuantity": "5", "status": "false"},
                { "productName": "5004","name":{"title":"ms","first":"charlie","last":"lévesque"}, "quantity": "4" , "remainingQuantity": "4", "status": "false"}
            ],
            data: [],
            error: null,
            myToken:'',
            checkbox1: false,
            isLoading: false,
            UserAuth:string='',
            showToast: false
        };
        console.log("PROPS " + state.params.poNumber);
        // AsyncStorage.getItem('token', (err, result) => {
        //     this.state.myToken=result;
        //     const user = {
        //         "poIds":this.state.myPONumber,
        //     };
        //     if(result){
        //         this.state.UserAuth='Bearer '.concat(result);
        //     axios.post(global.url+`/api/runner/poDetail.json`, user,{ headers: { 'Authorization': this.state.UserAuth } })
        //         .then(res => {
        //             if(res.data.code==200){
        //                 if(res.data.success){
        //                     console.log("my po items are here");
        //                     console.log(res.data.data.poItems);
        //                     //this.setState({ myItems: res.data.data.poItems });
        //                     this.state.myItems=res.data.data.poItems;
        //                     console.log(this.state.myItems);
        //                     this.setState({ isLoading: false });
        //                     this.forceUpdate();
        //                 }else{
        //                     Toast.show({
        //                         text: res.data.message,
        //                         buttonText: "Okay",
        //                         duration: 3000
        //                     })
        //                     this.setState({ isLoading: false });
        //                 }
        //             }else if(res.data.code==401){
        //                 this.setState({ isLoading: false });
        //                 Toast.show({
        //                     text: res.data.message,
        //                     buttonText: "Okay",
        //                     position: "top",
        //                     type: "danger",
        //                     duration: 3000
        //                 })
        //                 this.props.navigation.navigate('Home');
        //             }
        //         });
        //     }
        //     else{
        //         Toast.show({
        //             text: "no token Found ! Login Again",
        //             buttonText: "Okay",
        //             position: "top",
        //             type: "danger",
        //             duration: 3000
        //         });
        //         this.props.navigation.navigate('Home')
        //     }
        // });
    };
    toggleSwitch1(itemId) {
        console.log(itemId);
        this.setState({
            checkbox1: !this.state.checkbox1
        });
    }
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
        axios.post(global.url+`/api/runner/markPickupDone.json`,{
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

    searchFilterFunction = text => {
        debugger;
        console.log(text);
        let trucks=this.state.myItems;
        let newData = trucks.filter((truck) => {
            debugger;
            console.log(truck);
            console.log(truck.name);
            console.log(truck.name.title);
            console.log(truck.name.title.toLowerCase());
            console.log(text);
            const itemData = truck.name.title.toString().toUpperCase();
            console.log(itemData);
            console.log(text.toString().toLowerCase());
            console.log(text.toString().toLowerCase());

            const textData = text.toString().toUpperCase();
                console.log(textData);
                alert(itemData.indexOf(textData));
            return itemData.indexOf(textData) > -1;
        });
        this.setState({ myItems: newData });
    };

  render() {
      const { isLoading} = this.state;
      var items=[];
      console.log("list is here");
      if(this.state.myItems){
          items=this.state.myItems;
      }

    return (
      <Container>
          <Header searchBar style={{ backgroundColor : '#da4439'}} rounded>
              <Left>
                  <Button transparent onPress={() => this.props.navigation.goBack()}>
                      <Icon name="arrow-back" />
                  </Button>
              </Left>
              <Body>
              <Title>No-{this.state.myPONumber}</Title>
              </Body>
              <Right>

                  <Item>
                      <Icon active name="search" />
                      <Input placeholder="Search" />
                  </Item>
                  <Button onPress={this.filterList} transparent>
                      <Text>Search</Text>
                  </Button>
              </Right>
          </Header>

        <Content>
            {isLoading && (
            <ActivityIndicator
                animating={true}
                style={styles.indicator}
                size="large"
            />
            )}
            <List items={this.state.items}/>
            <FlatList
                extraData={this.state}
                data={this.state.myItems}
                showsVerticalScrollIndicator={false}
                renderItem={({item,index}) =>
                    <ListItem  style={styles.top}>
                        <CheckBox
                            checked={item.checked}
                            onPress={() => this.toggleSwitch1(item.checked)}
                        />
                        <Left style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',
                        }}>
                            <Text style={{fontSize:12}}>{item.productName} {"\n"} <Text style={[styles.mytext, (item.remainingQuantity==item.quantity) ? styles.textvalid : styles.textinvalid]}>{item.status} {item.name.title} QTY: {item.quantity}</Text></Text>
                        </Left>
                        <Right style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',
                        }}>

                    <Button style={styles.flex1} disabled={item.remainingQuantity==0} transparent onPress={() => this.decreaseValue( item, index )}>
                    <Icon name="remove" />
                    </Button>
                            <Text style={styles.remainingQty}>{item.remainingQuantity}</Text>
                    <Button style={styles.flex1}  disabled={item.remainingQuantity==item.quantity} transparent onPress={() => this.increaseValue( item, index )}>
                    <Icon name="add" />
                    </Button>
                        </Right>
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
    mytext: {
        fontWeight:'bold',marginTop:5, backgroundColor: 'white', borderRadius: 5,
    },
    textvalid: {
         color:"#9b7fcc",
    },
    textinvalid: {
        color:"#C00",
    },
    buttonBox:{
        borderWidth:1,
        borderColor:'#ddd',
        borderRadius:3,
    },
    flex1:{
        flex: 1,
        flexDirection: 'row',
        backgroundColor:'#cbe3fd',
        flexBasis:15,
        height:40,
        borderRadius:3,
        alignItems:'center',
        fontSize:10,

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
    },
    remainingQty:{
        flexDirection: 'row',
        fontSize:12,
        backgroundColor:'white',
        height:40,
        flex:2,
        textAlignVertical: "center",
        textAlign: "center"
    },
    top:{
        alignItems:'flex-start',
        marginLeft:10,
        paddingLeft:15,
        marginTop:0
    }


});
export default PickupList;
