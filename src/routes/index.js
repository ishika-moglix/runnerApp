import React, { useEffect, useState } from "react";

import axios from "axios";
import { connect } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AuthActions from "../redux/actions/auth";

import LoadingScreen from "../containers/Loading";
import LoginScreen from "../containers/Login";
import VerificationScreen from "../containers/Verification";
import AddressScreen from "../containers/Address";
import HomeScreen from "../containers/Home";
import PickupScreen from "../containers/Pickup";
import DeliveryScreen from "../containers/Delivery";
import ReturnScreen from "../containers/Return";
import ItemDetailsScreen from "../containers/ItemDetails";
import ItemsImagesScreen from "../containers/ItemsImages";
import SupplierReturnScreen from "../containers/SupplierReturn";
import PickupTasksScreen from "../containers/PickupTasks";
import FileViewerScreen from "../containers/FileViewer";
import ProfileScreen from "../containers/Profile";
import FuturePOScreen from "../containers/FuturePo";

const Stack = createStackNavigator();

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
            name="Home"
            options={{
              headerShown: false,
            }}
            component={HomeScreen}
          />
          <Stack.Screen
            name="Pickup"
            options={{
              headerShown: false,
            }}
            component={PickupScreen}
          />
          <Stack.Screen
            name="Delivery"
            options={{
              headerShown: false,
            }}
            component={DeliveryScreen}
          />
          <Stack.Screen
            name="Return"
            options={{
              headerShown: false,
            }}
            component={ReturnScreen}
          />
          <Stack.Screen
            name="Supplier Return"
            options={{
              headerShown: false,
            }}
            component={SupplierReturnScreen}
          />
          <Stack.Screen
            name="Address"
            component={AddressScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Pickup-Tasks"
            component={PickupTasksScreen}
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
          <Stack.Screen
            name="FileViewer"
            component={FileViewerScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="Profile"
            initialParams={{
              setIsLoggedIn: changeLoginState,
            }}
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FuturePO"
            component={FuturePOScreen}
            options={{ headerShown: false }}
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
