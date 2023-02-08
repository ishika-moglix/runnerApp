import React, { useState } from "react";
import Modal from "react-native-modal";
import {
  View,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Icon, Button, Title } from "native-base";
import styles from "./style";
import Colors from "../../Theme/Colors";
import moment from "moment";
import DateTimePicker from "@react-native-community/datetimepicker";

export default ReasonModal = (props) => {
  const [selected, setSelected] = useState("");
  const [nextPickupDate, setNextPickupDate] = useState();
  const [show, setShow] = useState(false);

  const {
    toggleModal,
    onReasonSelect,
    reasonLoading,
    isModalVisible,
    title,
    options,
    type,
  } = props;

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || new Date();
    setShow(Platform.OS === "ios");
    if (moment(moment(new Date())).diff(moment(currentDate))) {
      setNextPickupDate(currentDate);
    }
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
      <View style={styles.modalWrap}>
        <View style={styles.modalTopWrap}>
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
              key={option.id}
              onPress={() => setSelected(option.id)}
              style={styles.radioBtnWrap}
            >
              <Icon
                style={styles.radioBtn}
                name={
                  selected == option.id
                    ? "circle-slice-8"
                    : "checkbox-blank-circle-outline"
                }
                type={"MaterialCommunityIcons"}
              />
              <Text style={styles.radioText}>{option.text}</Text>
            </TouchableOpacity>
          ))}
        </View>
        {type == "Return" ? (
          <TouchableOpacity onPress={() => setShow(true)}>
            <Title style={styles.dateText}>
              Next Pickup Date:{" "}
              {moment(nextPickupDate || new Date()).format("DD/MMM/YY")}
            </Title>
          </TouchableOpacity>
        ) : null}
        <Button
          block
          disabled={
            props.type == "Delivery" || props.type == "SupplierReturn"
              ? !selected || reasonLoading
              : !selected || reasonLoading || !nextPickupDate
          }
          onPress={() => onReasonSelect(selected, nextPickupDate)}
          style={{
            backgroundColor: Colors.RedThemeColor,
            marginTop: 40,
            margin: 12,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {reasonLoading && (
            <ActivityIndicator
              color={"#fff"}
              size={"small"}
              style={{ marginRight: 12 }}
            />
          )}
          <Text style={{ color: "#fff" }}>SUBMIT</Text>
        </Button>
        {show && (
          <DateTimePicker
            minimumDate={new Date()}
            mode={"date"}
            value={new Date()}
            display="default"
            onChange={onChange}
          />
        )}
      </View>
    </Modal>
  );
};
