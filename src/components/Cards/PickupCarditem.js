import React from "react";
import { Icon, CardItem, Input } from "native-base";
import { TouchableOpacity, View, Text, Picker } from "react-native";

export default PickupCarditem = (props) => {
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
          <Text>{item.name}</Text>
          <Text
            style={{
              marginTop: 8,
              // textAlign: "right",
              color: "#4DA116",
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
            style={{
              width: "25%",
              padding: 15,
              backgroundColor: "#CBE4FF",
            }}
          >
            <Icon
              name={"minus"}
              style={{ fontSize: 20, left: -8 }}
              type={"MaterialCommunityIcons"}
            />
          </TouchableOpacity>
          <Input
            style={{
              textAlign: "center",
              borderColor: "#E0E0E0",
              borderWidth: 0.5,
              width: "50%",
            }}
            placeholder={"123"}
            value={"123"}
          />
          <TouchableOpacity
            style={{
              width: "25%",
              padding: 15,
              backgroundColor: "#CBE4FF",
            }}
          >
            <Icon
              name={"plus"}
              style={{ fontSize: 20, left: -8 }}
              type={"MaterialCommunityIcons"}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "100%",
            borderWidth: 1,
            borderRadius: 4,
            marginTop: 12,
            borderColor: "#707070",
          }}
        >
          <Picker mode="dialog">
            <Picker.Item label="Select reason" value="" />
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
      </View>
    </CardItem>
  );
};
