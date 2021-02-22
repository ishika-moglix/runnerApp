import React, { useState } from "react";
import Modal from "react-native-modal";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Button, Card, CardItem, Icon } from "native-base";
import { OrderedMap } from "immutable";

const MAIN = new OrderedMap({
  name: {
    title: "Name",
  },
  id: {
    title: "ID",
  },
  warehouse: {
    title: "Warehouse",
  },
  phone: {
    title: "Phone",
  },
});

const MEDIUM_CARDS = new OrderedMap({
  tripsCompleted: {
    title: "Trips Completed",
    color: "#2680EB",
  },
  avgDailyItems: {
    title: "Avg. Daily Items",
    color: "#F46B27",
  },
});

export default ProfileModal = (props) => {
  const { toggleModal, isModalVisible, data } = props;
  return (
    <Modal
      onBackButtonPress={toggleModal}
      style={{
        margin: 0,
      }}
      onBackdropPress={toggleModal}
      isVisible={isModalVisible}
      animationIn={"slideInUp"}
      animationOut={"slideOutDown"}
    >
      <View
        style={{
          width: Dimensions.get("window").width,
          alignSelf: "center",
          borderTopLeftRadius: 4,
          borderTopRightRadius: 4,
          bottom: 0,
          padding: 20,
          position: "absolute",
          backgroundColor: "#fff",
        }}
      >
        <TouchableOpacity
          onPress={toggleModal}
          activeOpacity={0.6}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <View style={{ width: "30%" }} />
          <View>
            <Image
              style={{ width: 60, height: 60, top: -40, alignSelf: "center" }}
              resizeMode={"contain"}
              source={require("../../assets/runner.png")}
            />
          </View>
          <View
            style={{ width: "30%", alignItems: "flex-end", paddingRight: 20 }}
          >
            <Icon
              name={"chevron-down"}
              type={"MaterialCommunityIcons"}
              style={{ fontSize: 32 }}
            />
          </View>
        </TouchableOpacity>
        {props.loading ? (
          <ActivityIndicator
            style={{
              alignSelf: "center",
            }}
            color={"#D9232D"}
          />
        ) : (
          <>
            <Card>
              {MAIN.map((val, key) => (
                <CardItem
                  key={key}
                  style={{
                    paddingLeft: 20,
                    paddingRight: 20,
                  }}
                >
                  <Text style={{ width: "45%" }}>{val.title}</Text>
                  <Text style={{ width: "10%" }}>:</Text>
                  <Text style={{ width: "45%" }}>{data.get(key)}</Text>
                </CardItem>
              )).toList()}
            </Card>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {MEDIUM_CARDS.map((val, key) => (
                <Card
                  key={key}
                  style={{
                    width: "47%",
                    padding: 12,
                  }}
                >
                  <Text>{val.title}</Text>
                  <Text
                    style={{
                      fontSize: 26,
                      color: val.color,
                    }}
                  >
                    {data[key] || 0}
                  </Text>
                </Card>
              )).toList()}
            </View>
          </>
        )}
      </View>
    </Modal>
  );
};
