import React, { useEffect, useState } from "react";

import axios from "axios";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import AuthActions from "../redux/actions/auth";

import LoadingScreen from "../containers/Loading";
import LoginScreen from "../containers/Login";
import VerificationScreen from "../containers/Verification";
import HomeScreen from "../containers/Home";
import PickupScreen from "../containers/Pickup";
import AddressScreen from "../containers/Address";
import DeliveryScreen from "../containers/Delivery";
import ReturnScreen from "../containers/Return";
import ItemDetailsScreen from "../containers/ItemDetails";
import ItemsImagesScreen from "../containers/ItemsImages";

import CustomDrawer from "../components/Drawer";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Routes = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://runnerqa.moglilabs.com/api/auth/getConfiguration")
      .then(({ data: { list } }) => {
        props.setBaseUrl(
          "https://runnerqa.moglilabs.com/api/" ||
            list.find((_) => _.name == "BASE_URL").value
        );
      });
  }, []);

  const changeLoginState = () => {
    setIsLoggedIn(!isLoggedIn);
  };

  const changeLoading = () => {
    setLoading(!loading);
  };

  const DrawerStack = () => {
    return (
      <Drawer.Navigator
        drawerContent={(props) => (
          <CustomDrawer
            initialParams={{
              setIsLoggedIn: changeLoginState,
            }}
            {...props}
          />
        )}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Pickup" component={PickupScreen} />
        <Drawer.Screen name="Delivery" component={DeliveryScreen} />
        <Drawer.Screen name="Return" component={ReturnScreen} />
      </Drawer.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {loading ? (
        <Stack.Navigator>
          <Stack.Screen
            component={LoadingScreen}
            options={{
              headerShown: false,
            }}
            name="Loading"
            initialParams={{
              setLoading: changeLoading,
              setIsLoggedIn: changeLoginState,
            }}
          />
        </Stack.Navigator>
      ) : isLoggedIn ? (
        <Stack.Navigator>
          <Stack.Screen
            component={DrawerStack}
            options={{
              headerShown: false,
            }}
            name="Home"
          />
          <Stack.Screen
            name="Address"
            component={AddressScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ItemDetails"
            component={ItemDetailsScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="ItemsImages"
            component={ItemsImagesScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      ) : (
        <>
          <Stack.Navigator>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name="Login"
              component={LoginScreen}
            />
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              initialParams={{
                setIsLoggedIn: changeLoginState,
              }}
              name="Verification"
              component={VerificationScreen}
            />
          </Stack.Navigator>
        </>
      )}
    </NavigationContainer>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => ({
  setBaseUrl: (url) => dispatch(AuthActions.setBaseUrl(url)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
