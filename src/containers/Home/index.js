import { Container, Card, Icon, Title, CardItem, Footer } from "native-base";
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
import ProfileModal from "../../components/Modals/ProfileModal";

const max = new Date();
const min = new Date(moment(new Date()).subtract(1, "month").toString());

const TITLES = new Map({
  pickupDetails: "Pick Up Details",
  deliveryDetails: "Delivery Details",
  returnDetails: "Returns",
  supplierReturnDetails: "Supplier Return",
});

const SUB_TITLES = new Map({
  suppliers: "Suppliers",
  customers: "Customers",
  items: "Items",
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
  const [profileModal, setProfileModal] = useState(false);

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

  const openDrawer = () => {
    props.navigation.openDrawer();
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    if (moment(moment(date)).diff(moment(currentDate))) {
      setDate(currentDate);
    }
    setShow(Platform.OS === "ios");
  };

  const getTitle = (key) => {
    return TITLES.find((_, k) => k == key);
  };

  const getSubTitle = (key) => {
    return SUB_TITLES.find((_, k) => k == key);
  };

  const getRoute = (key) => {
    return ROUTES.find((_, k) => k == key);
  };

  const toggleModal = () => {
    setProfileModal(!profileModal);
  };

  return (
    <Container style={{ backgroundColor: "#F2F2F2", flex: 1 }}>
      <Header
        headertext={"Moglix Runner"}
        leftComponent={() => (
          <TouchableOpacity onPress={openDrawer}>
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../assets/menu.png")}
            />
          </TouchableOpacity>
        )}
      />
      <ScrollView
        style={{
          padding: 20,
        }}
      >
        <Card>
          <TouchableOpacity
            onPress={() => setShow(true)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              width: "100%",
              justifyContent: "space-between",
            }}
          >
            <CardItem
              style={{
                width: "15%",
              }}
            >
              <Icon type={"MaterialCommunityIcons"} name={"chevron-left"} />
            </CardItem>
            <CardItem
              style={{
                width: "70%",
              }}
            >
              <Title
                style={{ color: "#000", fontSize: 16, textAlign: "center" }}
              >
                Select Date : {moment(date).format("Do MMM YYYY")}
              </Title>
            </CardItem>
            <CardItem
              style={{
                width: "15%",
              }}
            >
              <Icon type={"MaterialCommunityIcons"} name={"chevron-right"} />
            </CardItem>
          </TouchableOpacity>
        </Card>
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
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {(
              props.home.getIn([moment(date).format("DD-MM-YYYY"), "data"]) ||
              new Map({})
            )
              .map((item, index) => (
                <Card key={index} style={{ marginTop: 20, width: "48%" }}>
                  <CardItem style={{ paddingLeft: 12, paddingRight: 12 }}>
                    <TouchableOpacity
                      onPress={() => props.navigation.navigate(getRoute(index))}
                      style={{
                        width: "100%",
                        padding: 8,
                        borderRadius: 4,
                        backgroundColor: "#D9232D",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          color: "#fff",
                        }}
                      >
                        {getTitle(index)}
                      </Text>
                      <Icon
                        type={"MaterialCommunityIcons"}
                        name={"chevron-right"}
                        style={{
                          right: -12,
                          color: "#fff",
                        }}
                      />
                    </TouchableOpacity>
                  </CardItem>
                  {item
                    .map((subItem, subItemKey) => (
                      <CardItem
                        style={{
                          paddingLeft: 12,
                          paddingRight: 12,
                          flexDirection: "row",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                      >
                        <Text style={{ fontWeight: "bold", color: "#000" }}>
                          {getSubTitle(subItemKey)}
                        </Text>
                        <Text
                          style={{
                            fontWeight: "bold",
                            fontSize: 18,
                            color: "#000",
                          }}
                        >
                          {subItem}
                        </Text>
                      </CardItem>
                    ))
                    .toList()}
                </Card>
              ))
              .toList()
              .toArray()}
          </View>
        )}
      </ScrollView>
      <ProfileModal
        isModalVisible={profileModal}
        toggleModal={toggleModal}
        data={props.home.getIn(["profile", "data"])}
        loading={props.home.getIn(["profile", "loading"])}
      />
      <Footer
        style={{
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
              style={{ width: 60, height: 60, top: -20, alignSelf: "center" }}
              resizeMode={"contain"}
              source={require("../../assets/runner.png")}
            />
          </View>
          <View
            style={{ width: "30%", alignItems: "flex-end", paddingRight: 20 }}
          >
            <Icon
              name={"chevron-up"}
              type={"MaterialCommunityIcons"}
              style={{ fontSize: 32 }}
            />
          </View>
        </TouchableOpacity>
      </Footer>
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
