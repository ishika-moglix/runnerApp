import React, { useEffect, useState } from "react";
import { Card, CardItem, Button, Icon } from "native-base";
import { Text, TouchableOpacity, View, ActivityIndicator } from "react-native";
import { pickupStart, deliveryStart, returnStart } from "../../services/tasks";
import { Map } from "immutable";
import styles from "./style";
const ITEM_COUNT = new Map({
  Return: "returnTaskItemCount",
  SupplierReturn: "deliveryTaskItemCount",
  Delivery: "deliveryTaskItemCount",
  Pickup: "pickupTaskItemCount",
});

export default CompanyCard = (props) => {
  const [loader, setLoader] = useState(false);

  const onPickup = async () => {
    setLoader(true);
    const { data } = await pickupStart({
      pickuptaskId: props.item.id,
      status: props.item.status == "PICKUP" ? "CLOSED" : "STARTED",
      taskItemsStatuses: [
        {
          lbh: [
            {
              boxCount: 0,
              breadth: 0,
              height: 0,
              length: 0,
              weight: 0,
            },
          ],
          quantity: 0,
          reasonId: 0,
          typetaskItemId: 0,
        },
      ],
    });
    setLoader(false);
    if (data) {
      console.log("longitude pickup:" , data.longitude, "latitude pickup:", data.latitude);
      console.log("yha data dikh rha hai Pickupstart ka ")
      console.log("*******pickup start *********", data);
      props.fetchTask();
    } else {
      setLoader(false);
      console.log("response nhi aaya", data);
    }
  };

  const onDelivery = async () => {
    setLoader(true);
    const { data } = await deliveryStart({
      deliveryTaskId: props.item.deliveryTaskId,
      // "reasonId": 0,
      status: "STARTED",
    });
    setLoader(false);
    if (data) {
    const requestData = JSON.parse(data.config.data); 
    const { latitude, longitude } = requestData; 

    console.log("User's coordinates: onDelivery DONE ", latitude, longitude);

    const distanceCheckResult = checkDistance({ latitude, longitude });

    if (!distanceCheckResult.isInRange) {
      console.log(distanceCheckResult.message);      
  }  
      //console.log("longitude:" , data.longitude, "latitude:", data.latitude);
      console.log("*******hnn yhi hai delivery start ka data (delivery to wh)*********", data);
      props.fetchTask();
    } else {
      setLoader(false);
      console.log("response nhi aaya", data);
    }
  };

  const onReturn = async () => {
    setLoader(true);
    const { data } = await returnStart({
      returnPickupTaskId: props.item.returnTaskId,
      status:
        props.item.returnTaskStatus == "PICKUP_DONE" ? "CLOSED" : "STARTED",
    });
    setLoader(false);
    if (data) {
      const requestData = JSON.parse(data.config.data); 
    const { latitude, longitude } = requestData; 

    console.log("User's coordinates: onRturn DONE ", latitude, longitude);

    const distanceCheckResult = checkDistance({ latitude, longitude });

    if (!distanceCheckResult.isInRange) {
      console.log(distanceCheckResult.message);      
  }  
     // console.log("longitude:" , data.longitude, "latitude:", data.latitude);
      console.log("********on return********", data);
      props.fetchTask();
    } else {
      setLoader(false);
      console.log("response nhi aaya", data);
    }
  };

  const onStart = async () => {
    console.log(props);
    try {
      switch (props.type) {
        case "Delivery":
          await onDelivery();
          return;
        case "Pickup":
          await onPickup();
          return;
        case "Return":
          return onReturn();
        case "SupplierReturn":
          return onDelivery();
        default:
          return;
      }
    } catch (e) {
      setLoader(false);
      console.log("catch mein aaya");
    }
  };

  const navigate = () => {
    if (
      !(
        props.item.status == "CLOSED" ||
        props.item.deliveryTaskStatus == "CLOSED" ||
        props.item.returnTaskStatus == "CLOSED" ||
        // props.item.status == "READY_FOR_PICKUP" ||
        props.item.deliveryTaskStatus == "READY_FOR_DELIVERY" ||
        props.item.returnTaskStatus == "READY_FOR_RETURN" ||
        props.item.returnTaskStatus == "READY_FOR_PICKUP"
      )
    ) {
      props.navigation.navigate("Pickup-Tasks", {
        company: props.item.contactName,
        type: props.type,
        data: props.item,
        showFurtherFlow:
          props.type == "Pickup"
            ? props.item.status != "READY_FOR_PICKUP"
            : true,
      });
    }
    // if (props.type == "Pickup") {
    // }
  };
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={navigate}
      style={styles.CompanyCardWrap}
    >
      <View style={styles.CompanyCardTopWrap}>
        <Text style={styles.CompanyNameBold}>{props.item.contactName}</Text>
        <TouchableOpacity>
          <Text
            style={styles.AddressText}
            onPress={() =>
              props.navigation.navigate("Address", {
                company: props.item.contactName,
                type: props.type,
                data: props.item,
              })
            }
          >
            Address
          </Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.ItemTextBold}>
        {" "}
        Items : {props.item[ITEM_COUNT.find((val, key) => key == props.type)]}
      </Text>
      <View>
        {[
          "READY_FOR_PICKUP",
          "READY_FOR_DELIVERY",
          "RETURN_INITIATED",
        ].includes(
          props.item.status ||
            props.item.deliveryTaskStatus ||
            props.item.returnTaskStatus
        ) ? (
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
        {props.item.status == "PICKUP" ? (
          <Button
            block
            onPress={onStart}
            style={!loader ? styles.startNowBtn : styles.disabledstartNowBtn}
            disabled={loader}
          >
            <Text style={styles.startNowText}>DELIVERED TO WH</Text>
            {loader ? (
              <ActivityIndicator color={"#fff"} style={{ marginLeft: 20 }} />
            ) : null}
          </Button>
        ) : null}
        {props.item.returnTaskStatus == "PICKUP_DONE" ? (
          <Button
            block
            onPress={onReturn}
            style={!loader ? styles.startNowBtn : styles.disabledstartNowBtn}
            disabled={loader}
          >
            <Text style={styles.startNowText}>PICKUP</Text>
            {loader ? (
              <ActivityIndicator color={"#fff"} style={{ marginLeft: 20 }} />
            ) : null}
          </Button>
        ) : null}
        {props.item.status == "CLOSED" ||
        props.item.deliveryTaskStatus == "CLOSED" ||
        props.item.returnTaskStatus == "CLOSED" ? (
          <Button
            block
            // onPress={onStart}
            style={!loader ? styles.startNowBtn : styles.disabledstartNowBtn}
            disabled={loader}
          >
            <Text style={styles.startNowText}>CLOSED</Text>
          </Button>
        ) : null}
        {props.item.status == "STARTED" ||
        props.item.status == "ARRIVED" ||
        props.item.status == "TRANSACTING" ||
        props.item.deliveryTaskStatus == "STARTED" ||
        props.item.deliveryTaskStatus == "ARRIVED" ||
        props.item.deliveryTaskStatus == "TRANSACTING" ||
        props.item.returnTaskStatus == "STARTED" ||
        props.item.returnTaskStatus == "ARRIVED" ||
        props.item.returnTaskStatus == "TRANSACTING" ? (
          <Button block onPress={navigate} style={styles.startNowBtn}>
            <Text style={styles.startNowText}>ONGOING</Text>
          </Button>
        ) : null}
      </View>
    </TouchableOpacity>
  );
};
