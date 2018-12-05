import React from "react";
import { Root } from "native-base";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import NHTab from "./screens/tab/";
import BasicTab from "./screens/tab/basicTab";
import Home from "./screens/home/";
import SideBar from "./screens/sidebar";
import TabOne from "./screens/tab/tabOne";
import TabTwo from "./screens/tab/tabTwo";
import Verify from "./screens/verification";
import PickupList from "./screens/pickupDetail";
import Invoiceinfo from "./screens/invoiceInfo";
import Profile from "./screens/profile"
import { AsyncStorage } from "react-native";
import PickupHistory  from "./screens/pickupHistory";
import DeliveryHistory  from "./screens/deliveryHistory";
import PickuphistoryDetail from "./screens/pickhistoryDetail";
// To see all the requests in the chrome Dev tools in the network tab.
XMLHttpRequest = GLOBAL.originalXMLHttpRequest ?
    GLOBAL.originalXMLHttpRequest :
    GLOBAL.XMLHttpRequest;

// fetch logger
global._fetch = fetch;
global.fetch = function (uri, options, ...args) {
    return global._fetch(uri, options, ...args).then((response) => {
        console.log('Fetch', { request: { uri, options, ...args }, response });
        return response;
    });
};
const Drawer = DrawerNavigator(
  {
      NHPickup: {screen:TabOne },
      NHDelivery: {screen:TabTwo },
      NHTab: { screen: BasicTab },
      Home: { screen: Home },
      NHInvoice:{screen:Invoiceinfo},
      NHProfile: {screen: Profile},
      NHPickHistory: {screen:PickupHistory},
      NHDeliveryHistory: {screen:DeliveryHistory}
  },
  {
    initialRouteName: "Home",
    contentOptions: {
      activeTintColor: "#e91e63"
    },
    contentComponent: props => <SideBar {...props} />
  }
);

const Drawer2 = DrawerNavigator(
    {
        NHTab2: { screen: BasicTab },
    },
    {
        initialRouteName: "NHTab2",
        contentOptions: {
            activeTintColor: "#e91e63"
        },
        contentComponent: props => <SideBar {...props} />
    }
);

const AppNavigator = StackNavigator(
  {
  Drawer: { screen: Drawer },
  Verify: {screen: Verify},
  Invoiceinfo:{screen:Invoiceinfo},
      PickupList: { screen: PickupList },
      PhistoryDetail: {screen: PickuphistoryDetail}

  },
  {
    initialRouteName: "Drawer",
    headerMode: "none"
  }
);
export default () =><Root>
    <AppNavigator />
</Root>

