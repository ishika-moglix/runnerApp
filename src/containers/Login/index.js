import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Dimensions,
  Text,
  ActivityIndicator,
  PermissionsAndroid,
  Alert,
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
import { sendOtp, uploadDeviceId } from "../../services/auth";
import Modal from "react-native-modal";
import styles from "./style";
import DeviceInfo from "react-native-device-info";

export default LoginScreen = (props) => {
  const [phone, setPhone] = useState("");
  const [loader, setLoader] = useState(false);
  const [UidModal, setUidModal] = useState(false);
  const [UserID, setUserID] = useState("");
  useEffect(() => {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
  }, []);

  const onUploadDeviceId = async (id) => {
    const { data } = await uploadDeviceId({
      deviceId: DeviceInfo.getUniqueId(),
      phoneNumber: phone,
    });
    if (data) {
      Toast.show({
        text: data.message,
        buttonText: "Okay",
        duration: 1500,
        style: { margin: 20 },
      });
      props.navigation.navigate("Verification", {
        phone,
        id,
      });
    }
  };
  const onAlreadyUploaded = () => {
    props.navigation.navigate("Verification", { phone, id: UserID });
    setUidModal(false);
  };
  const onNext = async () => {
    if (phone.length) {
      try {
        setLoader(true);
        const { data, error } = await sendOtp(phone);
        setLoader(false);
        if (data && data.success) {
          console.log(data);
          setUidModal(true);
          setUserID(data.data.id);
          // Alert.alert(
          //   "Some Issue in Getting your details",
          //   `Please upload code ${DeviceInfo.getUniqueId()} for Login`,
          //   [
          //     {
          //       text: "Upload",
          //       onPress: () => onUploadDeviceId(data.data.id),
          //     },
          //     {
          //       text: "Already Uploaded, Login Now",
          //       onPress: () =>
          //         props.navigation.navigate("Verification", {
          //           phone,
          //           id: data.data.id,
          //         }),
          //       style: "cancel",
          //     },
          //   ]
          // );
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
            text: data.message || "Something went wrong!",
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
    <Container style={styles.ContainerCss}>
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
          <Title style={{ textAlign: "center" }}>Login</Title>
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

          <View style={styles.inputErrorWrap}>
            <View style={styles.ItemWrap}>
              <Item floatingLabel style={styles.ItemCss}>
                <Label style={styles.LabelCss}>Enter your mobile number</Label>
                <Input
                  value={phone}
                  onChangeText={(text) => setPhone(text)}
                  keyboardType={"numeric"}
                  // maxLength={10}
                  style={styles.inputCss}
                />
              </Item>
            </View>
          </View>
          <Button
            onPress={onNext}
            block
            disabled={loader}
            style={styles.btnStyle}
          >
            <Text style={styles.btnText}>Continue</Text>
            {loader ? (
              <ActivityIndicator color={"#fff"} style={{ marginLeft: 20 }} />
            ) : null}
          </Button>
        </View>
      </View>
      <Modal
        isVisible={UidModal}
        style={{
          margin: 0,
          padding: 0,
        }}
      >
        <View style={styles.ModalContainer}>
          <Text style={styles.issueTxt}>
            Some Issue in Getting your details
          </Text>
          <Text style={styles.uploadUidTxt}>
            Please upload code{" "}
            <Text style={styles.uidtxt}> ${DeviceInfo.getUniqueId()} </Text>for
            Login,
          </Text>
          <TouchableOpacity
            onPress={() => onAlreadyUploaded()}
            style={styles.uploadBtn}
          >
            <Text style={styles.uploadBtnTxt1}>Already Uploaded,</Text>
            <Text style={styles.uploadBtnTxt2}> Login Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              onUploadDeviceId(UserID), setUidModal(false);
            }}
            style={styles.uploadBtn1}
          >
            <Text style={styles.uploadBtnTxt}>Upload</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </Container>
  );
};
