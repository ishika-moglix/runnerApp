import React from "react";
import { Icon, Input } from "native-base";
import { TouchableOpacity, View, Text, Picker } from "react-native";
import styles from './style'

export default PickupCarditem = (props) => {
  const { item, onIncDec, onQtyChange, onChangeReason } = props;
  return (
    <View
      style={styles.pickupCard}
    >
      <TouchableOpacity
        style={styles.checkBoxWrap}
        onPress={() => props.onCheck(props.id)}
      >
        <Icon
          type={"MaterialCommunityIcons"}
          name={
            props.item.checked ? "checkbox-marked" : "checkbox-blank-outline"
          }
          style={styles.checkboxIcon}
        />
      </TouchableOpacity>
      <View
        style={styles.pickUpRightPart}
      >
        <View
          style={{
            width: "50%",
          }}
        >
          <Text
            style={styles.PickupitemText}
          >
            {item.name}
          </Text>
          <Text
            style={styles.PickupquantityText}
          >
            Qty: {item.quantity}
          </Text>
        </View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "45%",
          }}
        >
          <TouchableOpacity
            disabled={item.inputQuantity == 0}
            onPress={() => onIncDec(props.id, "dec")}
            style={item.inputQuantity == 0 ? styles.MinusdisabledQtyWrap :styles.MinusenableQtyWrap }
          >
            <Text
              style={styles.minusQtyText}
            >
              -
            </Text>
          </TouchableOpacity>
          <Input
            onChangeText={(text) => onQtyChange(props.id, text)}
            style={styles.qtyInputBox}
            value={String(item.inputQuantity)}
          />
          <TouchableOpacity
            disabled={item.inputQuantity == item.quantity}
            onPress={() => onIncDec(props.id, "inc")}
            style={item.inputQuantity == item.quantity ? styles.MinusdisabledQtyWrap :styles.MinusenableQtyWrap}
          >
            <Text
              style={styles.minusQtyText}
            >
              +
            </Text>
          </TouchableOpacity>
        </View>
        {item.inputQuantity < item.quantity ? (
          <View
            style={{
              width: "100%",
              borderWidth: 1,
              borderRadius: 4,
              marginTop: 12,
              borderColor: "#707070",
            }}
          >
            <Picker
              onValueChange={(val) => onChangeReason(props.id, val)}
              mode="dialog"
              selectedValue={item.reason}
            >
              <Picker.Item label="Select Reason For Less Qty" value="" />
              <Picker.Item
                label="Material Not Ready"
                value="Material Not Ready"
              />
              <Picker.Item label="Payment Issue" value="Payment Issue" />
              <Picker.Item label="MOQ Issue" value="MOQ Issue" />
              <Picker.Item label="Rate Issue" value="Rate Issue" />
              <Picker.Item label="Location Closed" value="Location Closed" />
            </Picker>
          </View>
        ) : null}
      </View>
    </View>
  );
};
