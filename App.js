import 'react-native-gesture-handler';
import React from 'react';
import {SafeAreaView, View, Text, StatusBar} from 'react-native';
import Routes from './src/routes';

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <StatusBar backgroundColor={'#D9232D'} />
        <Routes />
      </SafeAreaView>
    );
  }
}
