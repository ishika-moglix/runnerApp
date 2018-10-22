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
import { AsyncStorage,FlatList,ButtonBox,View,StyleSheet,ActivityIndicator,TextInput } from "react-native";
import axios from "axios/index";

class PickupList extends Component{
    constructor(props) {
        super(props);
        const {state} = props.navigation;
        this.state = {
            myPONumber: state.params.poNumber,
            checkbox1: false,
            myItems:[],
            mycounter:0,
            testValue:'4',
            data: [],
            error: null,
            myToken:'',
            isLoading: false,
            UserAuth:string='',
            showToast: false
        };
        AsyncStorage.getItem('token', (err, result) => {
            this.state.myToken=result;
            const user = {
                "poIds":this.state.myPONumber,
            };
            if(result){
                this.state.UserAuth='Bearer '.concat(result);
            axios.post(global.url+`/api/runner/poDetail.json`, user,{ headers: { 'Authorization': this.state.UserAuth } })
                .then(res => {
                    if(res.data.code==200){
                        if(res.data.success){
                            this.state.myItems=res.data.data.poItems;
                            console.log(this.state.myItems);
                            this.setState({ isLoading: false });
                            this.forceUpdate();
                        }else{
                            Toast.show({
                                text: res.data.message,
                                buttonText: "Okay",
                                duration: 3000
                            });
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
                        });
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
    toggleSwitch1(indexNo) {
        console.log(indexNo);
       // this.state.mycounter=0;
        var count=0;
        for(var t=0;t<this.state.myItems.length;t++){
            console.log(this.state.myItems[t]);
            console.log(t);
            if(indexNo==t){
                console.log("matched item"+t);
                //this.state.myItems[t].status=!this.state.myItems[t].status;
                console.log(this.state.myItems);
                let newState = Object.assign({}, this.state);
                newState.myItems[t].status = !this.state.myItems[t].status;
                this.setState(newState);
            }
            this.setState({
                mycounter:this.state.myItems.filter(props => props.status).length
            });
        }

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
    testPickup(text,index){
        console.log(text);
        let newText = text;
        // let numbers = '0123456789';
        // var i ;
        // for (i=0; i < text.length; i++) {
        //     if(numbers.indexOf(text[i]) > -1 ) {
        //         newText = newText + text[i];
        //     }
        //     else {
        //         // your call back function
        //         Toast.show({
        //             text: "only number required !",
        //             buttonText: "Okay",
        //             position: "top",
        //             type: "warning",
        //             duration: 3000
        //         });
        //     }
        // };
        if(newText <= this.state.myItems[index].quantity){
                    let { myItems } = this.state;
                    let targetPost = myItems[index];
                    targetPost.remainingQuantity=newText;
                    this.setState({ myItems });
        }else{
                Toast.show({
                    text: "Selected Qty can not be more than ordered",
                    buttonText: "Okay",
                    position: "top",
                    type: "warning",
                    duration: 3000
                });
                    let { myItems } = this.state;
                    let targetPost = myItems[index];
                    targetPost.remainingQuantity=targetPost.quantity;
                    this.setState({ myItems });
        }
    }
    markPickupdone(){
        let pickupArray=[];
        console.log("mark pickup done clicked");
        console.log(this.state.myItems);
        console.log(this.state.myItems.length);
        for(var t=0;t<this.state.myItems.length;t++){
            if(this.state.myItems[t].status && this.state.myItems[t].remainingQuantity!="" && this.state.myItems[t].remainingQuantity!="0"){
                pickupArray.push({
                    "id": this.state.myItems[t].id,
                    "quantity": this.state.myItems[t].remainingQuantity
                })
            }
            console.log(pickupArray);
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
    myalert(val){
        console.log(val);
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
          <Header searchBar style={{ backgroundColor : '#da4439'}} rounded>
              <Left>
                  <Button transparent onPress={() => this.props.navigation.goBack()}>
                      <Icon name="arrow-back" />
                  </Button>
              </Left>
              <Body>
              <Title>No-{this.state.myPONumber}</Title>
              </Body>
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
                    <ListItem  style={styles.top} >
                        <CheckBox onPress={() => this.toggleSwitch1(index)} style = {{borderRadius:100 ,marginTop:6,marginLeft:-25}}
                                  checked={(item.status)}
                        />
                        <Left style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',marginLeft:10
                        }}>
                            <Text onPress={() => this.toggleSwitch1(index)} style={{fontSize:14}}>{item.productName}{"\n"}<Text style={[item.status ? ( (item.remainingQuantity==item.quantity) ? styles.textvalid : styles.textinvalid) : styles.mytext]}>{item.status} QTY : {item.quantity}</Text></Text>
                        </Left>

                        <Right style={{flex: 1,flexDirection: 'row',justifyContent: 'space-between',
                        }}>

                    <Button style={styles.flex1} disabled={item.remainingQuantity==1} transparent onPress={() => this.decreaseValue( item, index )}>
                    <Icon style={{fontSize:14,fontWeight:'bold',color:'#000'}}  name="remove" />
                    </Button>
                            <TextInput keyboardType='numeric' onChangeText={(text)=> this.testPickup(text,index)} style={styles.remainingQty} value={item.remainingQuantity.toString()} />

                    <Button style={styles.flex1} disabled={item.remainingQuantity==item.quantity} transparent onPress={(e) => this.increaseValue( item, index )}>
                    <Icon style={{fontSize:14,fontWeight:'bold',color:'#000'}} name="add" />
                    </Button>
                        </Right>
                    </ListItem>
                }
                keyExtractor={item => item.productName}
            />
        </Content>

        <Footer style={{backgroundColor:"white"}}>
              <View style={styles.container2}>
                  <View style={styles.textContainer}>
                      <Text>{this.state.mycounter}/{this.state.myItems.length} Items</Text>
                  </View>
                  <View style={styles.buttonContainer}>
                      <Button onPress={() => this.markPickupdone()}>
                          <Text> Pickup Done</Text>
                      </Button>
                  </View>
              </View>
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
    textContainer:{
      paddingLeft:25,
      flex:1
    },
    container2: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        justifyContent:"flex-end",
        marginRight:-50



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
        color:"#000000",
        fontWeight:'bold',


    },
    textvalid: {
         color:"#59C100",
         fontWeight:'bold',


    },
    textinvalid: {
        color:"#F29502",
        fontWeight:'bold',


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
        fontSize:14,
        backgroundColor:'white',
        height:40,
        flex:2,
        textAlignVertical: "center",
        textAlign: "center",
        fontWeight:'bold'
    },
    top:{
        alignItems:'flex-start',
        marginLeft:10,
        paddingLeft:15,
        marginTop:0
    },
    textv:{

    }


});
export default PickupList;
