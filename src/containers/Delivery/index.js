import { connect } from "react-redux";
import { Container, Icon } from "native-base";
import React, { useEffect } from "react";
import {
  TouchableOpacity,
  View,
  FlatList,
  Text,
  ActivityIndicator,
  Image,
} from "react-native";
import moment from "moment";
import CompanyCard from "../../components/Cards/CompayCard";
import Header from "../../components/Header";
import { Map, List } from "immutable";
import TaskActions from "../../redux/actions/tasks";
import styles from "./style";
const DeliveryScreen = (props) => {
  useEffect(() => {
    const unsubscribe = props.navigation.addListener("focus", () => {
      if (!props.task.get("loading")) {
        fetchTask();
      }
    });
    return unsubscribe;
  }, [props.navigation]);

  const goBack = () => {
    props.navigation.goBack();
  };

  const fetchTask = () => {
    props.fetchTask("delivery", props.currentdate, 1);
  };

  const renderCards = ({ item, index }) => {
    return (
      <CompanyCard
        type={"Delivery"}
        navigation={props.navigation}
        item={item}
        fetchTask={fetchTask}
      />
    );
  };

  return (
    <Container style={styles.ContainerCss}>
      <Header
        headertext={"Delivery"}
        leftComponent={() => (
          <View style={styles.backIconWrap}>
            <Icon
              onPress={goBack}
              name={"arrow-left"}
              type={"MaterialCommunityIcons"}
              style={styles.backIcon}
            />
            <Text style={styles.headerTitle}>
              Delivery{" "}
              {props.task.get("data")
                ? `( ${props.task.get("data").size} )`
                : null}
            </Text>
          </View>
        )}
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
  home: state.home,
});

const mapDispatchToProps = (dispatch) => ({
  fetchTask: (taskType, date, page) =>
    dispatch(TaskActions.fetchTaskData(taskType, date, page)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DeliveryScreen);
