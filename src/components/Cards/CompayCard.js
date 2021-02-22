import React from "react";
import { Card, CardItem, Button, Icon } from "native-base";
import { Text, TouchableOpacity, View } from "react-native";
import { Map } from "immutable";

const ITEM_COUNT = new Map({
  Return: "returnTaskItemCount",
  SupplierReturn: "supplierReturnTaskItemCount",
  Delivery: "deliveryTaskItemCount",
  Pickup: "pickupTaskItemCount",
});

export default CompanyCard = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        props.navigation.navigate(
          props.type == "Pickup" ? "Pickup-Tasks" : "Address",
          {
            company: props.item.contactName,
            type: props.type,
            data: props.item,
          }
        )
      }
      style={{
        marginBottom: 20,
        backgroundColor: "#fff",
        padding: 12,
        borderRadius: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomColor: "#E0E0E0",
          paddingBottom: 8,
          borderBottomWidth: 1,
        }}
      >
        <Text style={{ fontWeight: "bold" }}>{props.item.contactName}</Text>
      </View>
      <View>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 20,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#333333",
            }}
          >
            Items :
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 18,
              }}
            >
              {" "}
              {props.item[ITEM_COUNT.find((val, key) => key == props.type)]}
            </Text>
          </Text>
        </View>
      </View>
      <View>
        <Button
          block
          style={{
            width: "100%",
            borderRadius: 8,
            backgroundColor: "#D9232D",
          }}
        >
          <Text style={{ fontSize: 16, fontWeight: "bold", color: "#fff" }}>
            START NOW
          </Text>
        </Button>
      </View>
    </TouchableOpacity>
  );
};
