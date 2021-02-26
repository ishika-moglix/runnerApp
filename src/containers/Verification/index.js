import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Dimensions,
  Text,
  ActivityIndicator,
  AsyncStorage,
  TouchableOpacity,
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
import { login, sendOtp } from "../../services/auth";
import DeviceInfo from "react-native-device-info";
import styles from "./style";
import Colors from "../../Theme/Colors";

export default VerificationScreen = (props) => {
  const [otp, setOtp] = useState("");
  const [resendOtp, setResendOtp] = useState(false);
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    resendOtpTimer();
  }, []);

  const resendOtpTimer = () => {
    setResendOtp(false);
    setTimeout(() => {
      setResendOtp(true);
    }, 30000);
  };

  const onResendOtp = async () => {
    try {
      const { data, error } = await sendOtp(props.route.params.phone);
      resendOtpTimer();
      if (data && data.success) {
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
      Toast.show({
        text: "Something went wrong!",
        buttonText: "Okay",
        duration: 1500,
        style: { margin: 20 },
      });
    }
  };

  const onVerify = async () => {
    if (otp.length === 6) {
      try {
        setLoader(true);
        const { data } = await login({
          id: props.route.params.id,
          imei: ['a9245b9bc9af6670'],
          // device_id: DeviceInfo.getUniqueId(),
           device_id: 'a9245b9bc9af6670',
          otp,
        });
        AsyncStorage.setItem("token", data.data.token);
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
      {/* <Header
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
      </Header> */}
      <View style={{ flex: 1 }}>
        <View style={styles.logoWrap}>
          <Image
            resizeMode={"contain"}
            source={require("../../assets/RunnerLogo.png")}
            style={styles.logoImage}
          />
        </View>
        <View style={styles.IllustrationWrap}>
          <Image
            resizeMode={"contain"}
            source={require("../../assets/LoginIllustration.png")}
            style={styles.IllustrationImg}
          />
        </View>
        <View style={styles.signInWrap}>
          <Text style={styles.headingText}>Sign In</Text>
          <View style={styles.row}>
            <Text style={styles.numbertext}>
              +91 {props.route.params.phone}
            </Text>
            <TouchableOpacity
              transparent
              onPress={() => props.navigation.goBack()}
            >
              <Text style={styles.changetext}>CHANGE</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputErrorWrap}>
            <View
              style={[
                styles.ItemWrap,
                otp.length === 6 ? styles.SuccessItemWrap : null,
              ]}
            >
              <Item floatingLabel style={styles.ItemCss}>
                <Label style={styles.LabelCss}>Enter Otp</Label>
                <Input
                  keyboardType={"numeric"}
                  maxLength={6}
                  value={otp}
                  onChangeText={(text) => setOtp(text)}
                  placeholder="-      -      -      - "
                  style={styles.inputCss}
                  autoFocus={true}
                />
              </Item>
              {/* <TouchableOpacity style={styles.Timerbtn}>
                <Text style={styles.TimerBtnText}>00.25</Text>
              </TouchableOpacity> */}

              {otp.length === 6 ? (
                <TouchableOpacity style={styles.SuccessBtn}>
                  <Image
                    resizeMode={"contain"}
                    source={require("../../assets/Check.png")}
                    style={styles.SuccessImg}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
            <TouchableOpacity
              style={styles.resendOtpBTn}
              transparent
              onPress={onResendOtp}
              disabled={!resendOtp}
            >
              <Text
                style={[
                  styles.changetext,
                  { color: resendOtp ? Colors.RedThemeColor : "#C3C3C3" },
                ]}
              >
                Resend OTP
              </Text>
              {/* <Text style={styles.changetext}>Resend OTP</Text> */}
            </TouchableOpacity>
          </View>

          <Button
            onPress={onVerify}
            block
            disabled={loader || otp.length !== 6}
            style={
              !loader && otp.length === 6 ? styles.btnStyle : styles.disabledBtn
            }
          >
            <Text style={styles.btnText}>CONTINUE</Text>
            {loader ? (
              <ActivityIndicator color={"#fff"} style={{ marginLeft: 20 }} />
            ) : null}
          </Button>

          {/* <Text
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
          </Text> */}
        </View>
      </View>
    </Container>
  );
};
