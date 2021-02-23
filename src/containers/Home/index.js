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
import moment from "moment";
import { connect } from "react-redux";
import HomeActions from "../../redux/actions/home";
import { Map } from "immutable";

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

  useEffect(() => {
    updateHomePage();
    if (!props.home.getIn(["profile", "data"]).size) {
      props.fetchProfile();
    }
  }, [date]);

  const updateHomePage = () => {
    props.setDate(date);
    if (!props.home.get(moment(date).format("DD-MM-YYYY"))) {
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
          >
            <Image
              style={{ width: 60, height: 20 }}
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
      <Header
        key={2}
        rightComponent={() => (
          <View>
            <TouchableOpacity
              onPress={() => setShow(true)}
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Title style={{ color: "#000", fontSize: 16, marginRight: 12 }}>
                {moment(date).format("ddd, MMM DD")}
              </Title>
              <Icon
                name={"calendar-month"}
                type={"MaterialCommunityIcons"}
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
              name={"chevron-left"}
              type={"MaterialCommunityIcons"}
              style={{ fontSize: 22, width: 36 }}
            />
            <Title
              style={{
                color: "#D9232D",
                fontSize: 16,
                marginRight: 12,
                lineHeight: 30,
              }}
            >
              Today
            </Title>
            <Icon
              name={"chevron-right"}
              type={"MaterialCommunityIcons"}
              style={{ fontSize: 22, width: 36 }}
            />
          </TouchableOpacity>
        )}
      />
      <ScrollView contentContainerStyle={{ padding: 20 }}>
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
                <View
                  key={index}
                  style={{
                    marginBottom: 20,
                    width: "100%",
                    padding: 12,
                    borderRadius: 8,
                    backgroundColor: "#F7F7FA",
                    borderWidth: 0.8,
                    borderColor: "#C4C4C4",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => props.navigation.navigate(getRoute(index))}
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: "bold",
                          color: "#D9232D",
                        }}
                      >
                        {getTitle(index)}
                      </Text>
                    </View>
                    <Icon
                      type={"MaterialCommunityIcons"}
                      name={"chevron-right"}
                      style={{
                        right: -12,
                        color: "#D9232D",
                      }}
                    />
                  </TouchableOpacity>
                  <Text
                    style={{
                      marginTop: 8,
                      color: "#979797",
                    }}
                  >
                    {getCaption(index)}
                  </Text>
                  <View
                    style={{
                      marginTop: 30,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 16,
                      }}
                    >
                      Total Items:{" "}
                      <Text style={{ fontWeight: "bold" }}>
                        {item.get("items")}
                      </Text>
                      {"     "}| {"    "}
                      {getSubTitle(item)} Location:{" "}
                      <Text style={{ fontWeight: "bold" }}>
                        {item.get(getSubTitle(item, true)) || 0}
                      </Text>
                    </Text>
                  </View>
                </View>
              ))
              .toList()
              .toArray()}
          </View>
        )}
      </ScrollView>
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
