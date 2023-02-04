import { connect } from "react-redux";
import { Map } from "immutable";
import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Icon,
  Card,
  Item,
  Input,
  CardItem,
  Toast,
} from "native-base";
import Header from "../../components/Header";
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  FlatList,
  ActivityIndicator,
} from "react-native";
import TaskActions from "../../redux/actions/tasks";
import debounce from "lodash.debounce";
import { getPdfByPoId } from "../../services/tasks";

const PickupTasksScreen = (props) => {
  const [search, setSearch] = useState("");
  console.log(props);
  useEffect(() => {
    searchValidator(search);
  }, []);

  const searchValidator = (text) => {
    if (text) {
      onSearch(text);
    } else {
      props.fetchPickupTask(
        props.route.params.type == "Pickup"
          ? "pickUpTasks"
          : props.route.params.type == "Delivery"
          ? "deliveryTasks"
          : "",
        props.route.params.data.id || props.route.params.data.deliveryTaskId,
        text
      );
    }
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const onSearch = useCallback(
    debounce((searchText) => {
      props.fetchPickupTask(
        props.route.params.type == "Pickup"
          ? "pickUpTasks"
          : props.route.params.type == "Delivery"
          ? "deliveryTasks"
          : "",
        props.route.params.data.id || props.route.params.data.deliveryTaskId,
        searchText
      );
    }, 1000),
    []
  );

  const startSearch = (text) => {
    setSearch(text);
    searchValidator(text);
  };

  const onOpenFile = async (poId) => {
    try {
      const { data } = await getPdfByPoId(poId);
      if (data.success) {
        props.navigation.navigate("FileViewer", {
          pdf: data.url,
        });
      } else {
        Toast.show({
          text: "Error opening file",
          buttonText: "Okay",
          duration: 1500,
          style: { margin: 20 },
        });
      }
    } catch (e) {
      Toast.show({
        text: "Error opening file",
        buttonText: "Okay",
        duration: 1500,
        style: { margin: 20 },
      });
    }
  };

  const renderItems = ({ item, index }) => {
    let type =
      props.route.params.type == "Pickup"
        ? "pickUpTasks"
        : props.route.params.type == "Delivery"
        ? "deliveryTasks"
        : "";
    return (
      <View
        style={{
          marginTop: 9,
          backgroundColor: "#fff",
          padding: 12,
          borderRadius: 8,
        }}
      >
        <View
          style={{
            borderBottomColor: "#E0E0E0",
            borderBottomWidth: 1,
            flexDirection: "row",
            paddingBottom: 12,
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>
            {type == "pickUpTasks"
              ? "Po"
              : type == "deliveryTasks"
              ? "Packet"
              : ""}{" "}
            Id : {item.poId || item.emsPacketId}
          </Text>
          <TouchableOpacity
            onPress={() => onOpenFile(item.poId || item.emsPacketId)}
          >
            <Icon
              name={"file"}
              type={"MaterialCommunityIcons"}
              style={{ color: "#2680EB" }}
            />
          </TouchableOpacity>
        </View>
        <View>
          {type == "deliveryTasks" ? (
            <Text>Invoice Id : {item.invoiceId}</Text>
          ) : null}
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("PickupItems", {
                ...props.route.params,
                ...item,
              });
            }}
            style={{
              flexDirection: "row",
              width: "100%",
              paddingTop: 12,
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16 }}>
              Items :{" "}
              <Text style={{ fontWeight: "bold" }}>
                {item.itemCount || item.itemsCount}
              </Text>
            </Text>
            <Icon
              name={"menu-right"}
              style={{ color: "#000" }}
              type={"MaterialCommunityIcons"}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <Container
      style={{
        flex: 1,
        backgroundColor: "#F7F7FA",
      }}
    >
      <Header
        leftComponent={() => (
          <View
            style={{
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
              Pickup Tasks
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
        <Item style={{ backgroundColor: "#fff", borderRadius: 8 }} regular>
          <Icon
            name={"magnify"}
            type={"MaterialCommunityIcons"}
            style={{
              color: "#C3C3C3",
            }}
          />
          <Input
            placeholder={"Search PO"}
            value={search}
            onChangeText={(text) => startSearch(text)}
          />
        </Item>
      </View>
      {props.pickupTask.getIn([
        props.route.params.type == "Pickup"
          ? "pickUpTasks"
          : props.route.params.type == "Delivery"
          ? "deliveryTasks"
          : "",
        "loading",
      ]) ? (
        <ActivityIndicator
          color={"#D9232D"}
          style={{
            alignSelf: "center",
          }}
        />
      ) : (
        <>
          <FlatList
            style={{
              paddingHorizontal: 20,
            }}
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
            keyExtractor={(item, index) => `${index}-item`}
            data={props.pickupTask.getIn([
              props.route.params.type == "Pickup"
                ? "pickUpTasks"
                : props.route.params.type == "Delivery"
                ? "deliveryTasks"
                : "",
              "data",
            ])}
            renderItem={renderItems}
          />
        </>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  pickupTask: state.tasks,
  home: state.home,
});

const mapDispatchToProps = (dispatch) => ({
  fetchPickupTask: (type, pickupTaskId, poId) =>
    dispatch(TaskActions.fetchPickupTask(type, pickupTaskId, poId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PickupTasksScreen);
