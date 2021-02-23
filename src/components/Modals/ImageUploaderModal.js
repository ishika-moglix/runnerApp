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
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <TouchableOpacity
          onPress={() => openSelector("Camera")}
          style={{
            width: Dimensions.get("window").width * 0.42,
            height: Dimensions.get("window").width * 0.34,
            borderStyle: "dashed",
            backgroundColor: "#F7F7FA",
            borderColor: "#707070",
            borderWidth: 0.8,
            borderRadius: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon
            style={{
              fontSize: 38,
              width: 38,
              color: "#707070",
            }}
            name={"camera"}
            type={"MaterialCommunityIcons"}
          />
          <Text
            style={{
              color: "#707070",
            }}
          >
            Take Photo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openSelector("Gallery")}
          style={{
            width: Dimensions.get("window").width * 0.42,
            height: Dimensions.get("window").width * 0.34,
            borderColor: "#707070",
            borderWidth: 0.8,
            backgroundColor: "#F7F7FA",
            borderStyle: "dashed",
            borderRadius: 2,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon
            style={{
              fontSize: 38,
              width: 38,
              color: "#707070",
            }}
            name={"upload"}
            type={"MaterialCommunityIcons"}
          />
          <Text
            style={{
              color: "#707070",
            }}
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
        style={{
          backgroundColor: "#fff",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FooterTab
          style={{
            borderRadius: 4,
          }}
        >
          <Button
            onPress={() => props.navigation.navigate("Home")}
            disabled={!images.length}
            block
            style={{
              backgroundColor: images.length ? "#D9232D" : "#848484",
              borderRadius: 4,
            }}
          >
            <Text style={{ fontSize: 18, color: "#fff" }}>UPLOAD</Text>
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
        style={{
          width: Dimensions.get("window").width,
          alignSelf: "center",
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          padding: 20,
          position: "absolute",
          bottom: 0,
          backgroundColor: "#fff",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 16, width: "70%" }}>
            Please Upload or take photo of the document
          </Text>
          <TouchableOpacity onPress={toggleModal}>
            <Icon
              name={"close-circle"}
              style={{ color: "#3C3C3C", fontSize: 22 }}
              type={"MaterialCommunityIcons"}
            />
          </TouchableOpacity>
        </View>
        <ScrollView>
          <View
            style={
              {
                // margin: 20,
              }
            }
          >
            <View
              style={{
                // marginHorizontal: 20,
                paddingVertical: 20,
              }}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "column",
                }}
              >
                <View
                  style={{
                    width: "100%",
                  }}
                >
                  {renderOptions()}
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
                        style={{
                          marginRight: 32,
                          position: "relative",
                        }}
                      >
                        <Image
                          resizeMode={"cover"}
                          style={{
                            opacity: 0.8,
                            height: 100,
                            borderRadius: 4,
                            width: 100,
                          }}
                          source={{ uri: image.uri }}
                        />
                        <TouchableOpacity
                          onPress={() => removeImage(image.uri)}
                          style={{
                            top: -12,
                            position: "absolute",
                            right: -12,
                          }}
                        >
                          <Icon
                            name={"close-circle"}
                            style={{
                              color: "#000",
                              fontSize: 24,
                              width: 24,
                            }}
                            type={"MaterialCommunityIcons"}
                          />
                        </TouchableOpacity>
                      </View>
                    ))}
                  </ScrollView>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
        {renderFooter()}
      </View>
    </Modal>
  );
};
