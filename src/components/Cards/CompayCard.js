import React from "react";
import { Card, CardItem, Button, Icon } from "native-base";
import { Text, TouchableOpacity } from "react-native";
import { Map } from "immutable";

const ITEM_COUNT = new Map({
  Return: "returnTaskItemCount",
  SupplierReturn: "supplierReturnTaskItemCount",
  Delivery: "deliveryTaskItemCount",
  Pickup: "pickupTaskItemCount",
});

export default CompanyCard = (props) => {
  return (
    <Card style={{ marginTop: 20 }}>
      <CardItem
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottomColor: "#E0E0E0",
          borderBottomWidth: 1,
        }}
      >
        <Text>{props.item.contactName}</Text>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate("Address", {
              company: props.item.contactName,
              data: props.item,
            })
          }
        >
          <Text
            style={{
              color: "#2680EB",
            }}
          >
            Address
          </Text>
        </TouchableOpacity>
      </CardItem>
      <CardItem>
        <TouchableOpacity
          style={{
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          onPress={() =>
            props.navigation.navigate("ItemDetails", {
              company: props.item.contactName,
              type: props.type,
            })
          }
        >
          <Text>
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
          <Icon type={"MaterialCommunityIcons"} name={"chevron-right"} />
        </TouchableOpacity>
      </CardItem>
      <CardItem>
        <Button
          iconLeft
          iconRight
          block
          style={{
            width: "100%",
            borderRadius: 4,
            backgroundColor: "#4DA116",
          }}
        >
          <Icon
            style={{ color: "#fff" }}
            type={"MaterialCommunityIcons"}
            name={"chevron-double-right"}
          />
          <Text style={{ fontSize: 20, color: "#fff" }}>START</Text>
          <Icon
            style={{ color: "#fff" }}
            type={"MaterialCommunityIcons"}
            name={"chevron-double-right"}
          />
        </Button>
      </CardItem>
    </Card>
  );
};
