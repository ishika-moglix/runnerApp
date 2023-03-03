import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Icon, Footer, FooterTab, Button,Toast } from "native-base";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Modal from "react-native-modal";
import { markDelivered, uploadImages } from "../../services/tasks";
import styles from "./style";

export default ImageUploaderModal = (props) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const { toggleModal, isModalVisible, deliveryTaskItemId, navigation, type } =props;

  useEffect(() => {
    console.log("final",props);
    if (type == "Delivery" || type == "SupplierReturn") {
      if(props.status !="DELIVERED")
      markDelivery();
    }
  }, []);

  const markDelivery = async () => {
    const { data } = await markDelivered({
      deliveryTaskItemId,
    });
    console.log(data);
    if(data.code!=200){
      Toast.show({
        text: data.message,
        buttonText: "Okay",
        duration: 2500,
        style: { margin: 20 },
      });
      props.navigation.goBack();
    }else{
      Toast.show({
        text: data.message,
        buttonText: "Okay",
        duration: 2500,
        style: { margin: 20 },
      });
    }
  };

  const openSelector = (selection) => {
    switch (selection) {
      case "Camera":
        launchCamera({ includeBase64: true }, (res) => {
          console.log(res, "ferfe");
          if (!res.didCancel) {
            setImages([...images, res]);
          }
        });
        return;
      case "Gallery":
        launchImageLibrary({ includeBase64: true }, (res) => {
          console.log(res, "ferfe");
          if (!res.didCancel) {
            setImages([...images, res]);
          }
        });
        return;
      default:
        launchCamera({ includeBase64: true }, (res) => {
          console.log(res, "ferfe");
          if (!res.didCancel) {
            setImages([...images, res]);
          }
        });
        return;
    }
  };

  const renderOptions = () => {
    return (
      <View style={styles.uploadWrap}>
        <TouchableOpacity
          onPress={() => openSelector("Camera")}
          style={styles.CameraBtnWrap}
        >
          <Icon style={styles.cameraIcon} name={"camera"} type={"Entypo"} />
          <Text style={styles.cameraText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openSelector("Gallery")}
          style={styles.galleryBtnWrap}
        >
          <Icon style={styles.cameraIcon} name={"upload"} type={"AntDesign"} />
          <Text style={styles.cameraText}>Upload Document</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onUpload = async () => {
    try {
      let dd = (new Date().getDate() < 10 ? "0" : "") + new Date().getDate();
      let MM =
        (new Date().getMonth() + 1 < 10 ? "0" : "") +
        (new Date().getMonth() + 1);
      let yyyy = new Date().getFullYear();
      setLoading(true);
      const { data } = await uploadImages({
        podDate: dd + "-" + MM + "-" + yyyy,
        deliveryTaskItemId,
        images: images.map((_) => `data:${_.type};base64,${_.base64}`),
      });
      console.log(data, "cerveerver");
      if (data.success) {
        setLoading(false);
        toggleModal();
        navigation.navigate("Delivery");
      } else {
        Toast.show({
          text: data.message || "Something went wrong!",
          buttonText: "Okay",
          duration: 1500,
          style: { margin: 20 },
        });
        setLoading(false);
        toggleModal();
      }
    } catch (e) {
      setLoading(false);
    }
  };

  const renderFooter = () => {
    return (
      <Footer style={styles.footerCss}>
        <FooterTab style={styles.footerTabCss}>
          <Button
            onPress={() => navigation.navigate("Home")}
            disabled={loading}
            block
            style={styles.EnabledBtn}
          >
            <Text style={styles.btntext}>UPLOAD LATER</Text>
          </Button>
          <Button
            onPress={onUpload}
            disabled={!images.length || loading}
            block
            style={
              images.length && !loading ? styles.EnabledBtn : styles.disabledBtn
            }
          >
            {loading && (
              <ActivityIndicator
                color={"#fff"}
                size={"small"}
                style={{ marginRight: 12 }}
              />
            )}
            <Text style={styles.btntext}>UPLOAD</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  };

  const removeImage = (uri) => {
    let data = images.filter((_) => _.uri !== uri);
    setImages(data);
  };

  return (
    <Modal
      onBackButtonPress={toggleModal}
      onBackdropPress={toggleModal}
      isVisible={isModalVisible}
      style={{
        margin: 0,
      }}
    >
      <View style={styles.modalWrap}>
        <View style={styles.modalTopWrap}>
          <Text style={styles.headingText}>
            Please Upload or take photo of the document
          </Text>
          {/* <TouchableOpacity onPress={toggleModal}>
            <Icon
              name={"close-circle"}
              style={styles.closeIcon}
              type={"MaterialCommunityIcons"}
            />
          </TouchableOpacity> */}
        </View>
        <ScrollView style={styles.containercss}>
          <View>{renderOptions()}</View>
          <ScrollView
            horizontal={true}
            contentContainerStyle={{
              paddingVertical: 20,
              marginTop: 20,
            }}
            showsHorizontalScrollIndicator={false}
          >
            {images.map((image, imageKey) => (
              <View key={imageKey} style={styles.imageWrap}>
                <Image
                  resizeMode={"cover"}
                  style={styles.imgCss}
                  source={{ uri: image.uri }}
                />
                <TouchableOpacity
                  onPress={() => removeImage(image.uri)}
                  style={styles.closeBtn}
                >
                  <Icon
                    name={"close-circle"}
                    style={styles.closeSmallIcon}
                    type={"MaterialCommunityIcons"}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </ScrollView>
        {renderFooter()}
      </View>
    </Modal>
  );
};
