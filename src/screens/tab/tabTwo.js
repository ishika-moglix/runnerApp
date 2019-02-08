import React, { Component } from "react";
import {
    Container, Header, Body,
    Content, Icon, Title,
    Button, Right,
    Item, Left,
    Input,
    Form,
    Text, Toast
} from "native-base";
import axios from "axios/index";
import { AsyncStorage,StyleSheet,View,TextInput,ActivityIndicator,BackHandler } from "react-native";

export default class TabTwo extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        const {state} = props.navigation;
        if(state.params){
            console.log(state.params.from);
            this.state = {
                invoiceNumber: '',
                isDisabled: true,
                myItems:'',
                myToken:'',
                isLoading: false,
                showHeader:state.params.from
            };
        }else{
            this.state = {
                invoiceNumber: '',
                isDisabled: true,
                myItems:'',
                myToken:'',
                isLoading: false,
                showHeader:false,
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
    tab2click= () => {
        this.setState({ isLoading: true });
        AsyncStorage.getItem('token', (err, result) => {
            // this.state.myToken=result;
            // console.log(this.state.myToken);
            const user = {
                "invoiceNumber":this.state.invoiceNumber,
            };
            if(result){
                this.state.myToken = 'Bearer '.concat(result);
                axios.post(global.url+`/api/runner/invoiceDetail.json`, user,{ headers: { 'Authorization': this.state.myToken } })
                    .then(res => {
                        this.setState({ isLoading: false });
                        if(res.data.success && res.data.code==200){
                            console.log("my po items are here");
                            console.log(res.data.data.invoice.invoiceUrl);
                            //this.setState({ myItems: res.data.data.poItems });
                            this.state.myItems=res.data.data.invoice;
                            this.props.navigation.navigate('Invoiceinfo', { invoice: this.state.myItems });
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
                console.log(this.state.myItems);
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
        const { isLoading} = this.state;
            // return (
            //     <Container style={styles.container}>
            //         { this.renderHeader()}
            //         { this.renderForm() }
            //         {isLoading && (
            //             <ActivityIndicator
            //                 animating={true}
            //                 style={styles.indicator}
            //                 size="large"
            //             />
            //         )}
            //     </Container>
            // );
            /* commented due to first release */
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
        const { isLoading} = this.state;
        return (
            <Content style={{ margin: 10, marginTop: 100 }}>
                <Form >
                    <View style={{borderColor:'#e0e0e',borderRadius:4,borderWidth:1,borderColor: '#d6d7da',
                        marginLeft:15,marginRight:15}}>
                        <TextInput style = { styles.textInput } keyboardType='numeric' value={this.state.invoiceNumber} onChangeText={(text)=> this.onChanged(text)} maxLength={10} placeholder="Invoice Number"></TextInput>
                    </View>
                </Form>
                <Button block disabled={this.state.isDisabled} onPress={() => this.tab2click()} style={{ paddingTop:5,paddingBottom:5,position:'absolute',right:15,top:0}}>
                    <Text style ={{textAlign:'center'}}>Search Invoice</Text>
                </Button>
            </Content>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowOffset: {height: -5, width: -5},
        shadowRadius: 10,
        backgroundColor:'#f2f2f2'
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
        }
} );
