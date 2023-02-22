import { OrderedMap } from "immutable";
import { Container, Icon } from "native-base";
import React from "react";
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  AsyncStorage,
} from "react-native";
import { connect } from "react-redux";
import HomeActions from "../../redux/actions/home";

const MEDIUM_CARDS = new OrderedMap({
  warehouse: {
    title: "Warehouse",
    color: "#2680EB",
  },
  id: {
    title: "Employee ID",
    color: "#2680EB",
  },
  tripsCompleted: {
    title: "Trips Completed",
    color: "#2680EB",
  },
  avgDailyItems: {
    title: "Avg. Daily Items",
    color: "#F46B27",
  },
});

const ProfileScreen = (props) => {
  const goBack = () => {
    props.navigation.goBack();
  };

  const onLogout = () => {
    props.logout();
    AsyncStorage.removeItem("token");
    props.route.params.setIsLoggedIn();
  };

  return (
    <Container
      style={{
        backgroundColor: "#F7F7FA",
        flex: 1,
      }}
    >
      <Header
        rightComponent={() => (
          <TouchableOpacity onPress={onLogout}>
            <Icon
              name={"logout"}
              type={"AntDesign"}
              style={{
                color: "#000",
                fontSize: 20,
              }}
            />
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
      <View
        style={{
          padding: 20,
          flex: 1,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            backgroundColor: "#fff",
            borderRadius: 8,
            padding: 12,
          }}
        >
          <View
            style={{
              marginLeft: 0,
              marginRight: 0,
            }}
          >
            <Image
              source={require("../../assets/runner.png")}
              resizeMode={"contain"}
              style={{
                backgroundColor: "#EFEFF4",
                padding: 4,
                width: 60,
                height: 60,
                borderRadius: 8,
              }}
            />
          </View>
          <View
            style={{
              marginLeft: 20,
              marginRight: 0,
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <Text
              style={{
                fontSize: 18,
                color: "#3C3C3C",
                fontWeight: "bold",
                width: "100%",
              }}
            >
              {props.home.getIn(["profile", "data", "name"])}
            </Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 8,
              }}
            >
              <Icon
                name={"checkbox-marked-circle"}
                type={"MaterialCommunityIcons"}
                style={{
                  color: "green",
                  fontSize: 14,
                  width: 14,
                  marginRight: 8,
                }}
              />
              <Text
                style={{
                  color: "#3C3C3C",
                  opacity: 0.8,
                  fontSize: 12,
                  width: "100%",
                }}
              >
                +91-{props.home.getIn(["profile", "data", "phone"])}
              </Text>
            </View>
          </View>
        </View>
        {MEDIUM_CARDS.map((val, key) => (
          <View
            key={key}
            style={{
              width: "100%",
              padding: 12,
              borderRadius: 8,
              backgroundColor: "#fff",
              marginTop: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ fontSize: 16, color: "#333333" }}>{val.title}</Text>
            <Text
              style={{
                fontWeight: "bold",
                fontSize: 16,
                color: "#3C3C3C",
              }}
            >
              {props.home.getIn(["profile", "data", key]) || 0}
            </Text>
          </View>
        )).toList()}
      </View>
    </Container>
  );
};

const mapStateToProp = (state) => ({
  home: state.home,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(HomeActions.logout()),
});

export default connect(mapStateToProp, mapDispatchToProps)(ProfileScreen);
