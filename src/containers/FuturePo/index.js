import React, { useEffect, useState, useCallback } from "react";
import { Container, Icon, Item, Input, Button } from "native-base";
import { View, TouchableOpacity, Text, Image } from "react-native";
import Header from "../../components/Header";
import styles from "./styles";
import debounce from "lodash.debounce";

const FuturePO = (props) => {
  const {
    navigation: { navigate },
  } = props;
  const [search, setSearch] = useState("");

  useEffect(() => {
    searchValidator(search);
  }, []);

  const searchValidator = (text) => {
    if (text) {
      onSearch(text);
    } else {
      //   props.fetchPickupTask(props.route.params.data.id, text);
    }
  };

  const goBack = () => {
    props.navigation.goBack();
  };

  const onSearch = useCallback(
    debounce((searchText) => {
      //   props.fetchPickupTask(props.route.params.data.id, searchText);
    }, 1000),
    []
  );

  const startSearch = (text) => {
    setSearch(text);
    searchValidator(text);
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
        <Button
          block
          onPress={() =>
            props.type == "Pickup"
              ? props.navigation.navigate("Pickup-Tasks", {
                  company: props.utem.contactName,
                  type: props.type,
                  data: props.item,
                })
              : null
          }
          style={styles.startNowBtn}
        >
          <Text style={styles.startNowText}>SEARCH SUPPLIER PO</Text>
        </Button>
      </View>
    </Container>
  );
};

export default FuturePO;
