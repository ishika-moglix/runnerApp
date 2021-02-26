import React from "react";
import { Dimensions, View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Icon } from "native-base";

const data = [
  {
    label: "Future PO",
    route: "FuturePO",
  },
  {
    label: "Upload invoice",
    route: "UploadInvoice",
  },
];

export default HomePageMenuModal = (props) => {
  const { isVisible, toggleModal, navigation } = props;

  return (
    <Modal
      isVisible={isVisible}
      onBackButtonPress={toggleModal}
      onBackdropPress={toggleModal}
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
        {data.map((option, optionKey) => (
          <TouchableOpacity
            key={optionKey}
            onPress={() => {
              toggleModal();
              navigation.navigate(option.route);
            }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 16,
              borderBottomColor: "#e7e7e7",
              borderBottomWidth: 0.8,
            }}
          >
            <Icon
              style={{ color: "#D9232D" }}
              name={
                //   selected == option.value
                //     ?
                // "circle-slice-8"
                // :
                "checkbox-blank-circle-outline"
              }
              type={"MaterialCommunityIcons"}
            />
            <Text style={{ marginLeft: 12, fontSize: 16, width: "90%" }}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </Modal>
  );
};
