import React from 'react';
import {View, Text, Image} from 'react-native';
import {Right, Left, Header as Head, Icon, Title, Body} from 'native-base';

export default Header = (props) => {
  return (
    <Head
      androidStatusBarColor={'#D9232D'}
      style={{
        backgroundColor: '#D9232D',
      }}>
      <Left>{props.leftComponent ? <props.leftComponent /> : null}</Left>
      <Body
        style={{
          alignSelf: 'center',
        }}>
        <Title style={{textAlign: 'center'}}>{props.headertext}</Title>
      </Body>
      <Right>{props.rightComponent ? <props.rightComponent /> : null}</Right>
    </Head>
  );
};
