import React from "react";
import { Icon, View } from "native-base";
import { Text, TouchableOpacity } from "react-native";
import styles from "./style";

export default CommonCardItem = (props) => {
  const { item } = props;
  return (
    <View style={styles.deliveryItemsWrap}>
      <TouchableOpacity
        style={styles.checkboxWrap}
        onPress={() => props.onCheck(props.id)}
      >
        <Icon
          type={"MaterialCommunityIcons"}
          name={
            props.item.checked ? "checkbox-marked" : "checkbox-blank-outline"
          }
          style={
            props.item.checked ? styles.activeCheckBox : styles.inActiveCheckBox
          }
        />
      </TouchableOpacity>
      {/* <View> */}
      <Text style={styles.itemText}>{item.name}</Text>
      {/* <Text style={styles.itemText}>Brand: {item.brand}</Text> */}
      {/* </View> */}
      <Text style={styles.quantityText}>Qty: {item.inputQuantity}</Text>
    </View>
  );
};
