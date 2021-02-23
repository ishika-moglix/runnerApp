import React, { useState } from "react";
import { View, Image, Dimensions, Text, ActivityIndicator } from "react-native";
import {
  Container,
  Header,
  Title,
  Item,
  Input,
  Label,
  Toast,
  Button,
} from "native-base";
import { sendOtp } from "../../services/auth";

export default LoginScreen = (props) => {
  const [phone, setPhone] = useState("9711572214");
  const [loader, setLoader] = useState(false);

  const onNext = async () => {
    if (phone.length == 10) {
      try {
        setLoader(true);
        const { data, error } = await sendOtp(phone);
        setLoader(false);
        if (data && data.success) {
          props.navigation.navigate("Verification", {
            phone,
            id: data.data.id,
          });
          Toast.show({
            text: data.message,
            buttonText: "Okay",
            duration: 1500,
            style: { margin: 20 },
          });
        } else if (data && data.message && !data.success) {
          Toast.show({
            text: data.message,
            buttonText: "Okay",
            duration: 1500,
            style: { margin: 20 },
          });
        } else {
          Toast.show({
            text: "Something went wrong!",
            buttonText: "Okay",
            duration: 1500,
            style: { margin: 20 },
          });
        }
      } catch (e) {
        setLoader(false);
        Toast.show({
          text: "Something went wrong!",
          buttonText: "Okay",
          duration: 1500,
          style: { margin: 20 },
        });
      }
    }
  };

  return (
    <Container>
      <Header
        androidStatusBarColor={"#D9232D"}
        style={{
          backgroundColor: "#D9232D",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            textAlign: "center",
          }}
        >
          <Title style={{ textAlign: "center" }}>Login</Title>
        </View>
      </Header>
      <View style={{ flex: 1 }}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            resizeMode={"contain"}
            source={require("../../assets/moglix-logo.jpg")}
            style={{
              width: Dimensions.get("window").width * 0.4,
              height: Dimensions.get("window").width * 0.3,
            }}
          />
        </View>
        <View
          style={{
            padding: Dimensions.get("window").width * 0.1,
          }}
        >
          <Label style={{ marginBottom: 12 }}>Enter your mobile number</Label>
          <Item regular>
            <Text style={{ marginLeft: 12 }}>+91</Text>
            <Input
              value={phone}
              onChangeText={(text) => setPhone(text)}
              keyboardType={"numeric"}
              maxLength={10}
            />
          </Item>
          <Button
            onPress={onNext}
            block
            disabled={loader}
            style={{ backgroundColor: "#2680EB", marginTop: 20 }}
          >
            <Text style={{ color: "#fff" }}>NEXT</Text>
            {loader ? (
              <ActivityIndicator color={"#fff"} style={{ marginLeft: 20 }} />
            ) : null}
          </Button>
        </View>
      </View>
    </Container>
  );
};
