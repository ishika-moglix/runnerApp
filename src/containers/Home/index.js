import { Container, Icon, Title } from "native-base";
import React, { useEffect, useState } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  Platform,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Header from "../../components/Header";
import DateTimePicker from "@react-native-community/datetimepicker";
import HomePageMenuModal from "../../components/Modals/HomepageMenuModal";
import moment from "moment";
import { connect } from "react-redux";
import HomeActions from "../../redux/actions/home";
import { Map } from "immutable";
import styles from "./style";

const max = new Date();
const min = new Date(moment(new Date()).subtract(1, "month").toString());

const TITLES = new Map({
  pickupDetails: "Pickup Done",
  deliveryDetails: "Delivery Details",
  returnDetails: "Return Details",
  supplierReturnDetails: "Supplier Return Details",
});

const CAPTIONS = new Map({
  pickupDetails: "Collect Products from Suppliers Location",
  deliveryDetails: "Deliver Products from Customers Location",
  returnDetails: "Collect Return Products",
  supplierReturnDetails: "Return Products to Supplier",
});

const SUB_TITLES = new Map({
  suppliers: "Suppliers",
  customers: "Customer",
});

const ROUTES = new Map({
  pickupDetails: "Pickup",
  deliveryDetails: "Delivery",
  returnDetails: "Return",
  supplierReturnDetails: "Supplier Return",
});

const HomeScreen = (props) => {
  const [date, setDate] = useState(
    props.currentdate ? new Date(props.currentdate) : new Date()
  );
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    updateHomePage();
    if (!props.home.getIn(["profile", "data"]).size) {
      props.fetchProfile();
    }
  }, [date]);

  const updateHomePage = () => {
    props.setDate(date);
    if (
      !props.home.get(moment(date).format("DD-MM-YYYY")) ||
      !props.home.getIn([moment(date).format("DD-MM-YYYY"), "data"])
    ) {
      props.fetchHome(date);
    }
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    if (moment(moment(date)).diff(moment(currentDate))) {
      setDate(currentDate);
    }
  };

  const getTitle = (key) => {
    return TITLES.find((_, k) => k == key);
  };

  const getCaption = (key) => {
    return CAPTIONS.find((_, k) => k == key);
  };

  const getSubTitle = (item, forKey) => {
    const titleKey = item.findKey((_, k) =>
      ["suppliers", "customers"].includes(k)
    );
    if (forKey) {
      return titleKey;
    }
    return SUB_TITLES.find((_, k) => k == titleKey);
  };

  const getRoute = (key) => {
    return ROUTES.find((_, k) => k == key);
  };

  return (
    <Container style={{ backgroundColor: "#fff", flex: 1 }}>
      <Header
        key={1}
        noShadow={true}
        rightComponent={() => (
          <TouchableOpacity
            onPress={() => props.navigation.navigate("Profile")}
            style={{
              alignItems: "center",
            }}
          >
            <Image
              style={styles.rightArrowIcon}
              source={require("../../assets/account-circle-fill.png")}
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
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Image
              style={{ width: 120, height: 20 }}
              source={require("../../assets/RunnerLogo.png")}
            />
          </TouchableOpacity>
        )}
      />
      <Header
        key={2}
        noShadow={true}
        rightComponent={() => (
          <View>
            <TouchableOpacity
              onPress={() => setShowModal(true)}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Icon
                name={"dots-three-vertical"}
                type={"Entypo"}
                style={{ color: "#000", fontSize: 24 }}
              />
            </TouchableOpacity>
          </View>
        )}
        leftComponent={() => (
          <TouchableOpacity
            onPress={() => setShow(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon
              name={"calendar-month"}
              type={"MaterialCommunityIcons"}
              style={{ color: "#000", fontSize: 24 }}
            />

            <Image
              style={styles.rightArrowIcon}
              source={require("../../assets/arrowLeft.png")}
            />

            <Title style={styles.dateText}>
              {moment(date).format("DD/MMM/YY")}
            </Title>
            <Image
              style={styles.rightArrowIcon}
              source={require("../../assets/rightBlackArrow.png")}
            />
          </TouchableOpacity>
        )}
      />
      <ScrollView
        contentContainerStyle={{ padding: 20 }}
        style={styles.ContainerCss}
      >
        {show && (
          <DateTimePicker
            maximumDate={max}
            minimumDate={min}
            mode={mode}
            value={date}
            display="default"
            onChange={onChange}
          />
        )}
        {props.home.getIn([moment(date).format("DD-MM-YYYY"), "loading"]) ? (
          <ActivityIndicator
            style={{
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
            color={"#D9232D"}
          />
        ) : (
          <View>
            {(
              props.home.getIn([moment(date).format("DD-MM-YYYY"), "data"]) ||
              new Map({})
            )
              .map((item, index) => (
                <View key={index} style={styles.cardWrap}>
                  <Text style={styles.cardTitle}>{getTitle(index)}</Text>
                  <View style={styles.rowWrap}>
                    <Text style={styles.normalText}>
                      Total Items:{" "}
                      <Text style={styles.BoldText}>{item.get("items")}</Text>
                      {"     "}|{"    "}
                      {getSubTitle(item)} Location:{" "}
                      <Text style={styles.BoldText}>
                        {item.get(getSubTitle(item, true)) || 0}
                      </Text>
                    </Text>
                  </View>
                  <Text style={styles.lightGarytext}>{getCaption(index)}</Text>
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate(getRoute(index))}
                    style={styles.viewListBtn}
                  >
                    <Text style={styles.RedBoldText}>View List</Text>
                    <Image
                      style={styles.rightArrowIcon}
                      source={require("../../assets/arrow-right.png")}
                    />
                  </TouchableOpacity>
                </View>
              ))
              .toList()
              .toArray()}
          </View>
        )}
      </ScrollView>
      {showModal && (
        <HomePageMenuModal
          isVisible={showModal}
          navigation={props.navigation}
          toggleModal={() => setShowModal(false)}
        />
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  home: state.home,
  currentdate: state.home.get("currentdate"),
});

const mapDispatchToProps = (dispatch) => ({
  fetchHome: (date) => dispatch(HomeActions.fetchHomeData(date)),
  fetchProfile: () => dispatch(HomeActions.fetchProfile()),
  setDate: (date) => dispatch(HomeActions.setDate(date)),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
