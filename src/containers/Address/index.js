import React, { useEffect, useState } from "react";
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
import styles from "./style";

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
  console.log(props);
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

  useEffect(() => {
    // getPickupItemsList();
  }, []);

  // const getPickupItemsList = async () => {
  //   const { data } = await getPickupTaskItemsByPoId(
  //     125651,
  //     props.route.params.data.id
  //   );
  //   console.log(data, "dwedfewnfefbn");
  // };

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
    if(Number(newData.getIn([key, "inputQuantity"])<1)){
      newData = newData
      .setIn(
        [key, "inputQuantity"],
        (type === "inc" ? Number(newData.getIn([key, "inputQuantity"])) + 1: 0)
      )
    setData(newData);
    }else if(Number(newData.getIn([key, "inputQuantity"])>1 && Number(newData.getIn([key, "inputQuantity"])<2))){
      newData = newData
      .setIn(
        [key, "inputQuantity"],
        (type === "inc" ? Number(newData.getIn([key, "inputQuantity"])) + 1: (Number(newData.getIn([key, "inputQuantity"]))-1).toFixed(2))
      )
    setData(newData);
    }else{
      newData = newData
      .setIn(
        [key, "inputQuantity"],
        Number(newData.getIn([key, "inputQuantity"])) +
          (type === "inc" ? 1 : -1)
      )
    setData(newData);
    }
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
          <View style={styles.footerWrap}>
            <Button block style={styles.EnabledAttemptedBtn}>
              <Text style={styles.EnabledAttemptedBtntext}>ATTEMPT FAIL</Text>
            </Button>
            <Button
              onPress={setIsUploaderVisible}
              block
              style={styles.EnabledDeliverdBtn}
            >
              <Text style={styles.EnabledDeliverdBtnText}>PICKUP DONE</Text>
            </Button>
          </View>
        );
      case "Delivery":
        return (
          <View style={styles.footerWrap}>
            <Button
              onPress={toggleModal}
              block
              style={styles.EnabledAttemptedBtn}
            >
              <Text style={styles.EnabledAttemptedBtntext}>ATTEMPTED</Text>
            </Button>
            <Button
              onPress={setIsUploaderVisible}
              block
              style={styles.EnabledDeliverdBtn}
            >
              <Text style={styles.EnabledDeliverdBtnText}>DELIVERED</Text>
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
          <View style={styles.DeliveryItemWrap}>
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
      <View style={styles.addressWrap}>
        <View style={styles.addressTopWrap}>
          <Text style={styles.addressTopText}>Your Address</Text>
          {/* <Icon
            name={"directions"}
            type="FontAwesome5"
            style={styles.diectionIcon}
          /> */}
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
    // {
    //   heading: `${props.route.params.type} Items`,
    //   render: () => renderItemDetails(),
    // },
  ];

  const goBack = () => {
    props.navigation.goBack();
  };

  const renderCards = ({ item, index }) => {
    return <AddressCard item={item} />;
  };

  return (
    <Container style={styles.ContainerCss}>
      <Header
        noShadow={true}
        rightComponent={() => (
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Profile")}
            style={styles.profileiconWrap}
          >
            <Icon
              name={"account-circle"}
              type={"MaterialCommunityIcons"}
              style={styles.ProfileIcon}
            />
            {/* {props.home.getIn(["profile", "data", "name"]) ? (
              <Text
                style={{
                  fontSize: 10,
                }}
              >
                {props.home.getIn(["profile", "data", "name"])}
              </Text>
            ) : null} */}
          </TouchableOpacity>
        )}
        leftComponent={() => (
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity style={styles.backIconWrap} onPress={goBack}>
              <Icon
                name={"arrow-left"}
                type={"MaterialCommunityIcons"}
                style={styles.backIcon}
              />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{props.route.params.company}</Text>
          </View>
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
        tabContainerStyle={{ elevation: 0 }}
      >
        {TABS.map((tab, index) => (
          <Tab
            style={styles.tabName}
            tabStyle={styles.tabStyle}
            activeTabStyle={styles.activetab}
            activeTextStyle={styles.activetext}
            textStyle={styles.tabtext}
            heading={tab.heading}
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
