import { connect } from "react-redux";
import { Container, Icon } from "native-base";
import React, { useEffect } from "react";
import {
  Image,
  TouchableOpacity,
  View,
  FlatList,
  Text,
  ActivityIndicator,
} from "react-native";
import moment from "moment";
import CompanyCard from "../../components/Cards/CompayCard";
import Header from "../../components/Header";
import { Map, List } from "immutable";
import TaskActions from "../../redux/actions/tasks";

const DeliveryScreen = (props) => {
  useEffect(() => {
    props.fetchTask("delivery", props.currentdate, 1);
  }, []);

  const openDrawer = () => {
    props.navigation.openDrawer();
  };

  const renderCards = ({ item, index }) => {
    return (
      <CompanyCard
        type={"Delivery"}
        navigation={props.navigation}
        item={item}
      />
    );
  };

  useEffect(() => {
    console.log(props.task, "checkk");
  });

  return (
    <Container style={{ backgroundColor: "#F2F2F2" }}>
      <Header
        headertext={"Delivery"}
        leftComponent={() => (
          <TouchableOpacity onPress={openDrawer}>
            <Image
              style={{ width: 20, height: 20 }}
              source={require("../../assets/menu.png")}
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
      "delivery",
      moment(state.home.get("currentdate")).format("DD-MM-YYYY"),
    ]) || new Map({}),
  currentdate: state.home.get("currentdate"),
});

const mapDispatchToProps = (dispatch) => ({
  fetchTask: (taskType, date, page) =>
    dispatch(TaskActions.fetchTaskData(taskType, date, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryScreen);
