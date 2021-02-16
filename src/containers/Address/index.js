import React from "react";
import { Container, Icon } from "native-base";
import Header from "../../components/Header";
import { TouchableOpacity, View, Text, FlatList } from "react-native";
import AddressCard from "../../components/Cards/AddressCard";

export default AddressScreen = (props) => {
  const goBack = () => {
    props.navigation.goBack();
  };

  const renderCards = ({ item, index }) => {
    return <AddressCard item={item} />;
  };

  return (
    <Container
      style={{
        backgroundColor: "#F2F2F2",
      }}
    >
      <Header
        headertext={props.route.params.company}
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
          backgroundColor: "#fff",
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            color: "#303030",
            fontSize: 16,
          }}
        >
          ADDRESSES
        </Text>
        <Icon
          name={"directions"}
          type="FontAwesome5"
          style={{
            fontSize: 22,
            color: "#2680EB",
          }}
        />
      </View>
      <FlatList
        data={[props.route.params.data]}
        renderItem={renderCards}
        keyExtractor={(item, index) => `${index}-item`}
      />
    </Container>
  );
};
