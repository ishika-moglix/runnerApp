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
    Card,
    CardItem,
    CheckBox,
    Footer,
    FooterTab,
    Left,
    Right,
    List, ListItem,
    Body,
} from "native-base";
import { AsyncStorage,FlatList,BackHandler,ButtonBox,View,StyleSheet,ActivityIndicator,TextInput } from "react-native";
import axios from "axios/index";

class PickupList extends Component{
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        const {state} = props.navigation;
        this.state = {
            myPONumber: state.params.poNumber,
            checkbox1: false,
            myItems:[],
            myAddress:[],
            showAdd:false,
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
                                this.state.myAddress=res.data.data.address;
                                console.log(res.data.data);
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
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        if(this.props.navigation.state.routeName=="PickupList"){
            this.props.navigation.goBack(null);
            return false;
        }
    }
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
            if(this.state.myItems[t].status && this.state.myItems[t].remainingQuantity!="" && this.state.myItems[t].remainingQuantity!="0" && this.state.myItems[t].remainingQuantity!="0.0" && this.state.myItems[t].remainingQuantity!="0.00" && this.state.myItems[t].remainingQuantity!="0.000"){
                pickupArray.push({
                    "id": this.state.myItems[t].id,
                    "quantity": this.state.myItems[t].remainingQuantity
                })
            }
        }
        console.log(pickupArray);
        console.log(pickupArray.length);
        if(pickupArray.length>0){
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
        }else{
            Toast.show({
                text: "Select At least one item",
                buttonText: "Okay",
                position: "top",
                type: "danger",
                duration: 3000
            })
        }
    }
    myalert(val){
        console.log(val);
    }
    displayAdd(){
        console.log("add address");
        console.log(this.state.showAdd);
        this.setState({ showAdd: !this.state.showAdd });
    }

    render() {
        const { isLoading} = this.state;
        const { showAdd} = this.state;
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
                    <View style ={{flexDirection:'row',backgroundColor:'#fff'}}>
                        <View style ={styles.addtab1}>
                            <Text style ={{fontWeight:'bold'}}> ADDRESS</Text>
                        </View>
                        <View style ={styles.addtab2}>
                            <Button style = {styles.btnStyle} type="button"  onPress={() => this.displayAdd()}>
                                {showAdd && (
                                    <Text style ={{color:'#4B83FD',fontWeight:'bold'}}> Hide</Text>

                                )}
                                {!showAdd && (
                                    <Text style ={{color:'#4B83FD',fontWeight:'bold'}}> Show</Text>
                                )}
                            </Button>
                        </View>
                    </View>
                    {showAdd && (
                        <View>
                            {this.state.myAddress.from && (
                                <Card>
                                    <CardItem header style={styles.blueBg}>
                                        <Text>From</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                        <View style = {styles.addressParent}>
                                            <View style = {styles.addressLeft}>
                                                <Text style={styles.boldText}>
                                                    Company
                                                </Text>
                                            </View>
                                            <View styles ={styles.dots}>
                                                <Text>:</Text>
                                            </View>

                                            <View style = {styles.addressRight}>
                                                <Text style={[styles.rightText,styles.boldText]}>
                                                    {this.state.myAddress.from.company}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style = {styles.addressParent}>
                                            <View style = {styles.addressLeft}>
                                                <Text>
                                                    Address
                                                </Text>
                                            </View>
                                            <View styles ={styles.dots}>
                                                <Text>:</Text>
                                            </View>
                                            <View style = {styles.addressRight}>
                                                <Text>
                                                    {this.state.myAddress.from.address}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style = {styles.addressParent}>
                                            <View style = {styles.addressLeft}>
                                                <Text>
                                                    City
                                                </Text>
                                            </View>
                                            <View styles ={styles.dots}>
                                                <Text>:</Text>
                                            </View>
                                            <View style = {styles.addressRight}>
                                                <Text>
                                                    {this.state.myAddress.from.city}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style = {styles.addressParent}>
                                            <View style = {styles.addressLeft}>
                                                <Text>
                                                    State
                                                </Text>
                                            </View>
                                            <View styles ={styles.dots}>
                                                <Text>:</Text>
                                            </View>
                                            <View style = {styles.addressRight}>
                                                <Text>
                                                    {this.state.myAddress.from.state}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style = {styles.addressParent}>
                                            <View style = {styles.addressLeft}>
                                                <Text>
                                                    Phone
                                                </Text>
                                            </View>
                                            <View styles ={styles.dots}>
                                                <Text>:</Text>
                                            </View>
                                            <View style = {styles.addressRight}>
                                                <Text>
                                                    {this.state.myAddress.from.phone}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style = {styles.addressParent}>
                                            <View style = {styles.addressLeft}>
                                                <Text>
                                                    Tin
                                                </Text>
                                            </View>
                                            <View styles ={styles.dots}>
                                                <Text>:</Text>
                                            </View>
                                            <View style = {styles.addressRight}>
                                                <Text>
                                                    {this.state.myAddress.from.tinNo}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style = {styles.addressParent}>
                                            <View style = {styles.addressLeft}>
                                                <Text>
                                                    GSTIN
                                                </Text>
                                            </View>
                                            <View styles ={styles.dots}>
                                                <Text>:</Text>
                                            </View>
                                            <View style = {styles.addressRight}>
                                                <Text>
                                                    {this.state.myAddress.from.gstin}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style = {styles.addressParent}>
                                            <View style = {styles.addressLeft}>
                                                <Text>
                                                    State Code
                                                </Text>
                                            </View>
                                            <View styles ={styles.dots}>
                                                <Text>:</Text>
                                            </View>
                                            <View style = {styles.addressRight}>
                                                <Text>
                                                    {this.state.myAddress.from.stateCode}
                                                </Text>
                                            </View>
                                        </View>
                                        </Body>
                                    </CardItem>
                                </Card>
                            )}
                            {this.state.myAddress.to && (
                                <Card>
                                    <CardItem header style={styles.blueBg}>
                                        <Text>To</Text>
                                    </CardItem>
                                    <CardItem>
                                        <Body>
                                        <View style = {styles.addressParent}>
                                            <View style = {styles.addressLeft}>
                                                <Text style={styles.boldText}>
                                                    Company
                                                </Text>
                                            </View>
                                            <View styles ={styles.dots}>
                                                <Text>:</Text>
                                            </View>
                                            <View style = {styles.addressRight}>

                                                <Text style={[styles.rightText,styles.boldText]}>
                                                    {this.state.myAddress.to.company}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style = {styles.addressParent}>
                                            <View style = {styles.addressLeft}>
                                                <Text>
                                                    Address
                                                </Text>
                                            </View>
                                            <View styles ={styles.dots}>
                                                <Text>:</Text>
                                            </View>
                                            <View style = {styles.addressRight}>
                                                <Text>
                                                    {this.state.myAddress.to.address}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style = {styles.addressParent}>
                                            <View style = {styles.addressLeft}>
                                                <Text>
                                                    City
                                                </Text>
                                            </View>
                                            <View styles ={styles.dots}>
                                                <Text>:</Text>
                                            </View>
                                            <View style = {styles.addressRight}>
                                                <Text>
                                                    {this.state.myAddress.to.city}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style = {styles.addressParent}>
                                            <View style = {styles.addressLeft}>
                                                <Text>
                                                    State
                                                </Text>
                                            </View>
                                            <View styles ={styles.dots}>
                                                <Text>:</Text>
                                            </View>
                                            <View style = {styles.addressRight}>
                                                <Text>
                                                    {this.state.myAddress.to.state}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style = {styles.addressParent}>
                                            <View style = {styles.addressLeft}>
                                                <Text>
                                                    Phone
                                                </Text>
                                            </View>
                                            <View styles ={styles.dots}>
                                                <Text>:</Text>
                                            </View>
                                            <View style = {styles.addressRight}>
                                                <Text>
                                                    {this.state.myAddress.to.phone}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style = {styles.addressParent}>
                                            <View style = {styles.addressLeft}>
                                                <Text>
                                                    Tin
                                                </Text>
                                            </View>
                                            <View styles ={styles.dots}>
                                                <Text>:</Text>
                                            </View>
                                            <View style = {styles.addressRight}>
                                                <Text>
                                                    {this.state.myAddress.to.tinNo}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style = {styles.addressParent}>
                                            <View style = {styles.addressLeft}>
                                                <Text>
                                                    GSTIN
                                                </Text>
                                            </View>
                                            <View styles ={styles.dots}>
                                                <Text>:</Text>
                                            </View>
                                            <View style = {styles.addressRight}>
                                                <Text>
                                                    {this.state.myAddress.to.gstin}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style = {styles.addressParent}>
                                            <View style = {styles.addressLeft}>
                                                <Text>
                                                    Email
                                                </Text>
                                            </View>
                                            <View styles ={styles.dots}>
                                                <Text>:</Text>
                                            </View>
                                            <View style = {styles.addressRight}>
                                                <Text>
                                                    {this.state.myAddress.to.email}
                                                </Text>
                                            </View>
                                        </View>
                                        <View style = {styles.addressParent}>
                                            <View style = {styles.addressLeft}>
                                                <Text>
                                                    State Code
                                                </Text>
                                            </View>
                                            <View styles ={styles.dots}>
                                                <Text>:</Text>
                                            </View>
                                            <View style = {styles.addressRight}>
                                                <Text>
                                                    {this.state.myAddress.to.stateCode}
                                                </Text>
                                            </View>
                                        </View>
                                        </Body>
                                    </CardItem>
                                </Card>
                            )}
                        </View>
                    )}
                    <View style ={{flexDirection:'row',backgroundColor:'#fff',marginTop:10,borderBottomWidth:0.5,borderColor:'#e0e0e0'}}>
                        <View style ={styles.addtab1}>
                            <Text style ={{fontWeight:'bold'}}> ITEMS</Text>
                        </View>
                    </View>
                    <FlatList style ={{backgroundColor:'#fff'}}
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
                                          <Text onPress={() => this.toggleSwitch1(index)} style={{fontSize:14}}><Text style={styles.mytext}>{item.brandName} - </Text>{item.productName}{"\n"}<Text style={[item.status ? ( (item.remainingQuantity==item.quantity) ? styles.textvalid : styles.textinvalid) : styles.mytext]}>{item.status} QTY : {item.quantity}</Text></Text>
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

                <Footer style={{backgroundColor:"white",shadowColor:'#00000',shadowOffset:{width:0,height:-3},shadowOpacity:0.16, shadowRadius: 2}}>
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
        fontWeight:'bold',
        borderWidth:0.5,
        borderLeftWidth:0,
        borderRightWidth:0,
        borderColor:'#e0e0e0'

    },
    top:{
        alignItems:'flex-start',
        marginLeft:10,
        paddingLeft:15,
        marginTop:0
    },

    addtab1:{
        flexGrow:1,
        height:50,
        justifyContent:'flex-start',
        paddingLeft:30,
        flexDirection:'row',
        alignItems:'center',
    },
    addtab2:{
        flexGrow:1,
        height:50,
        justifyContent:'flex-end',
        flexDirection:'row',
        alignItems:'center',
        paddingRight:10,
        marginRight:'auto'
    },

    blueBg:{
        backgroundColor:'#F5F8FF',
        color:'#3875FD'
    },
    boldText:{
        fontWeight:"500",
    },
    eqWidth:{
        minWidth:200,
        fontSize:15
    },
    btnStyle:{
        backgroundColor:'transparent',
        shadowColor: '#fff',
        shadowOpacity: 0,
        borderWidth:0,
        shadowOffset: { width: 0, height: 2 },
        elevation:0
    },
    addressParent:{
        //justifyContent: 'space-between',
        flexDirection:'row',
        paddingTop:8,
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    addressLeft:{
        width:100,
        paddingLeft:10,

        flex:1
    },
    addressRight:{
        width:250,
        paddingLeft:10,
        flex:3

    },
    rightText:{

    },
    dots:{
        flex:1,
        width:10,
        paddingLeft:15,
        paddingRight:15
    }

});
export default PickupList;
