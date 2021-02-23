import React, { useState } from "react";
import Modal from "react-native-modal";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import { Icon } from "native-base";

export default ReasonModal = (props) => {
  const [selected, setSelected] = useState("");

  const { toggleModal, isModalVisible, title, options } = props;
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
          <Text style={{ fontSize: 16 }}>{title}</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Icon
              name={"close-circle"}
              style={{ color: "#3C3C3C", fontSize: 22 }}
              type={"MaterialCommunityIcons"}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 32 }}>
          {options.map((option, optionKey) => (
            <TouchableOpacity
              key={optionKey}
              onPress={() => setSelected(option.value)}
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
                  selected == option.value
                    ? "circle-slice-8"
                    : "checkbox-blank-circle-outline"
                }
                type={"MaterialCommunityIcons"}
              />
              <Text style={{ marginLeft: 12, fontSize: 16, width: "90%" }}>
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        {/* <Button block style={{ backgroundColor: "#0D80FF", marginTop: 40 }}>
          <Text style={{ color: "#fff" }}>SUBMIT</Text>
        </Button> */}
      </View>
    </Modal>
  );
};
