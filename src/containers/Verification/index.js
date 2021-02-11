import React, { useState } from "react";
import {
  View,
  Image,
  Dimensions,
  Text,
  ActivityIndicator,
  AsyncStorage,
} from "react-native";
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
import { login } from "../../services/auth";
import DeviceInfo from "react-native-device-info";

export default VerificationScreen = (props) => {
  const [otp, setOtp] = useState("");
  const [loader, setLoader] = useState(false);

  const onVerify = async () => {
    if (otp.length === 6) {
      try {
        setLoader(true);
        const { data } = {
          data: {
            success: true,
            code: 200,
            message: "OTP successfully verified.",
            data: {
              userId: 545,
              userEmail: "anuj@g.com",
              userName: "anuj",
              userPhone: 8383822601,
              token:
                "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjU0NSwiZXhwIjoxNjEzMTk3MzYwfQ.1m0Sah41QZQZwUQqKCIdtrtGzp1Orn12MQzz7hlYzlY",
            },
          },
        };
        // await login({
        //   id: props.route.params.id,
        //   imei: [],
        //   Device_id: DeviceInfo.getUniqueId(),
        //   otp,
        // });
        console.log(data.data.token);
        AsyncStorage.setItem("token", data.data.token);
        console.log(data);
        setLoader(false);
        if (data && data.success) {
          props.route.params.setIsLoggedIn(true);
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
          <Title style={{ textAlign: "center" }}>Verification</Title>
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
            flex: 1,
            padding: Dimensions.get("window").width * 0.1,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-end",
              justifyContent: "space-between",
            }}
          >
            <Label style={{ marginBottom: 12 }}>
              Enter OTP sent to {"\n"}
              +91 {props.route.params.phone}
            </Label>
            <Button transparent onPress={() => props.navigation.goBack()}>
              <Text style={{ color: "#097EFF" }}>Edit Number</Text>
            </Button>
          </View>
          <Item regular>
            <Input
              keyboardType={"numeric"}
              maxLength={6}
              value={otp}
              onChangeText={(text) => setOtp(text)}
              style={{ textAlign: "center" }}
              placeholder="-      -      -      -      -      -"
            />
          </Item>
          <Button
            onPress={onVerify}
            block
            disabled={loader || otp.length !== 6}
            style={{
              backgroundColor:
                !loader && otp.length === 6 ? "#2680EB" : "#C3C3C3",
              marginTop: 20,
            }}
          >
            <Text style={{ color: "#fff" }}>VERIFY</Text>
            {loader ? (
              <ActivityIndicator color={"#fff"} style={{ marginLeft: 20 }} />
            ) : null}
          </Button>
          <Button
            style={{ marginTop: 20, alignSelf: "center" }}
            transparent
            // onPress={}
          >
            <Text style={{ color: "#097EFF" }}>Resend OTP</Text>
          </Button>
          <Text
            style={{
              lineHeight: 20,
              alignSelf: "center",
              textAlign: "center",
              position: "absolute",
              bottom: 40,
            }}
          >
            By continuing, you agree to our {"\n"}
            <Text style={{ color: "#097EFF" }}>Privacy Policy</Text> and{" "}
            <Text style={{ color: "#097EFF" }}>Terms and Condition</Text>
          </Text>
        </View>
      </View>
    </Container>
  );
};
