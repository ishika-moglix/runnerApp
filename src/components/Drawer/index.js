import { Button } from "native-base";
import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  AsyncStorage,
} from "react-native";

export default CustomDrawer = (props) => {
  const onLogout = () => {
    AsyncStorage.removeItem("token");
    props.initialParams.setIsLoggedIn();
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#F0F0F0",
      }}
    >
      <View
        style={{
          width: "100%",
          padding: 12,
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Image
          resizeMode={"contain"}
          source={require("../../assets/moglix-logo.jpg")}
          style={{ width: "40%", height: 50 }}
        />
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
          }}
        >
          Runner App
        </Text>
      </View>
      <View
        style={{
          marginVertical: 20,
          marginLeft: 20,
        }}
      >
        {props.state.routeNames.map((route, routeKey) => (
          <TouchableOpacity
            onPress={() => props.navigation.navigate(route)}
            style={{
              paddingVertical: 12,
              borderBottomColor: "#AAAAAA",
              borderBottomWidth:
                routeKey + 1 === props.state.routeNames.length ? 0 : 1,
            }}
            key={routeKey}
          >
            <Text
              style={{
                fontSize: 20,
              }}
            >
              {route}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <Button
        onPress={onLogout}
        style={{
          position: "absolute",
          bottom: 20,
          left: "10%",
          width: "80%",
          borderColor: "#0D80FF",
        }}
        bordered
        block
      >
        <Text
          style={{
            color: "#0D80FF",
          }}
        >
          Logout
        </Text>
      </Button>
    </View>
  );
};
