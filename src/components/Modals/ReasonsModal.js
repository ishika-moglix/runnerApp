import React, { useState } from "react";
import Modal from "react-native-modal";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import { Button, Icon } from "native-base";

export default ReasonModal = (props) => {
  const [selected, setSelected] = useState("");

  const { toggleModal, isModalVisible, title, options } = props;
  return (
    <Modal
      onBackButtonPress={toggleModal}
      onBackdropPress={toggleModal}
      isVisible={isModalVisible}
    >
      <View
        style={{
          width: Dimensions.get("window").width * 0.8,
          alignSelf: "center",
          borderRadius: 4,
          padding: 20,
          backgroundColor: "#fff",
        }}
      >
        <Text style={{ fontSize: 16, marginBottom: 20 }}>{title}</Text>
        {options.map((option, optionKey) => (
          <TouchableOpacity
            key={optionKey}
            onPress={() => setSelected(option.value)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 20,
            }}
          >
            <Icon
              style={{ color: "#0D80FF" }}
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
        <Button block style={{ backgroundColor: "#0D80FF", marginTop: 40 }}>
          <Text style={{ color: "#fff" }}>SUBMIT</Text>
        </Button>
      </View>
    </Modal>
  );
};
