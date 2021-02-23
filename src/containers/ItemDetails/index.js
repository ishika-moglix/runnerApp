import React, { useState } from "react";
import { Container, Icon, Card, CardItem, Button } from "native-base";
import Header from "../../components/Header";
import { TouchableOpacity, Text, ScrollView } from "react-native";
import PickupCarditem from "../../components/Cards/PickupCarditem";
import CommonCardItem from "../../components/Cards/CommonCardItem";
import ReasonsModal from "../../components/Modals/ReasonsModal";

let data = [
  {
    name: "Safety hand glove",
    quantity: "240",
  },
  {
    name: "Generic AMP 70-80 Bar Inner- 138x115x162",
    quantity: "190",
  },
];

let deliveryOptions = [
  {
    label: "Customer Location Closed",
    value: "Customer Location Closed",
  },
  {
    label: "No one at location for Receiving",
    value: "No one at location for Receiving",
  },
  {
    label: "Customer Denied Invoice Missmatch",
    value: "Customer Denied Invoice Missmatch",
  },
];

let returnOptions = [
  {
    label: "Customer Location Closed",
    value: "Customer Location Closed",
  },
  {
    label: "location is ODA",
    value: "location is ODA",
  },
  {
    label: "Vehicle constraint",
    value: "Vehicle constraint",
  },
];

export default ItemDetailsScreen = (props) => {
  const goBack = () => {
    props.navigation.goBack();
  };

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const renderFooter = () => {
    switch (props.route.params.type) {
      case "Pickup":
        return (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              backgroundColor: "#fff",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              onPress={() =>
                props.navigation.navigate("ItemsImages", {
                  company: props.route.params.company,
                })
              }
              block
              style={{
                backgroundColor: "#2680EB",
              }}
            >
              <Text style={{ fontSize: 18, color: "#fff" }}>PICKUP DONE</Text>
            </Button>
          </View>
        );
      case "Delivery":
        return (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              backgroundColor: "#fff",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              onPress={toggleModal}
              block
              style={{
                width: "48%",
                backgroundColor: "#525252",
              }}
            >
              <Text style={{ fontSize: 18, color: "#fff" }}>ATTEMPTED</Text>
            </Button>
            <Button
              onPress={() =>
                props.navigation.navigate("ItemsImages", {
                  company: props.route.params.company,
                })
              }
              block
              style={{
                width: "48%",
                backgroundColor: "#2680EB",
              }}
            >
              <Text style={{ fontSize: 18, color: "#fff" }}>DELIVERED</Text>
            </Button>
          </View>
        );
      default:
        return (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              backgroundColor: "#fff",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Button
              block
              onPress={toggleModal}
              style={{
                width: "48%",
                backgroundColor: "#525252",
              }}
            >
              <Text style={{ fontSize: 18, color: "#fff" }}>
                PICKUP NOT DONE
              </Text>
            </Button>
            <Button
              onPress={() =>
                props.navigation.navigate("ItemsImages", {
                  company: props.route.params.company,
                })
              }
              block
              style={{
                width: "48%",
                backgroundColor: "#2680EB",
              }}
            >
              <Text style={{ fontSize: 18, color: "#fff" }}>PICKUP DONE</Text>
            </Button>
          </View>
        );
    }
  };

  const renderCards = (item) => {
    switch (props.route.params.type) {
      case "Pickup":
        return <PickupCarditem item={item} />;
      default:
        return <CommonCardItem item={item} />;
    }
  };

  return (
    <Container
      style={{
        flex: 1,
        backgroundColor: "#F7F7FA",
      }}
    >
      <Header
        headertext={props.route.params.company}
        leftComponent={() => (
          <TouchableOpacity onPress={goBack}>
            <Icon
              name={"chevron-left"}
              style={{ color: "#fff" }}
              type={"MaterialCommunityIcons"}
            />
          </TouchableOpacity>
        )}
        rightComponent={() => (
          <TouchableOpacity>
            <Icon
              name={"magnify"}
              style={{ color: "#fff" }}
              type={"MaterialCommunityIcons"}
            />
          </TouchableOpacity>
        )}
      />
      <ScrollView>
        <Card
          style={{
            marginLeft: 20,
            marginRight: 20,
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <CardItem
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginLeft: 20,
              marginRight: 20,
              paddingLeft: 0,
              paddingRight: 0,
              borderBottomColor: "#E0E0E0",
              borderBottomWidth: 1,
            }}
          >
            <Text style={{ fontWeight: "bold" }}>Items</Text>
            <Text style={{ fontWeight: "bold", fontSize: 18 }}>
              {data.length}
            </Text>
          </CardItem>
          {data.map((item, index) => renderCards(item))}
        </Card>
      </ScrollView>
      {renderFooter()}
      {isModalVisible && (
        <ReasonsModal
          options={
            props.route.params.type == "Delivery"
              ? deliveryOptions
              : returnOptions
          }
          isModalVisible={isModalVisible}
          toggleModal={toggleModal}
          title={
            props.route.params.type == "Delivery"
              ? "Reason for incomplete delivery"
              : "Reason for No Pickup"
          }
        />
      )}
    </Container>
  );
};
