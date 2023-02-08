import { connect } from "react-redux";
import React, { useEffect } from "react";
import { Container, Icon } from "native-base";
import {
  Image,
  TouchableOpacity,
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";

import CompanyCard from "../../components/Cards/CompayCard";
import Header from "../../components/Header";
import { Map, List } from "immutable";
import TaskActions from "../../redux/actions/tasks";
import moment from "moment";

const SupplierReturnScreen = (props) => {
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      if (!props.task.get("loading")) {
        fetchTask();
      }
    });
    return unsubscribe;
  }, [props.navigation]);

  const fetchTask = () => {
    props.fetchTask("return_delivery", props.currentdate, 1);
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const renderCards = ({ item, index }) => {
    return (
      <CompanyCard
        type={"SupplierReturn"}
        navigation={props.navigation}
        fetchTask={fetchTask}
        item={item}
      />
    );
  };

  return (
    <Container style={{ backgroundColor: "#F7F7FA" }}>
      <Header
        headertext={"Supplier Return"}
        leftComponent={() => (
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Icon
              onPress={goBack}
              name={"arrow-left"}
              type={"MaterialCommunityIcons"}
            />
            <Text
              style={{
                width: "100%",
                marginLeft: 12,
                fontSize: 16,
              }}
            >
              Supplier Return
              {props.task.get("data")
                ? `(${props.task.get("data").size})`
                : null}
            </Text>
          </View>
        )}
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
      />
      <View
        style={{
          padding: 20,
        }}
      >
        {props.task.get("loading") ? (
          <ActivityIndicator
            style={{
              alignItems: "center",
              justifyContent: "center",
              alignSelf: "center",
            }}
            color={"#D9232D"}
          />
        ) : (
          <FlatList
            ListEmptyComponent={() => (
              <Text
                style={{
                  fontSize: 18,
                  textAlign: "center",
                  alignSelf: "center",
                }}
              >
                No data found
              </Text>
            )}
            data={(props.task.get("data") || new List([])).toArray() || []}
            renderItem={renderCards}
            keyExtractor={(item, index) => `${index}-item`}
          />
        )}
      </View>
    </Container>
  );
};

const mapStateToProps = (state, props) => ({
  task:
    state.tasks.getIn([
      "return_delivery",
      moment(state.home.get("currentdate")).format("DD-MM-YYYY"),
    ]) || new Map({}),
  currentdate: state.home.get("currentdate"),
  home: state.home,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTask: (taskType, date, page) =>
    dispatch(TaskActions.fetchTaskData(taskType, date, page)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierReturnScreen);
