import { connect } from "react-redux";
import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Icon,
  Item,
  Input,
  Button,
  Footer,
  Content,
  Toast,
} from "native-base";
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
import Dimension from "../../Theme/Dimension";
import style from "../../components/Cards/style";
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
      if (!data.poItemDetails.length) {
        Toast.show({
          text: "No Data Found!",
          buttonText: "Okay",
          duration: 2500,
          style: { margin: 20 },
        });
      }
      setDataList(data.poItemDetails);
    } else {
      Toast.show({
        text: data.message,
        buttonText: "Okay",
        duration: 2500,
        style: { margin: 20 },
      });
    }
    setLoading(false);
  };

  const startSearch = (text) => {
    setSearch(text);
    // searchValidator(text);
  };

  const onCreateAssign = async () => {
    setLoading(true);
    const { data } = await assingPickUp(dataList.map((_) => _.emsPoItemId));
    if (data.success) {
      props.navigation.goBack();
    } else {
      Toast.show({
        text: data.message,
        buttonText: "Okay",
        duration: 2500,
        style: { margin: 20 },
      });
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
      <Content style={styles.container}>
        <Item style={{ backgroundColor: "#fff", borderRadius: 8 }} regular>
          <Icon
            name={"magnify"}
            type={"MaterialCommunityIcons"}
            style={{
              color: "#C3C3C3",
            }}
          />
          <Input
            placeholder={"Search Supplier PO"}
            value={search}
            onChangeText={(text) => startSearch(text)}
            keyboardType={"number-pad"}
          />
          {search.length > 2 ? (
            <TouchableOpacity
              onPress={() => {
                setSearch(""), setDataList([]);
              }}
            >
              <Icon
                name={"close"}
                type={"MaterialCommunityIcons"}
                style={{
                  color: "#3C3C3C",
                }}
              />
            </TouchableOpacity>
          ) : null}
        </Item>

        <Button
          block
          onPress={() => searchValidator(search)}
          style={styles.startNowBtn}
        >
          <Text style={styles.startNowText}>Search</Text>
        </Button>
        {!dataList.length && loading ? (
          <ActivityIndicator
            color={"rgba(217, 35, 45, 1)"}
            size={"large"}
            style={{ alignSelf: "center", margin: 100 }}
          />
        ) : null}
        <ScrollView style={styles.scrollviewCss}>
          {dataList.length ? (
            <>
              <Text style={styles.poidtxt}>{dataList[0].emsPoId}</Text>
              {/* <Text
                style={[
                  styles.normalText,
                  { marginVertical: Dimension.margin10 },
                ]}
              >
                Scheduled Date :{" "}
                {
                  new Date(new Date().setDate(new Date().getDate() + 1))
                    .toISOString()
                    .split("T")[0]
                }
              </Text> */}
            </>
          ) : null}

          {dataList.map((item, itemKey) => (
            <View key={itemKey} style={styles.cardWrap}>
              <View style={{ flex: 8 }}>
                <Text style={styles.normalText}>{item.name}</Text>
              </View>
              <View style={{ flex: 4, alignItems: "flex-end" }}>
                <Text style={styles.normalText}>QTY : {item.quantity}</Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </Content>
      {dataList.length ? (
        <>
          <View style={styles.footerCss}>
            <Text style={styles.footerTxt}>
              Would you like to pick this Order?
            </Text>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Button
                  block
                  onPress={() => props.navigation.goBack()}
                  style={styles.graybtn}
                >
                  <Text style={styles.graybtnTxt}>NO</Text>
                </Button>
              </View>
              <View style={{ flex: 1, marginLeft: Dimension.padding10 }}>
                <Button
                  block
                  onPress={onCreateAssign}
                  style={styles.startNowBtn}
                >
                  <Text style={styles.startNowText}>YES</Text>
                  {loading ? (
                    <ActivityIndicator color={"#fff"} size={"small"} />
                  ) : null}
                </Button>
              </View>
            </View>
          </View>
        </>
      ) : null}
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
