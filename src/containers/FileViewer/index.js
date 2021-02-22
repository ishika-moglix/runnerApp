import { connect } from "react-redux";
import { Container, Icon } from "native-base";
import { TouchableOpacity, View, Text } from "react-native";
import React from "react";
import PDFView from "react-native-view-pdf";
import Header from "../../components/Header";

const FileViewerScreen = (props) => {
  const goBack = () => {
    props.navigation.goBack();
  };

  return (
    <Container
      style={{
        flex: 1,
      }}
    >
      <Header
        leftComponent={() => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon
              onPress={goBack}
              name={"arrow-left"}
              type={"MaterialCommunityIcons"}
            />
            <Text
              style={{
                width: "100%",
                marginLeft: 12,
                fontSize: 16,
              }}
            >
              PDF Viewer
            </Text>
          </View>
        )}
        rightComponent={() => (
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Profile")}
            style={{
              alignItems: "center",
            }}
          >
            <Icon
              name={"account-circle"}
              type={"MaterialCommunityIcons"}
              style={{ color: "#000" }}
            />
            {props.home.getIn(["profile", "data", "name"]) ? (
              <Text
                style={{
                  fontSize: 10,
                }}
              >
                {props.home.getIn(["profile", "data", "name"])}
              </Text>
            ) : null}
          </TouchableOpacity>
        )}
      />
      <PDFView
        style={{ flex: 1, backgroundColor: "#F7F7FA" }}
        resource={props.route.params.pdf}
        resourceType={"url"}
      />
    </Container>
  );
};

const mapStateToProps = (state) => ({
  home: state.home,
});

export default connect(mapStateToProps, null)(FileViewerScreen);
