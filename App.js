import "react-native-gesture-handler";
import React from "react";
import { SafeAreaView, StatusBar } from "react-native";
import Routes from "./src/routes";
import { Provider } from "react-redux";
import store from "./src/redux";
import { Root } from "native-base";

export default class App extends React.Component {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor={"#D9232D"} />
        <Provider store={store}>
          <Root>
            <Routes />
          </Root>
        </Provider>
      </SafeAreaView>
    );
  }
}
