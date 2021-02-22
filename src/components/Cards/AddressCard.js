import React from "react";
import { Card, CardItem, Button, Icon } from "native-base";
import { Text, TouchableOpacity } from "react-native";

let data = [
  { title: "Company", key: "contactName" },
  { title: "Address", key: "contactAddress" },
  { title: "City", key: "city" },
  { title: "State", key: "state" },
  { title: "Phone", key: "contactPhone" },
  { title: "TIN", key: "tin" },
  { title: "GSTIN", key: "gstin" },
  { title: "Pincode", key: "contactPincode" },
];

export default AddressCard = (props) => {
  return (
    <Card style={{ marginBottom: 20, marginTop: 0 }} transparent>
      {/* <CardItem
        style={{
          backgroundColor: '#F8FAFF',
        }}>
        <Text style={{color: '#2680EB', fontSize: 16}}>{props.item.title}</Text>
      </CardItem> */}
      {data.map((item, index) =>
        props.item[item.key] ? (
          <CardItem key={index}>
            <Text
              style={{
                width: "30%",
                fontWeight: "normal",
              }}
            >
              {item.title}
            </Text>
            <Text
              style={{
                width: "10%",
                textAlign: "center",
                fontWeight: "normal",
              }}
            >
              :
            </Text>
            <Text
              style={{
                width: "60%",
                fontWeight: "normal",
              }}
            >
              {props.item[item.key]}
            </Text>
          </CardItem>
        ) : null
      )}
    </Card>
  );
};
