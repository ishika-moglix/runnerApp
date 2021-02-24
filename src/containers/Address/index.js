import React, { useState } from "react";
import { connect } from "react-redux";
import { Container, Icon, Tab, TabHeading, Tabs, Button } from "native-base";
import Header from "../../components/Header";
import {
  TouchableOpacity,
  View,
  Text,
  FlatList,
  Image,
  ScrollView,
} from "react-native";
import AddressCard from "../../components/Cards/AddressCard";
import PickupCarditem from "../../components/Cards/PickupCarditem";
import CommonCardItem from "../../components/Cards/CommonCardItem";
import ReasonsModal from "../../components/Modals/ReasonsModal";
import ImageUploaderModal from "../../components/Modals/ImageUploaderModal";
import { List } from "immutable";

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
    label: "Location is ODA",
    value: "Location is ODA",
  },
  {
    label: "Vehicle constraint",
    value: "Vehicle constraint",
  },
];

const AddressScreen = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isUploaderVisible, setIsUploaderVisible] = useState(false);
  const [data, setData] = useState(
    new List([
      {
        name: "Safety hand glove",
        quantity: "240",
        checked: false,
        inputQuantity: "240",
        reason: "",
      },
      {
        name: "Generic AMP 70-80 Bar Inner- 138x115x162",
        quantity: "190",
        checked: false,
        inputQuantity: "190",
        reason: "",
      },
    ]).toOrderedMap()
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onCheck = (key) => {
    let newData = data;
    newData = newData.setIn([key, "checked"], !newData.getIn([key, "checked"]));
    setData(newData);
  };

  const onQtyChange = (key, val) => {
    let newData = data;
    if (val <= newData.getIn([key, "quantity"])) {
      newData = newData.setIn([key, "inputQuantity"], val);
      setData(newData);
    }
  };

  const onIncDec = (key, type) => {
    let newData = data;
    newData = newData.setIn(
      [key, "inputQuantity"],
      Number(newData.getIn([key, "inputQuantity"])) + (type === "inc" ? 1 : -1)
    );
    setData(newData);
  };

  const onChangeReason = (key, val) => {
    let newData = data;
    newData = newData.setIn([key, "reason"], val);
    setData(newData);
  };

  const renderFooter = () => {
    switch (props.route.params.type) {
      case "Pickup":
        return (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              padding: 8,
              width: "100%",
              backgroundColor: "#EFEFF4",
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
                width: "100%",
                backgroundColor: "#D9232D",
                borderRadius: 4,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 16, color: "#fff" }}>
                PICKUP DONE
              </Text>
            </Button>
          </View>
        );
      case "Delivery":
        return (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              padding: 8,
              width: "100%",
              backgroundColor: "#EFEFF4",
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
                backgroundColor: "#fff",
                borderRadius: 4,
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 16, color: "#D9232D" }}
              >
                ATTEMPTED
              </Text>
            </Button>
            <Button
              onPress={setIsUploaderVisible}
              block
              style={{
                width: "48%",
                backgroundColor: "#D9232D",
                borderRadius: 4,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 16, color: "#fff" }}>
                DELIVERED
              </Text>
            </Button>
          </View>
        );
      default:
        return (
          <View
            style={{
              position: "absolute",
              bottom: 0,
              padding: 8,
              width: "100%",
              backgroundColor: "#EFEFF4",
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
                backgroundColor: "#fff",
                borderRadius: 4,
              }}
            >
              <Text
                style={{ fontWeight: "bold", fontSize: 16, color: "#D9232D" }}
              >
                ATTEMPT FAIL
              </Text>
            </Button>
            <Button
              onPress={setIsUploaderVisible}
              block
              style={{
                width: "48%",
                backgroundColor: "#D9232D",
                borderRadius: 4,
              }}
            >
              <Text style={{ fontWeight: "bold", fontSize: 16, color: "#fff" }}>
                RETURN DONE
              </Text>
            </Button>
          </View>
        );
    }
  };

  const renderCard = (item, index) => {
    switch (props.route.params.type) {
      case "Pickup":
        return (
          <PickupCarditem
            onIncDec={onIncDec}
            onChangeReason={onChangeReason}
            id={index}
            onCheck={onCheck}
            onQtyChange={onQtyChange}
            item={item}
          />
        );
      default:
        return <CommonCardItem id={index} onCheck={onCheck} item={item} />;
    }
  };

  const toggleUploaderModal = () => {
    setIsUploaderVisible(!isUploaderVisible);
  };

  const renderItemDetails = () => {
    return (
      <>
        <ScrollView>
          <View
            style={{
              margin: 20,
            }}
          >
            {data
              .map((item, index) => renderCard(item, index))
              .toList()
              .toArray()}
          </View>
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
                : "Select Reason For Fail Attempt"
            }
          />
        )}
        {isUploaderVisible && (
          <ImageUploaderModal
            navigation={props.navigation}
            toggleModal={toggleUploaderModal}
            isModalVisible={isUploaderVisible}
          />
        )}
      </>
    );
  };

  const renderAddress = () => {
    return (
      <View
        style={{
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          backgroundColor: "#fff",
          flex: 1,
        }}
      >
        <View
          style={{
            marginHorizontal: 20,
            paddingVertical: 20,
            flexDirection: "row",
            alignItems: "center",
            borderBottomColor: "#e7e7e7",
            borderBottomWidth: 0.6,
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
              color: "#303030",
              fontSize: 16,
            }}
          >
            Address
          </Text>
          <Icon
            name={"directions"}
            type="FontAwesome5"
            style={{
              fontSize: 22,
              color: "#D9232D",
            }}
          />
        </View>
        <FlatList
          data={[props.route.params.data]}
          renderItem={renderCards}
          keyExtractor={(item, index) => `${index}-item`}
        />
      </View>
    );
  };

  const TABS = [
    {
      heading: `${props.route.params.type} Address`,
      render: () => renderAddress(),
    },
    {
      heading: `${props.route.params.type} Items`,
      render: () => renderItemDetails(),
    },
  ];

  const goBack = () => {
    props.navigation.goBack();
  };

  const renderCards = ({ item, index }) => {
    return <AddressCard item={item} />;
  };

  return (
    <Container
      style={{
        backgroundColor: "#F7F7FA",
      }}
    >
      <Header
        noShadow={true}
        rightComponent={() => (
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Profile")}
            style={{
              alignItems: "center",
            }}
          >
            <Icon
              name={"account-circle"}
              type={"MaterialCommunityIcons"}
              style={{ color: "#000" }}
            />
            {props.home.getIn(["profile", "data", "name"]) ? (
              <Text
                style={{
                  fontSize: 10,
                }}
              >
                {props.home.getIn(["profile", "data", "name"])}
              </Text>
            ) : null}
          </TouchableOpacity>
        )}
        leftComponent={() => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={goBack}
          >
            <Icon name={"arrow-left"} type={"MaterialCommunityIcons"} />
            <Image
              style={{ width: 60, height: 20, marginLeft: 12 }}
              source={require("../../assets/moglix-logo.jpg")}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              Runner
            </Text>
          </TouchableOpacity>
        )}
      />
      <Tabs
        onChangeTab={(tab) => {
          setActiveTab(tab.i);
        }}
        tabBarUnderlineStyle={{
          backgroundColor: "#D9232D",
          height: 2,
        }}
      >
        {TABS.map((tab, index) => (
          <Tab
            style={{ backgroundColor: "#fff" }}
            heading={
              <TabHeading style={{ backgroundColor: "#fff" }}>
                <Text
                  style={{
                    fontWeight: activeTab !== index ? "normal" : "bold",
                    color: activeTab === index ? "#D9232D" : "#000",
                    fontSize: 16,
                  }}
                >
                  {tab.heading}
                </Text>
              </TabHeading>
            }
          >
            {tab.render()}
          </Tab>
        ))}
      </Tabs>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  home: state.home,
});

export default connect(mapStateToProps, null)(AddressScreen);
