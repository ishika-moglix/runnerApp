import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Container,
  Icon,
  Tab,
  TabHeading,
  Tabs,
  Button,
  Toast,
} from "native-base";
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
  getDeliveryTaskItemsByTaskItemId,
  getReturnTaskItemsByTaskItemId,
  pickupStart,
  markAttemptedReturn,
  markAttempted,
  returnPicked,
  returnRejected,
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
  const [reasonLoading, setReasonLoading] = useState(false);

  useEffect(() => {
    console.log(props);
    if (props.route.params.type == "Pickup") {
      getPickupItemsList();
    } else if (
      props.route.params.type == "Delivery" ||
      props.route.params.type == "SupplierReturn"
    ) {
      getDeliveryItemList();
    } else if (props.route.params.type == "Return") {
      getReturnItemList();
    }
    getReasons();
  }, []);

  const getDeliveryItemList = async () => {
    const { data } = await getDeliveryTaskItemsByTaskItemId(
      props.route.params.deliveryTaskItemId
    );
    setData(
      new List(data.deliveryTaskLineItemsList)
        .map((_) => ({ ..._, inputQuantity: _.orderedQuantity, checked: true }))
        .toOrderedMap()
    );
  };

  const getReturnItemList = async () => {
    const { data } = await getReturnTaskItemsByTaskItemId(
      props.route.params.returnTaskItemId
    );
    setData(
      new List(data.returnTaskLineItemsList)
        .map((_) => ({ ..._, inputQuantity: _.orderedQuantity, checked: true }))
        .toOrderedMap()
    );
  };

  const getPickupItemsList = async () => {
    const { data } = await getPickupTaskItemsByPoId(
      props.route.params.poId,
      props.route.params.data.id
    );
    if (data.pickupTaskItemRes[0].status == "PICKUP") {
      Toast.show({
        text: "Already picked up!",
        buttonText: "Okay",
        duration: 1500,
        style: { margin: 20 },
      });
      props.navigation.goBack();
    } else {
      setData(
        new List(data.pickupTaskItemRes)
          .map((_) => ({
            ..._,
            inputQuantity: _.remainingQuantity,
            checked: true,
          }))
          .toOrderedMap()
      );
    }
  };

  const getReasons = async () => {
    const { data } = await getReasonList(
      (props.route.params.type == "SupplierReturn"
        ? "RETURN_DELIVERY"
        : props.route.params.type || ""
      ).toUpperCase()
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
      newData = newData.setIn([key, "inputQuantity"], val || 0);
      setData(newData);
    }
  };

  const onIncDec = (key, type) => {
    let newData = data;
    newData = newData
      .setIn(
        [key, "inputQuantity"],
        Number(newData.getIn([key, "inputQuantity"])) +
          (type === "inc" ? 1 : -1)
      )
      .setIn(
        [key, "reason"],
        Number(newData.getIn([key, "inputQuantity"])) +
          (type === "inc" ? 1 : -1) ==
          newData.getIn([key, "remainingQuantity"])
          ? null
          : newData.getIn([key, "reason"])
      );
    setData(newData);
  };

  const onChangeReason = (key, val) => {
    let newData = data;
    newData = newData.setIn([key, "reason"], val);
    setData(newData);
  };

  const onReasonSelect = async (reasonID, nextPickupDate) => {
    try {
      setReasonLoading(true);
      let data = {
        [`${
          props.route.params.type == "Delivery" ||
          props.route.params.type == "SupplierReturn"
            ? "deliveryTaskItemId"
            : "returnTaskItemId"
        }`]:
          props.route.params.deliveryTaskItemId ||
          props.route.params.returnTaskItemId,
        reasonID,
        nextPickupDate,
      };
      const markResp =
        props.route.params.type == "Return"
          ? await markAttemptedReturn(data)
          : props.route.params.type == "SupplierReturn"
          ? await returnRejected(data)
          : await markAttempted(data);
      console.log(markResp);
      if (markResp.data.success) {
        Toast.show({
          text: markResp.data.message || "",
          buttonText: "Okay",
          duration: 1500,
          style: { margin: 20 },
        });
        setReasonLoading(false);
        setModalVisible(false);
        if (props.route.params.type == "Delivery") {
          props.navigation.navigate("Delivery");
        } else if (props.route.params.type == "Return") {
          props.navigation.navigate("Return");
        } else if (props.route.params.type == "SupplierReturn") {
          props.navigation.navigate("SupplierReturn");
        }
      } else {
        setModalVisible(false);
        setReasonLoading(false);
        Toast.show({
          text: markResp.data.message || "Something went wrong!",
          buttonText: "Okay",
          duration: 1500,
          style: { margin: 20 },
        });
      }
    } catch (e) {
      console.log(e);
      setModalVisible(false);
      setReasonLoading(false);
    }
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

  const onReturn = async () => {
    setLoading(true);
    let obj = {
      returnTaskItemId: props.route.params.returnTaskItemId,
    };
    const resp = await returnPicked(obj);
    setLoading(false);
    if (resp.data.success) {
      props.navigation.navigate("Return");
    }
  };

  const isQuantityMisMatched = () => {
    return data
      .toList()
      .filter((_) => _.checked && _.inputQuantity == _.remainingQuantity)
      .size == data.toList().filter((_) => _.checked).size
      ? true
      : data
          .toList()
          .filter((_) => _.checked && _.inputQuantity != _.remainingQuantity)
          .size == data.toList().filter((_) => _.checked && _.reason).size;
  };

  const renderFooter = () => {
    let isChecked = data.toList().filter((_) => _.checked).size;
    let isReasonSelected =
      props.route.params.type == "Pickup"
        ? Number(
            data.toList().reduce((a, b) => a + Number(b.inputQuantity), 0)
          ) ==
          Number(
            data.toList().reduce((a, b) => a + Number(b.remainingQuantity), 0)
          )
          ? true
          : isQuantityMisMatched()
        : // data.toList().filter((_) => _.checked).size ==
          //   data.toList().filter((_) => _.reason).size
          null;
    switch (props.route.params.type) {
      case "Pickup":
        return (
          <View style={styles.footerWrap}>
            {/* <Button block style={styles.EnabledAttemptedBtn}>
              <Text style={!isChecked ? styles.DisbaledAttemptedBtntext : styles.EnabledAttemptedBtntext}>ATTEMPT FAIL</Text>
            </Button> */}
            <Button
              onPress={onPickup}
              disabled={!isChecked || loading || !isReasonSelected}
              block
              style={
                !isChecked || !isReasonSelected
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
                  !isChecked || !isReasonSelected
                    ? styles.DisbaledAttemptedBtntext
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
              <Text
                style={
                  !isChecked
                    ? styles.DisbaledAttemptedBtntext
                    : styles.EnabledAttemptedBtntext
                }
              >
                ATTEMPTED
              </Text>
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
                    ? styles.DisbaledAttemptedBtntext
                    : styles.EnabledDeliverdBtnText
                }
              >
                DELIVERED
              </Text>
            </Button>
          </View>
        );
      case "SupplierReturn":
        return (
          <View style={styles.footerWrap}>
            <Button
              onPress={toggleModal}
              disabled={!isChecked || loading}
              block
              style={styles.EnabledAttemptedBtn}
            >
              <Text
                style={
                  !isChecked
                    ? styles.DisbaledAttemptedBtntext
                    : styles.EnabledAttemptedBtntext
                }
              >
                REJECTED
              </Text>
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
                    ? styles.DisbaledAttemptedBtntext
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
              disabled={!isChecked || loading}
              style={styles.EnabledAttemptedBtn}
            >
              <Text
                style={
                  !isChecked
                    ? styles.DisbaledAttemptedBtntext
                    : styles.EnabledAttemptedBtntext
                }
              >
                ATTEMPT FAIL
              </Text>
            </Button>
            <Button
              onPress={onReturn}
              block
              disabled={!isChecked || loading}
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
                    ? styles.DisbaledAttemptedBtntext
                    : styles.EnabledDeliverdBtnText
                }
              >
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
              props.route.params.type == "Delivery" ? reasonsData : reasonsData
            }
            isModalVisible={isModalVisible}
            toggleModal={toggleModal}
            type={props.route.params.type}
            reasonLoading={reasonLoading}
            onReasonSelect={onReasonSelect}
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
            type={props.route.params.type}
            toggleModal={toggleUploaderModal}
            deliveryTaskItemId={props.route.params.deliveryTaskItemId}
            isModalVisible={isUploaderVisible}
          />
        )}
      </>
    );
  };

  console.log(props, "cecerfcv");

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
