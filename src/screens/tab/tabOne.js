import React, { Component } from "react";
import {Header,Container, Content,Icon,Title, Card,
    CardItem,  Button,Right,Item,Body, Input, Form,Left, Text} from "native-base";
import {StyleSheet,View,TextInput,ScrollView,BackHandler} from "react-native";
import Home from "../home";

export default class TabOne extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
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
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        return true;
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
                    { this.renderScreen() }
                </Container>
            );
        }else{
            return (
                <Container style ={{backgroundColor:'#f2f2f2'}}>
                    { this.renderScreen() }
                </Container>
            );
        }
    }
    renderScreen() {
        const { isLoading} = this.state;
        return (
            <View style={{ margin: 10, marginTop: 100 }}>
                <Form>
                <View style={{borderColor:'#e0e0e',borderRadius:4,borderWidth:1,borderColor: '#d6d7da',
                    marginLeft:15,marginRight:15}}>
                    <TextInput style = {styles.textInput } keyboardType='numeric' value={this.state.mypoNumber} onChangeText={(text)=> this.onChanged(text)} maxLength={10} placeholder="PO Number"></TextInput>
                    <Button block disabled={this.state.isDisabled} onPress={() => this.tab1click()} style={{ paddingTop:0,paddingBottom:5,position:'absolute',right:0,top:0}}>
                        <Text style ={{textAlign:'center'}}>Search PO</Text>
                    </Button>
                </View>


                </Form>
            </View>
        );
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
          <Content style={{ margin: 10, marginTop: 100 }}>
              <Form >
                  <View style={{borderColor:'#e0e0e',borderRadius:4,borderWidth:1,borderColor: '#d6d7da',
                      marginLeft:15,marginRight:15}}>
                      <TextInput style = { styles.textInput } keyboardType='numeric' value={this.state.mypoNumber} onChangeText={(text)=> this.onChanged(text)} maxLength={10} placeholder="PO Number"></TextInput>
                  </View>
              </Form>
              <Button block disabled={this.state.isDisabled || isLoading} onPress={() => this.tab1click()} style={{ paddingTop:5,paddingBottom:5,position:'absolute',right:15,top:0}}>
                  <Text style ={{textAlign:'center'}}>Search PO</Text>
              </Button>
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
        {
            width: '100%',
            paddingVertical: 0,
            paddingHorizontal: 15,
            height: 40,
            margin: 0,
            fontSize: 18,
            backgroundColor: '#fff'
        },
        smallTxt:{
            fontSize:12,

        },
    contain: {
        flex: 1,margin: 10,marginTop: 15,height:0
    },
    tbar: {
        marginLeft:15,marginRight:15,shadowColor:'rgba(0, 0, 0, 0.05)',
        shadowOffset: { height: 3, width:0},
        borderBottomWidth: 2,
        borderColor: 'black',
    },
    main: {
        flex: 1
    },
    item: {
        height: 200,
        width: 375,
        marginTop: 10,
        backgroundColor: 'green'
    },
    bbar: {
        width: 375,
        height: 100,
        borderTopWidth: 5,
        borderColor: 'black',
        backgroundColor: 'red'
    },
    text: {
        color: '#ffffff',
        fontSize: 40
    }
    });

