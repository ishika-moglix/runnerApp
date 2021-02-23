import React, { useEffect } from "react";
import { Container } from "native-base";
import { ActivityIndicator, AsyncStorage } from "react-native";

export default LoadingScreen = (props) => {
  useEffect(() => {
    AsyncStorage.getItem("token")
      .then((res) => {
        if (res) {
          props.route.params.setIsLoggedIn();
          props.route.params.setLoading();
        } else {
          props.route.params.setLoading();
        }
      })
      .catch((e) => {
        props.route.params.setLoading();
      });
  }, []);

  return (
    <Container style={{ flex: 1 }}>
      <ActivityIndicator style={{ alignSelf: "center" }} />
    </Container>
  );
};
