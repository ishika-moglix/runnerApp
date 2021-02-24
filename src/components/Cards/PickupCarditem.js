import React from "react";
import { Icon, Input } from "native-base";
import { TouchableOpacity, View, Text, Picker } from "react-native";

export default PickupCarditem = (props) => {
  const { item, onIncDec, onQtyChange, onChangeReason } = props;
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        paddingVertical: 20,
        borderBottomColor: "#E0E0E0",
        borderBottomWidth: 0.5,
      }}
    >
      <TouchableOpacity
        style={{
          width: "10%",
        }}
        onPress={() => props.onCheck(props.id)}
      >
        <Icon
          type={"MaterialCommunityIcons"}
          name={
            props.item.checked ? "checkbox-marked" : "checkbox-blank-outline"
          }
          style={{ color: "#D9232D", fontSize: 26 }}
        />
      </TouchableOpacity>
      <View
        style={{
          flexDirection: "row",
          width: "90%",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            width: "50%",
          }}
        >
          <Text
            style={{
              fontSize: 16,
            }}
          >
            {item.name}
          </Text>
          <Text
            style={{
              marginTop: 8,
              fontWeight: "bold",
              color: "#3C3C3C",
            }}
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
            style={{
              width: 34,
              height: 34,
              alignItems: "center",
              borderColor: item.inputQuantity == 0 ? "#EFEFF4" : "#278BED",
              borderWidth: 0.8,
              justifyContent: "center",
              backgroundColor:
                item.inputQuantity == 0 ? "#0000001A" : "#CBE4FF",
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              -
            </Text>
          </TouchableOpacity>
          <Input
            onChangeText={(text) => onQtyChange(props.id, text)}
            style={{
              textAlign: "center",
              borderColor: "#278BED",
              borderWidth: 0.8,
              marginHorizontal: 4,
              borderRadius: 4,
              width: 68,
              height: 34,
              padding: 0,
            }}
            value={String(item.inputQuantity)}
          />
          <TouchableOpacity
            disabled={item.inputQuantity == item.quantity}
            onPress={() => onIncDec(props.id, "inc")}
            style={{
              width: 34,
              height: 34,
              alignItems: "center",
              borderColor:
                item.inputQuantity == item.quantity ? "#EFEFF4" : "#278BED",
              borderWidth: 0.8,
              justifyContent: "center",
              backgroundColor:
                item.inputQuantity == item.quantity ? "#0000001A" : "#CBE4FF",
              borderRadius: 4,
            }}
          >
            <Text
              style={{
                alignSelf: "center",
                textAlign: "center",
                fontWeight: "bold",
                fontSize: 16,
              }}
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
