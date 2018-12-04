import React, { Component } from "react";
import {Header,Container, Content,Icon,Title, Card,
    CardItem,  Button,Right,Item,Body, Input, Form,Left, Text} from "native-base";
import {StyleSheet,View,TextInput,ScrollView} from "react-native";
import Home from "../home";

export default class TabOne extends Component {
    constructor(props) {
        super(props);
        const {state} = props.navigation;
        if(state.params){
            console.log(state.params.from);
            this.state = {
                mypoNumber: '',
                isDisabled: true,
                apiData:{"name": "testuser","user":"test"},
                showHeader:state.params.from
            };
        }else{
            this.state = {
                mypoNumber: '',
                isDisabled: true,
                apiData:[],
                showHeader:false
            };
        }
    }
    tab1click= () => {
        this.props.navigation.navigate('PickupList', { poNumber: this.state.mypoNumber });
    };
    onChanged(text){
        let newText = '';
        let numbers = '0123456789';
        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                alert("please enter numbers only");
            }
        };
        if(newText.length>=5){
            this.state.isDisabled=false;
        }else{
            this.state.isDisabled=true;
        }
        this.setState({ mypoNumber: newText });
    }
  render() {
        if(this.state.showHeader){
            return (
                <Container>
                    { this.renderHeader()}
                    { this.renderForm() }
                  
                </Container>
            );
        }else{
            return (
                <Container style ={{backgroundColor:'#f2f2f2'}}>
                    { this.renderForm()}
                   
                </Container>
            );
        }
    }
    renderHeader() {
        return (
            <View>
                <Header style={{ backgroundColor : '#da4439'}}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Search Pickup</Title>
                    </Body>
                    <Right/>
                </Header>
            </View>
        );
    }
  renderForm(){
      return (
      <Content  style={{margin: 10,marginTop: 15,height:0}}>
        <Form>
        <View  style={{marginLeft:15,marginRight:15,shadowColor:'rgba(0, 0, 0, 0.05)',
            shadowOffset: { height: 3, width:0}}}>
            <TextInput style = {styles.textInput } keyboardType='numeric' value={this.state.mypoNumber} onChangeText={(text)=> this.onChanged(text)} maxLength={10} placeholder="PO Number"></TextInput>
         </View>
        </Form>
        <Button disabled={this.state.isDisabled} onPress={() => this.tab1click()} style= {{ paddingTop:5,paddingBottom:5,position:'absolute',right:15,top:0}}>
            <Text style ={{textAlign:'center'}}>Search PO</Text>
         </Button>
         <View>
        <ScrollView style={{flex:1,flexGrow:1}}>         
         <Card style ={{flex:1}}>
           <CardItem header>
               <Left>
               <Text>P.O No 74476</Text>
               </Left>
               <Right>
                   <Text>10 items</Text>
               </Right>
           </CardItem>
           <CardItem>
               <Body>
               <Text>
                   Pickup From
               </Text>
               <Text>
                   Supplier Name - City Name
               </Text>
               <Text>
                   Delivered To
               </Text>
               <Text>
                   Warehouse Name
               </Text>
                   <Text>Assigned By:</Text>
                   <Text>User Name (27.11.2018)</Text>
               <Icon name="ios-world-outline" style={{fontSize: 20, color: 'red'}}/>
               </Body>
           </CardItem>
           <CardItem header>
               <Left>
                   <Text>P.O No 74476</Text>
               </Left>
               <Right>
                   <Text>10 items</Text>
               </Right>
           </CardItem>
           <CardItem>
               <Body>
               <Text>
                   Pickup From
               </Text>
               <Text>
                   Supplier Name - City Name
               </Text>
               <Text>
                   Delivered To
               </Text>
               <Text>
                   Warehouse Name
               </Text>
               <Text>Assigned By:</Text>
               <Text>User Name (27.11.2018)</Text>
               <Icon name="ios-world-outline" style={{fontSize: 20, color: 'red'}}/>
               </Body>
           </CardItem>
           <CardItem header>
               <Left>
                   <Text>P.O No 74476</Text>
               </Left>
               <Right>
                   <Text>10 items</Text>
               </Right>
           </CardItem>
           <CardItem>
               <Body>
               <Text>
                   Pickup From
               </Text>
               <Text>
                   Supplier Name - City Name
               </Text>
               <Text>
                   Delivered To
               </Text>
               <Text>
                   Warehouse Name
               </Text>
               <Text>Assigned By:</Text>
               <Text>User Name (27.11.2018)</Text>
               <Icon name="ios-world-outline" style={{fontSize: 20, color: 'red'}}/>
               </Body>
           </CardItem>
           <CardItem header>
               <Left>
                   <Text>P.O No 74476</Text>
               </Left>
               <Right>
                   <Text>10 items</Text>
               </Right>
           </CardItem>
           <CardItem>
               <Body>
               <Text>
                   Pickup From
               </Text>
               <Text>
                   Supplier Name - City Name
               </Text>
               <Text>
                   Delivered To
               </Text>
               <Text>
                   Warehouse Name
               </Text>
               <Text>Assigned By:</Text>
               <Text>User Name (27.11.2018)</Text>
               <Icon name="ios-world-outline" style={{fontSize: 20, color: 'red'}}/>
               </Body>
           </CardItem>
           <CardItem header>
               <Left>
                   <Text>P.O No 74476</Text>
               </Left>
               <Right>
                   <Text>10 items</Text>
               </Right>
           </CardItem>
           <CardItem>
               <Body>
               <Text>
                   Pickup From
               </Text>
               <Text>
                   Supplier Name - City Name
               </Text>
               <Text>
                   Delivered To
               </Text>
               <Text>
                   Warehouse Name
               </Text>
               <Text>Assigned By:</Text>
               <Text>User Name (27.11.2018)</Text>
               <Icon name="ios-world-outline" style={{fontSize: 20, color: 'red'}}/>
               </Body>
           </CardItem>
           <CardItem header>
               <Left>
                   <Text>P.O No 74476</Text>
               </Left>
               <Right>
                   <Text>10 items</Text>
               </Right>
           </CardItem>
           <CardItem>
               <Body>
               <Text>
                   Pickup From
               </Text>
               <Text>
                   Supplier Name - City Name
               </Text>
               <Text>
                   Delivered To
               </Text>
               <Text>
                   Warehouse Name
               </Text>
               <Text>Assigned By:</Text>
               <Text>User Name (27.11.2018)</Text>
               <Icon name="ios-world-outline" style={{fontSize: 20, color: 'red'}}/>
               </Body>
           </CardItem>
       </Card>
       </ScrollView>
       </View>
      </Content>
      ) 
   }
}
const styles = StyleSheet.create({
    container: {
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowOffset: { height: -5, width:-5},
        shadowRadius: 10,

    },
    textInput:
        {   width: '100%',
            paddingVertical: 8,
            paddingHorizontal: 15,
            margin: 0,
            fontSize: 18,
            backgroundColor: '#fff',
            borderColor:'#008000',
            borderRadius:4,
            borderWidth:1,
            position:'relative',
   },
        smallTxt:{
            fontSize:12,
            
        }
    }),
       
