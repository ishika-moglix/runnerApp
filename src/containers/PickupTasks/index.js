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
  FlatList,
  ActivityIndicator,
} from "react-native";
import TaskActions from "../../redux/actions/tasks";
import debounce from "lodash.debounce";
import { getPdfByPoId } from "../../services/tasks";

const PickupTasksScreen = (props) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    searchValidator(search);
  }, []);

  const searchValidator = (text) => {
    if (text) {
      onSearch(text);
    } else {
      props.fetchPickupTask(props.route.params.data.id, text);
    }
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const onSearch = useCallback(
    debounce((searchText) => {
      props.fetchPickupTask(props.route.params.data.id, searchText);
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
    return (
      <Card
        style={{
          marginTop: 12,
        }}
      >
        <CardItem
          style={{
            borderBottomColor: "#E0E0E0",
            borderBottomWidth: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Text>Po Id : {item.poId}</Text>
          <TouchableOpacity onPress={() => onOpenFile(item.poId)}>
            <Icon
              name={"file"}
              type={"MaterialCommunityIcons"}
              style={{ color: "#2680EB" }}
            />
          </TouchableOpacity>
        </CardItem>
        <CardItem>
          <TouchableOpacity
            style={{
              flexDirection: "row",
              width: "100%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text style={{ fontSize: 16 }}>
              Items :{" "}
              <Text style={{ fontWeight: "bold" }}>{item.itemCount}</Text>
            </Text>
            <Icon
              name={"menu-right"}
              style={{ color: "#000" }}
              type={"MaterialCommunityIcons"}
            />
          </TouchableOpacity>
        </CardItem>
      </Card>
    );
  };

  return (
    <Container
      style={{
        flex: 1,
        backgroundColor: "#F2F2F2",
      }}
    >
      <Header
        headertext={"Pickup-Tasks"}
        leftComponent={() => (
          <TouchableOpacity onPress={goBack}>
            <Icon
              name={"chevron-left"}
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
        <Item style={{ backgroundColor: "#fff" }} regular>
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
      {props.pickupTask.get("loading") ? (
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
            data={props.pickupTask.get("data")}
            renderItem={renderItems}
          />
        </>
      )}
    </Container>
  );
};

const mapStateToProps = (state) => ({
  pickupTask: state.tasks.getIn(["pickUpTasks"]) || new Map({}),
});

const mapDispatchToProps = (dispatch) => ({
  fetchPickupTask: (pickupTaskId, poId) =>
    dispatch(TaskActions.fetchPickupTask(pickupTaskId, poId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PickupTasksScreen);
