import React from "react";
import { Card, CardItem, Button, Icon } from "native-base";
import { Text, TouchableOpacity, View } from "react-native";
import { Map } from "immutable";
import styles from "./style";
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
        props.navigation.navigate("Address", {
          company: props.item.contactName,
          type: props.type,
          data: props.item,
        })
      }
      style={styles.CompanyCardWrap}
    >
      <Text style={styles.CompanyNameBold}>{props.item.contactName}</Text>
      <Text style={styles.ItemTextBold}> Items :{" "}
        {props.item[ITEM_COUNT.find((val, key) => key == props.type)]}
      </Text>



      <View>
        <Button
          block
          onPress={() =>
            props.type == "Pickup"
              ? props.navigation.navigate("Pickup-Tasks", {
                company: props.utem.contactName,
                type: props.type,
                data: props.item,
              })
              : null
          }
          style={styles.startNowBtn}
        >
          <Text style={styles.startNowText}>
            START NOW
          </Text>
        </Button>
      </View>
    </TouchableOpacity>
  );
};
