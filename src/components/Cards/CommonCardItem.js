import React from "react";
import { Icon, CardItem } from "native-base";
import { Text } from "react-native";

export default CommonCardItem = (props) => {
  const { item } = props;
  return (
    <CardItem
      style={{
        flexDirection: "row",
        alignItems: "flex-start",
        paddingTop: 20,
        paddingBottom: 20,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft: 0,
        paddingRight: 0,
        borderBottomColor: "#E0E0E0",
        borderBottomWidth: 0.5,
      }}
    >
      <Icon
        type={"MaterialCommunityIcons"}
        name={"check-circle"}
        style={{ color: "#2680EB", fontSize: 20, width: "10%" }}
      />
      <Text
        style={{
          width: "50%",
        }}
      >
        {item.name}
      </Text>
      <Text
        style={{
          width: "40%",
          textAlign: "right",
          color: "#4DA116",
          fontWeight: "bold",
          fontSize: 16,
        }}
      >
        Qty: {item.quantity}
      </Text>
    </CardItem>
  );
};
