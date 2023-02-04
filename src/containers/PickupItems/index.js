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
  ActivityIndicator,
} from "react-native";
import AddressCard from "../../components/Cards/AddressCard";
import PickupCarditem from "../../components/Cards/PickupCarditem";
import CommonCardItem from "../../components/Cards/CommonCardItem";
import ReasonsModal from "../../components/Modals/ReasonsModal";
import ImageUploaderModal from "../../components/Modals/ImageUploaderModal";
import { List } from "immutable";
import styles from "./style";
import {
  getPickupTaskItemsByPoId,
  getReasonList,
  pickupStart,
} from "../../services/tasks";
import Colors from "../../Theme/Colors";
import Dimension from "../../Theme/Dimension";

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

const PickupItemsScreen = (props) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isUploaderVisible, setIsUploaderVisible] = useState(false);
  const [data, setData] = useState(new List([]).toOrderedMap());
  const [reasonsData, setReasonsData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getPickupItemsList();
    getReasons();
  }, []);

  const getPickupItemsList = async () => {
    const { data } = await getPickupTaskItemsByPoId(
      props.route.params.poId,
      props.route.params.data.id
    );
    // console.log(data, "dwedfewnfefbn");
    setData(
      new List(data.pickupTaskItemRes)
        .map((_) => ({ ..._, inputQuantity: _.remainingQuantity }))
        .toOrderedMap()
    );
  };

  const getReasons = async () => {
    const { data } = await getReasonList(
      (props.route.params.type || "").toUpperCase()
    );
    setReasonsData(data.reasons);
  };

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
    if (val <= newData.getIn([key, "remainingQuantity"])) {
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

  const onPickup = async () => {
    setLoading(true);
    let obj = {
      pickuptaskId: props.route.params.data.id,
      status: "PICKUP",
      taskItemsStatuses: data
        .toList()
        .filter((_) => _.checked)
        .toArray()
        .map((_) => ({
          quantity: _.inputQuantity,
          reasonId: _.reason,
          typetaskItemId: _.id,
        })),
    };
    const resp = await pickupStart(obj);
    setLoading(false);
    if (resp.data.success) {
      props.navigation.navigate("Pickup");
    }
  };

  const renderFooter = () => {
    let isChecked = data.toList().filter((_) => _.checked).size;
    switch (props.route.params.type) {
      case "Pickup":
        return (
          <View style={styles.footerWrap}>
            {/* <Button block style={styles.EnabledAttemptedBtn}>
              <Text style={styles.EnabledAttemptedBtntext}>ATTEMPT FAIL</Text>
            </Button> */}
            <Button
              onPress={onPickup}
              disabled={!isChecked || loading}
              block
              style={
                !isChecked
                  ? styles.EnabledAttemptedBtn
                  : styles.EnabledDeliverdBtn
              }
            >
              {loading && (
                <ActivityIndicator
                  size={"small"}
                  color={Colors.white}
                  style={{ marginRight: Dimension.margin10 }}
                />
              )}
              <Text
                style={
                  !isChecked
                    ? styles.EnabledAttemptedBtntext
                    : styles.EnabledDeliverdBtnText
                }
              >
                PICKUP DONE
              </Text>
            </Button>
          </View>
        );
      case "Delivery":
        return (
          <View style={styles.footerWrap}>
            <Button
              onPress={toggleModal}
              disabled={!isChecked || loading}
              block
              style={styles.EnabledAttemptedBtn}
            >
              <Text style={styles.EnabledAttemptedBtntext}>ATTEMPTED</Text>
            </Button>
            <Button
              onPress={setIsUploaderVisible}
              disabled={!isChecked || loading}
              block
              style={
                !isChecked
                  ? styles.EnabledAttemptedBtn
                  : styles.EnabledDeliverdBtn
              }
            >
              {loading && (
                <ActivityIndicator
                  size={"small"}
                  color={Colors.white}
                  style={{ marginRight: Dimension.margin10 }}
                />
              )}
              <Text
                style={
                  !isChecked
                    ? styles.EnabledAttemptedBtntext
                    : styles.EnabledDeliverdBtnText
                }
              >
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
            reasons={reasonsData}
          />
        );
      default:
        return <CommonCardItem id={index} onCheck={onCheck} item={item} />;
    }
  };

  const toggleUploaderModal = () => {
    setIsUploaderVisible(!isUploaderVisible);
  };

  useEffect(() => {
    console.log(props.route.params, data.toList().toArray(), "dwwefwefwe");
  });

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

  const TABS = [
    {
      heading: `${props.route.params.type} Items`,
      render: () => renderItemDetails(),
    },
  ];

  const goBack = () => {
    props.navigation.goBack();
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

export default connect(mapStateToProps, null)(PickupItemsScreen);
