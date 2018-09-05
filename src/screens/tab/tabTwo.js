import React, { Component } from "react";
import {
    Container,Header,Body,
    Content,Icon,Title,
    Button,Right,
    Item,Left,
    Input,
    Form,
    Text
} from "native-base";

import styles from "../form/styles";
import axios from "axios/index";
import { AsyncStorage,View } from "react-native";

export default class TabTwo extends Component {
    constructor(props) {
        super(props);
        const {state} = props.navigation;
        if(state.params){
            console.log(state.params.from);
            this.state = {
                invoiceNumber: '',
                isDisabled: true,
                myItems:'',
                myToken:'',
                showHeader:state.params.from
            };
        }else{
            this.state = {
                invoiceNumber: '',
                isDisabled: true,
                myItems:'',
                myToken:'',
                showHeader:false
            };
        }
    }
    tab2click= () => {
        AsyncStorage.getItem('token', (err, result) => {
            this.state.myToken=result;
            console.log(this.state.myToken);
            const user = {
                "invoiceNumber":this.state.invoiceNumber,
            };
            const AuthStr = 'Bearer '.concat('eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjM0OCwiZXhwIjoxNTQwMTE2MzAyfQ.m333KIr9e01mCzSYaUJ9A5jlFeFUCqSBjlZJOfjiU9I');
            axios.post(`http://emsqa.moglilabs.com/api/runner/invoiceDetail.json`, user,{ headers: { 'Authorization': AuthStr } })
                .then(res => {
                    if(res.data.success && res.data.code==200){
                        console.log("my po items are here");
                        console.log(res.data.data.invoice.invoiceUrl);
                        //this.setState({ myItems: res.data.data.poItems });
                        this.state.myItems=res.data.data.invoice;
                        this.props.navigation.navigate('Invoiceinfo', { invoice: this.state.myItems });
                    }else{
                        alert(res.data.message);
                    }
                });
            console.log(this.state.myItems);
        });

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
        if(newText.length>=4){
            this.state.isDisabled=false;
        }else{
            this.state.isDisabled=true;
        }
        this.setState({ invoiceNumber: newText });
    }
    render() {
        if(this.state.showHeader){
            return (
                <Container style={styles.container}>
                    { this.renderHeader()}
                    { this.renderForm() }
                </Container>
            );
        }else{
            return (
                <Container style={styles.container}>
                    { this.renderForm() }
                </Container>
            );
        }

    }
    renderHeader() {
        return (
            <View >
                <Header style={{ backgroundColor : '#da4439'}}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Search Invoice</Title>
                    </Body>
                    <Right />
                </Header>
            </View>
        );
    }
    renderForm(){
        return (
            <Content style={{ margin: 10, marginTop: 100 }}>
                <Form >
                    <Item last>
                        <Input keyboardType='numeric' value={this.state.invoiceNumber} onChangeText={(text)=> this.onChanged(text)} maxLength={10} placeholder="Invoice Number"  />
                    </Item>
                </Form>
                <Button block disabled={this.state.isDisabled} onPress={() => this.tab2click()} style={{ margin: 15, marginTop: 50 }}>
                    <Text>Search Invoice</Text>
                </Button>
            </Content>
        )
    }
}
