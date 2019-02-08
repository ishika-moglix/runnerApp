import { AppRegistry } from "react-native";
import App from "./App";
global.url = 'http://ems.moglix.com';
AppRegistry.registerComponent("NativebaseKitchenSink", () => App);
