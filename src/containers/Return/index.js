import { Container, Icon } from "native-base";
import React from "react";
import { Image, TouchableOpacity, View, FlatList } from "react-native";

import CompanyCard from "../../components/Cards/CompayCard";
import Header from "../../components/Header";

let data = [
  {
    company: "ECS Company",
    items: 4,
  },
  {
    company: "ANU Enterprise",
    items: 3,
  },
  {
    company: "Papney & Co.",
    items: 5,
  },
];

export default DeliveryScreen = (props) => {
  const openDrawer = () => {
    props.navigation.openDrawer();
  };

  const renderCards = ({ item, index }) => {
    return (
      <CompanyCard type={"Return"} navigation={props.navigation} item={item} />
    );
  };

  return (
    <Container style={{ backgroundColor: "#F2F2F2" }}>
      <Header
        headertext={"Returns"}
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
        <FlatList
          data={data}
          renderItem={renderCards}
          keyExtractor={(item, index) => `${index}-item`}
        />
      </View>
    </Container>
  );
};
