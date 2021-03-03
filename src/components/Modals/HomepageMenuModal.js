import React from "react";
import { Dimensions, View, Text, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Icon } from "native-base";
import styles from './style'

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
        style={styles.modalWrap}
      >
        <View style={styles.radioWrap}>
        {data.map((option, optionKey) => (
          <TouchableOpacity
            key={optionKey}
            onPress={() => {
              toggleModal();
              navigation.navigate(option.route);
            }}
            style={styles.radioBtnWrap}
          >
            <Icon
             style={styles.radioBtn}
              name={
                //   selected == option.value
                //     ?
                // "circle-slice-8"
                // :
                "checkbox-blank-circle-outline"
              }
              type={"MaterialCommunityIcons"}
            />
            <Text style={styles.radioText}>
              {option.label}
            </Text>
          </TouchableOpacity>
          
        ))}
        </View>
      </View>
    </Modal>
  );
};
