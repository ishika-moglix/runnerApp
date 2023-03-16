import { connect } from "react-redux";
import React, { useEffect, useState, useCallback } from "react";
import { Container, Icon, Item, Input, Button } from "native-base";
import {
  View,
  TouchableOpacity,
  Text,
  Image,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import Header from "../../components/Header";
import styles from "./styles";
import debounce from "lodash.debounce";
import { getFuturePos, assingPickUp } from "../../services/tasks";
// import TaskActions from "../../redux/actions/tasks";

const FuturePO = (props) => {
  const {
    navigation: { navigate },
  } = props;
  const [search, setSearch] = useState("");
  const [dataList, setDataList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    searchValidator(search);
  }, []);

  const searchValidator = (text) => {
    if (text) {
      onSearch(text);
    }
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const onSearch = useCallback(
    debounce((searchText) => {
      getPos(searchText);
    }, 1000),
    []
  );

  const getPos = async (searchText) => {
    setLoading(true);
    setDataList([]);
    const { data } = await getFuturePos(searchText);
    if (data.success) {
      setDataList(data.poItemDetails);
    }
    setLoading(false);
  };

  const startSearch = (text) => {
    setSearch(text);
    searchValidator(text);
  };

  const onCreateAssign = async () => {
    setLoading(true);
    const { data } = await assingPickUp(dataList.map((_) => _.emsPoItemId));
    if (data.success) {
      props.navigation.goBack();
    }
    setLoading(false);
  };

  return (
    <Container style={{ backgroundColor: "#F7F7FA" }}>
      <Header
        headertext={"Delivery"}
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
              Search PO
            </Text>
          </View>
        )}
        rightComponent={() => (
          <TouchableOpacity
            onPress={() => navigate("Profile")}
            style={{
              alignItems: "center",
            }}
          >
            <Image
              style={styles.rightArrowIcon}
              source={require("../../assets/account-circle-fill.png")}
            />
          </TouchableOpacity>
        )}
      />
      <View style={styles.container}>
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
        {!dataList.length && loading ? (
          <ActivityIndicator
            color={"rgba(217, 35, 45, 1)"}
            size={"small"}
            style={{ alignSelf: "center", margin: 10 }}
          />
        ) : null}
        <ScrollView>
          {dataList.map((item, itemKey) => (
            <View key={itemKey}>
              <Text>{item.emsPoId}</Text>
              <Text>
                Scheduled Date :{" "}
                {
                  new Date(new Date().setDate(new Date().getDate() + 1))
                    .toISOString()
                    .split("T")[0]
                }
              </Text>
              <Text>Name: {item.name}</Text>
              <Text>QTY :{item.quantity}</Text>
              <Text></Text>
              <Text></Text>
            </View>
          ))}
        </ScrollView>
        {dataList.length ? (
          <>
            <Text>Would you like to pick this Order?</Text>
            <Button
              block
              onPress={() => props.navigation.goBack()}
              style={styles.startNowBtn}
            >
              <Text style={styles.startNowText}>NO</Text>
            </Button>
            <Button block onPress={onCreateAssign} style={styles.startNowBtn}>
              <Text style={styles.startNowText}>YES</Text>
              {loading ? (
                <ActivityIndicator color={"#fff"} size={"small"} />
              ) : null}
            </Button>
          </>
        ) : null}
      </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(FuturePO);
