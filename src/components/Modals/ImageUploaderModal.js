import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { Icon, Footer, FooterTab, Button } from "native-base";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import Modal from "react-native-modal";
import styles from './style'

export default ImageUploaderModal = (props) => {
  const [images, setImages] = useState([]);

  const { toggleModal, isModalVisible } = props;

  const openSelector = (selection) => {
    switch (selection) {
      case "Camera":
        launchCamera({}, (res) => {
          setImages([...images, res]);
        });
        return;
      case "Gallery":
        launchImageLibrary({}, (res) => {
          setImages([...images, res]);
        });
        return;
      default:
        launchCamera({}, (res) => {
          setImages([...images, res]);
        });
        return;
    }
  };

  const renderOptions = () => {
    return (
      <View style={styles.uploadWrap}
      >
        <TouchableOpacity
          onPress={() => openSelector("Camera")}
          style={styles.CameraBtnWrap}
        >
          <Icon
            style={styles.cameraIcon}
            name={"camera"}
            type={"Entypo"}
          />
          <Text
            style={styles.cameraText}
          >
            Take Photo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openSelector("Gallery")}
          style={styles.galleryBtnWrap}
        >
          <Icon
            style={styles.cameraIcon}
            name={"upload"}
            type={"AntDesign"}
          />
          <Text
            style={styles.cameraText}
          >
            Upload Document
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderFooter = () => {
    return (
      <Footer
        style={styles.footerCss}
      >
        <FooterTab style={styles.footerTabCss}>
          <Button
            onPress={() => props.navigation.navigate("Home")}
            disabled={!images.length}
            block
            style={images.length ? styles.EnabledBtn : styles.disabledBtn 
            }
          >
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
      <View
        style={styles.modalWrap}
      >
        <View
          style={styles.modalTopWrap}
        >
          <Text style={styles.headingText}>
            Please Upload or take photo of the document
          </Text>
          <TouchableOpacity onPress={toggleModal}>
            <Icon
              name={"close-circle"}
              style={styles.closeIcon}
              type={"MaterialCommunityIcons"}
            />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.containercss}>
          <View>
            {renderOptions()}
          </View>
            <ScrollView
              horizontal={true}
              contentContainerStyle={{
                paddingVertical: 20,
                marginTop: 20,
              }}
              showsHorizontalScrollIndicator={false}
            >
              {images.map((image, imageKey) => (
                <View
                  key={imageKey}
                  style={styles.imageWrap}
                >
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
