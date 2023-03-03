import React from "react";
import { Icon, Input } from "native-base";
import { TouchableOpacity, View, Text, Picker } from "react-native";
import styles from "./style";

export default PickupCarditem = (props) => {
  const { item, onIncDec, onQtyChange, onChangeReason, reasons } = props;
  console.log(item.inputQuantity,'ddhfdfdgfdg');
  return (
   
    <View style={styles.pickupCard}>
      {/* <TouchableOpacity
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
      </TouchableOpacity> */}
      <View style={styles.pickUpRightPart}>
        <View
          style={{
            width: "50%",
          }}
        >
          <Text style={styles.PickupitemText}>{item.name}</Text>
          <Text style={styles.PickupquantityText}>
            Qty: {item.remainingQuantity}
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
            disabled={item.inputQuantity == 0 }
            onPress={() => onIncDec(props.id, "dec")}
            style={
              item.inputQuantity == 0
                ? styles.MinusdisabledQtyWrap
                : styles.MinusenableQtyWrap
            }
          >
            <Text style={styles.minusQtyText}>-</Text>
          </TouchableOpacity>
          <Input
            onChangeText={(text) => onQtyChange(props.id, text)}
            style={styles.qtyInputBox}
            value={String(item.inputQuantity)}
          />
          <TouchableOpacity
            disabled={item.inputQuantity >= item.remainingQuantity-0.99 }
            onPress={() => onIncDec(props.id, "inc")}
            style={
              item.inputQuantity >= item.remainingQuantity-0.99
                ? styles.MinusdisabledQtyWrap
                : styles.MinusenableQtyWrap
            }
          >
            <Text style={styles.minusQtyText}>+</Text>
          </TouchableOpacity>
        </View>
        {item.inputQuantity < item.remainingQuantity ? (
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
              {reasons.map((reason) => (
                <Picker.Item label={reason.text} value={reason.id} />
              ))}
            </Picker>
          </View>
        ) : null}
      </View>
    </View>
  );
};
