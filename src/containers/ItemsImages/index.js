import React, { useState } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import {
  Container,
  Icon,
  Card,
  CardItem,
  Footer,
  FooterTab,
  Button,
} from "native-base";
import Header from "../../components/Header";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";

export default ItemsImages = (props) => {
  const [images, setImages] = useState([]);

  const goBack = () => {
    props.navigation.goBack();
  };

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
            width: "48%",
            borderColor: "#CCCCCC",
            borderWidth: 0.5,
            padding: 20,
            // margin: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name={"camera"} type={"MaterialCommunityIcons"} />
          <Text
            style={{
              color: "#2680EB",
            }}
          >
            Take Photo
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => openSelector("Gallery")}
          style={{
            width: "48%",
            borderColor: "#CCCCCC",
            borderWidth: 0.5,
            padding: 20,
            // margin: 20,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Icon name={"upload"} type={"MaterialCommunityIcons"} />
          <Text
            style={{
              color: "#2680EB",
            }}
          >
            Upload Document
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderFooter = () => {
    return (
      <Footer
        style={{
          backgroundColor: "#fff",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FooterTab>
          <Button
            onPress={() => props.navigation.navigate("Home")}
            disabled={!images.length}
            block
            style={{
              backgroundColor: images.length ? "#2680EB" : "#848484",
            }}
          >
            <Text style={{ fontSize: 18, color: "#fff" }}>UPLOAD</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  };

  return (
    <Container
      style={{
        flex: 1,
        backgroundColor: "#F2F2F2",
      }}
    >
      <Header
        headertext={props.route.params.company}
        leftComponent={() => (
          <TouchableOpacity onPress={goBack}>
            <Icon
              name={"chevron-left"}
              style={{ color: "#fff" }}
              type={"MaterialCommunityIcons"}
            />
          </TouchableOpacity>
        )}
        rightComponent={() => (
          <TouchableOpacity>
            <Icon
              name={"magnify"}
              style={{ color: "#fff" }}
              type={"MaterialCommunityIcons"}
            />
          </TouchableOpacity>
        )}
      />
      <ScrollView>
        <Card
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <CardItem
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 0,
              paddingRight: 0,
              borderBottomColor: "#E0E0E0",
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Upload Documents</Text>
          </CardItem>

          <CardItem
            style={{
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 0,
              paddingRight: 0,
            }}
          >
            {images.length ? (
              <View
                style={{
                  width: "100%",
                  flexDirection: "column",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    flexWrap: "wrap",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  {images.map((image, imageKey) => (
                    <Image
                      resizeMode={"cover"}
                      style={{
                        height: 250,
                        width: "48%",
                        marginTop: 20,
                      }}
                      source={{ uri: image.uri }}
                      key={imageKey}
                    />
                  ))}
                </View>
                {renderOptions()}
              </View>
            ) : (
              renderOptions()
            )}
          </CardItem>
        </Card>
      </ScrollView>
      {renderFooter()}
    </Container>
  );
};
