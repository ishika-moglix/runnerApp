import React from "react";
import { Icon, View } from "native-base";
import { Text, TouchableOpacity } from "react-native";

export default CommonCardItem = (props) => {
  const { item } = props;
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
      <Text
        style={{
          fontSize: 16,
          width: "50%",
        }}
      >
        {item.name}
      </Text>
      <Text
        style={{
          width: "40%",
          textAlign: "right",
          color: "#000",
          fontWeight: "bold",
          fontSize: 16,
        }}
      >
        Qty: {item.quantity}
      </Text>
    </View>
  );
};
