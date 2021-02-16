import { Container, Icon } from "native-base";
import { TouchableOpacity } from "react-native";
import React from "react";
import PDFView from "react-native-view-pdf";
import Header from "../../components/Header";

export default FileViewerScreen = (props) => {
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
          <TouchableOpacity onPress={goBack}>
            <Icon
              name={"chevron-left"}
              style={{ color: "#fff" }}
              type={"MaterialCommunityIcons"}
            />
          </TouchableOpacity>
        )}
      />
      <PDFView
        style={{ flex: 1 }}
        resource={props.route.params.pdf}
        resourceType={"url"}
      />
    </Container>
  );
};
