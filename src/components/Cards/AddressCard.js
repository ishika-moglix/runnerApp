import React from "react";
import { Card, CardItem, Button, Icon } from "native-base";
import { Text, TouchableOpacity } from "react-native";
import styles from './style'
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
    <Card style={styles.addressCardWrap} transparent>
      {/* <CardItem
        style={{
          backgroundColor: '#F8FAFF',
        }}>
        <Text style={{color: '#2680EB', fontSize: 16}}>{props.item.title}</Text>
      </CardItem> */}
      {data.map((item, index) =>
        props.item[item.key] ? (
          <CardItem key={index} style={styles.addressCardItem}>
            <Text style={[styles.addresstext,styles.leftWidth]} >
              {item.title}
            </Text>
            <Text style={[styles.colontext,styles.centerWidth]}>
              :
            </Text>
            <Text 
            style={[styles.addresstext,styles.rightWidth]}
            >
              {props.item[item.key]}
            </Text>
          </CardItem>
        ) : null
      )}
    </Card>
  );
};
