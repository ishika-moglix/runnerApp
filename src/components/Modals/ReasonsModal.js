import React, { useState } from "react";
import Modal from "react-native-modal";
import { View, TouchableOpacity, Text, Dimensions } from "react-native";
import { Icon } from "native-base";
import styles from './style'

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
       style={styles.modalWrap}
      >
        <View
            style={styles.modalTopWrap}
        >
          <Text style={styles.headingText}>{title}</Text>
          <TouchableOpacity onPress={toggleModal}>
            <Icon
              name={"close-circle"}
              style={styles.closeIcon}
              type={"MaterialCommunityIcons"}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.radioWrap}>
          {options.map((option, optionKey) => (
            <TouchableOpacity
              key={optionKey}
              onPress={() => setSelected(option.value)}
              style={styles.radioBtnWrap}
            >
              <Icon
                style={styles.radioBtn}
                name={
                  selected == option.value
                    ? "circle-slice-8"
                    : "checkbox-blank-circle-outline"
                }
                type={"MaterialCommunityIcons"}
              />
              <Text style={styles.radioText}>
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
