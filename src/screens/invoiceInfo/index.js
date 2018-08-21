import React, { Component } from "react";
import {
  Container, Header, Title, Content, Text, Button, Icon, Footer, FooterTab, Left, Right, Body
} from "native-base";
//import Pdf from 'react-native-pdf';
//import styles from "./styles";
import styles from "../form/styles";
class Invoiceinfo extends Component {
  render() {
      const source = {uri:'http://samples.leanpub.com/thereactnativebook-sample.pdf',cache:true};
    return (
        <Container>
            <Header style={{ backgroundColor : '#da4439'}}>
                <Left>
                    <Button transparent onPress={() => this.props.navigation.goBack()}>
                        <Icon name="arrow-back" />
                    </Button>
                </Left>
                <Body>
                <Title>Invoice</Title>
                </Body>
                <Right />
            </Header>

            <Content padder>
                <Text>Content goes here</Text>
            </Content>

            <Footer>
                <FooterTab>
                    <Button active full>
                        <Text>Footer</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
  }
}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'flex-start',
//         alignItems: 'center',
//         marginTop: 25,
//     },
//     pdf: {
//         flex:1,
//         width:Dimensions.get('window').width,
//     }
// });

export default Invoiceinfo;
