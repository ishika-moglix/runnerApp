import React, { Component } from "react";
import {
    Container, IconNB, Header, Title, Content,Card,
    CardItem, Text, Button, Icon,  Left, Right, Body, Toast
} from "native-base";
import {ImageBackground,BackHandler,TouchableOpacity,ActivityIndicator, StatusBar,ScrollView, Image, TextInput,  Dimensions, View, StyleSheet, Animated} from 'react-native';
import { AsyncStorage } from "react-native";

class PickupHistory extends Component {
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        const {state} = props.navigation;
        this.state = {
            active: false,
        };
    };
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        if(this.props.navigation.state.routeName=="PickupHistory"){
            this.props.navigation.goBack(null);
            return false;
        }
    }
    renderHeader() {
        return (
            <View >
                <Header style={{ backgroundColor : '#da4439'}}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.cardclick()}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                    <Title>Pickup History</Title>
                    </Body>
                    <Right />
                </Header>
            </View>
        );
    }
    render() {
        const { isLoading} = this.state;
        return (
            <Container style={[ styles.container, this.props.style || {} ]}>
                { this.renderHeader() }
                {isLoading && (
                    <ActivityIndicator
                        animating={true}
                        style={styles.indicator}
                        size="large"
                    />
                )}
                { this.renderCard() }
            </Container>
        );
    }
    renderCard(){
        return (
            <Content onPress={() => this.cardclick()} style={{margin: 10,marginTop: 15,height:0}}>
                    <ScrollView style={{flex:1,flexGrow:1}}>
                        <Card style ={{flex:1}} >
                            <TouchableOpacity onPress={this.cardclick}>
                            <CardItem header>
                                <Left>
                                    <Text style={styles.textColor}>P.O No 74476</Text>
                                </Left>
                                <Right>
                                    <Text>8/10 items</Text>
                                </Right>
                            </CardItem>
                            <CardItem style={styles.cardDesign} >
                                <Body>
                                <Text style={styles.textTop}>
                                    Pickup From
                                </Text>
                                <Text>
                                    Supplier Name - City Name
                                </Text>
                                <Text style={styles.textTop}>
                                    Delivered To
                                </Text>
                                <Text>
                                    Warehouse Name
                                </Text>
                                <Text style={styles.textTop}>
                                    Assigned By:
                                </Text>
                                <Text> User Name (27.11.2018)
                                </Text>
                                </Body>
                            </CardItem>
                            </TouchableOpacity>
                            <CardItem header>
                                <Left>
                                    <Text style={styles.textColor}>P.O No 74476</Text>
                                </Left>
                                <Right>
                                    <Text>8/10 items</Text>
                                </Right>
                            </CardItem>
                            <CardItem style={styles.cardDesign}>
                                <Body>
                                <Text style={styles.textTop}>
                                    Pickup From
                                </Text>
                                <Text>
                                    Supplier Name - City Name
                                </Text>
                                <Text style={styles.textTop}>
                                    Delivered To
                                </Text>
                                <Text>
                                    Warehouse Name
                                </Text>
                                <Text style={styles.textTop}>
                                    Assigned By:
                                </Text>
                                <Text> User Name (27.11.2018)
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem header>
                                <Left>
                                    <Text style={styles.textColor}>P.O No 74476</Text>
                                </Left>
                                <Right>
                                    <Text>8/10 items</Text>
                                </Right>
                            </CardItem>
                            <CardItem style={styles.cardDesign}>
                                <Body>
                                <Text style={styles.textTop}>
                                    Pickup From
                                </Text>
                                <Text>
                                    Supplier Name - City Name
                                </Text>
                                <Text style={styles.textTop}>
                                    Delivered To
                                </Text>
                                <Text>
                                    Warehouse Name
                                </Text>
                                <Text style={styles.textTop}>
                                    Assigned By:
                                </Text>
                                <Text> User Name (27.11.2018)
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem header>
                                <Left>
                                    <Text style={styles.textColor}>P.O No 74476</Text>
                                </Left>
                                <Right>
                                    <Text>8/10 items</Text>
                                </Right>
                            </CardItem>
                            <CardItem style={styles.cardDesign}>
                                <Body>
                                <Text style={styles.textTop}>
                                    Pickup From
                                </Text>
                                <Text>
                                    Supplier Name - City Name
                                </Text>
                                <Text style={styles.textTop}>
                                    Delivered To
                                </Text>
                                <Text>
                                    Warehouse Name
                                </Text>
                                <Text style={styles.textTop}>
                                    Assigned By:
                                </Text>
                                <Text> User Name (27.11.2018)
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem header>
                                <Left>
                                    <Text style={styles.textColor}>P.O No 74476</Text>
                                </Left>
                                <Right>
                                    <Text>8/10 items</Text>
                                </Right>
                            </CardItem>
                            <CardItem style={styles.cardDesign}>
                                <Body>
                                <Text style={styles.textTop}>
                                    Pickup From
                                </Text>
                                <Text>
                                    Supplier Name - City Name
                                </Text>
                                <Text style={styles.textTop}>
                                    Delivered To
                                </Text>
                                <Text>
                                    Warehouse Name
                                </Text>
                                <Text style={styles.textTop}>
                                    Assigned By:
                                </Text>
                                <Text> User Name (27.11.2018)
                                </Text>
                                </Body>
                            </CardItem>
                            <CardItem header>
                                <Left>
                                    <Text style={styles.textColor}>P.O No 74476</Text>
                                </Left>
                                <Right>
                                    <Text>8/10 items</Text>
                                </Right>
                            </CardItem>
                            <CardItem style={styles.cardDesign}>
                                <Body>
                                <Text style={styles.textTop}>
                                    Pickup From
                                </Text>
                                <Text>
                                    Supplier Name - City Name
                                </Text>
                                <Text style={styles.textTop}>
                                    Delivered To
                                </Text>
                                <Text>
                                    Warehouse Name
                                </Text>
                                <Text style={styles.textTop}>
                                    Assigned By:
                                </Text>
                                <Text> User Name (27.11.2018)
                                </Text>
                                </Body>
                            </CardItem>
                        </Card>
                    </ScrollView>
            </Content>
        )}

    cardclick= () => {
        this.props.navigation.navigate('PhistoryDetail');
    };
}

const styles = StyleSheet.create({
    container: {
        shadowColor: '#000000',
        shadowOpacity: 0.4,
        shadowOffset: { height: -5, width:-5},
        shadowRadius: 10,
    },
    textColor:{
        color: 'blue'
    },
    textTop:{
        fontSize: 10
    },
    cardDesign:{
        borderBottomWidth: 1,
        borderColor: 'black'
    }
});

export default PickupHistory;
