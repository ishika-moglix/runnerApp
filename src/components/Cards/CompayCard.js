import React, { useEffect, useState } from "react";
import { Card, CardItem, Button, Icon } from "native-base";
import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { pickupStart } from "../../services/tasks";
import { Map } from "immutable";
import styles from "./style";
const ITEM_COUNT = new Map({
  Return: "returnTaskItemCount",
  SupplierReturn: "supplierReturnTaskItemCount",
  Delivery: "deliveryTaskItemCount",
  Pickup: "pickupTaskItemCount",
});

export default CompanyCard = (props) => {
  const [loader, setLoader] = useState(false);

  const onStart = async () => {
    try {
      setLoader(true);
      const { data } = await pickupStart({
        pickuptaskId: props.item.id,
        status: "STARTED",
        taskItemsStatuses: [
          {
            lbh: {
              boxCount: 0,
              breadth: 0,
              height: 0,
              length: 0,
              weight: 0,
            },
            quantity: 0,
            reasonId: 0,
            typetaskItemId: 0,
          },
        ],
      });
      setLoader(false);
      if (data) {
        console.log("****************", data);
        props.fetchTask();
      } else {
        setLoader(false);
        console.log("response nhi aaya", data);
      }
    } catch (e) {
      setLoader(false);
      console.log("catch mein aaya");
    }
  };

  const navigate = () => {
    if (props.type == "Pickup") {
      props.navigation.navigate("Pickup-Tasks", {
        company: props.item.contactName,
        type: props.type,
        data: props.item,
      });
    }
  };
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
      <Text style={styles.ItemTextBold}>
        {" "}
        Items : {props.item[ITEM_COUNT.find((val, key) => key == props.type)]}
      </Text>
      <View>
        {props.item.status == "READY_FOR_PICKUP" ? (
          <Button
            block
            onPress={onStart}
            style={!loader ? styles.startNowBtn : styles.disabledstartNowBtn}
            disabled={loader}
          >
            <Text style={styles.startNowText}>START NOW</Text>
            {loader ? (
              <ActivityIndicator color={"#fff"} style={{ marginLeft: 20 }} />
            ) : null}
          </Button>
        ) : null}

        {props.item.status == "STARTED" ||
        props.item.status == "ARRIVED" ||
        props.item.status == "TRANSACTING" ? (
          <Button block onPress={navigate} style={styles.startNowBtn}>
            <Text style={styles.startNowText}>ONGOING</Text>
          </Button>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
