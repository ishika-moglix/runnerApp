import React, { useState } from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";

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

export default Routes = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const changeLoginState = () => {
    setIsLoggedIn(!isLoggedIn);
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
      {isLoggedIn ? (
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
