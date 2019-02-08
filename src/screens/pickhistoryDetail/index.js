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
    Card,
    CardItem,
    Left,
    Right,
    Body,
} from "native-base";
import { AsyncStorage,FlatList,Dimensions,ButtonBox,BackHandler,View,ScrollView,StyleSheet,ActivityIndicator,TextInput } from "react-native";
var { width, height } = Dimensions.get('window');
class PickuphistoryDetail extends Component{
    constructor(props) {
        super(props);
        this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
        const {state} = props.navigation;
    };
    componentWillMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }

    handleBackButtonClick() {
        if(this.props.navigation.state.routeName=="PickuphistoryDetail"){
            this.props.navigation.goBack(null);
            return false;
        }
    }
  render() {

    return (
      <Container>
          <Header searchBar style={{ backgroundColor : '#da4439'}} rounded>
              <Left>
                  <Button transparent onPress={() => this.props.navigation.goBack()}>
                      <Icon name="arrow-back" />
                  </Button>
              </Left>
              <Body>
              <Title>PO No ****</Title>
              </Body>
          </Header>
            <Content style={{margin: 10,marginTop: 15,height:0}}>
                <ScrollView style={{flex:1,flexGrow:1}}>
                    <Card style ={{flex:1}} >
                        <CardItem header>
                            <Left>
                                <Text style={styles.textColor}>Black & Decker 220W 1/4 Sheet Sander, KA400</Text>
                            </Left>
                            <Right>
                                <Text style={styles.textTop}> Qty Received</Text>
                                <Text>10/10</Text>
                            </Right>
                        </CardItem>
                        <CardItem style={styles.cardDesign}>
                            <Left>
                            <Text style={styles.textTop}>
                                Assigned
                            </Text>
                            <Text>
                                16 Nov 2018
                            </Text>
                            </Left>
                            <Right>
                            <Text style={styles.textTop}>
                                Pick up
                            </Text>
                            <Text>
                                24 Nov 2018
                            </Text>
                            </Right>
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
export default PickuphistoryDetail;
