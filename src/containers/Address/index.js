import React, { useState } from "react";
import { connect } from "react-redux";
import { Container, Icon, Tab, TabHeading, Tabs } from "native-base";
import Header from "../../components/Header";
import { TouchableOpacity, View, Text, FlatList, Image } from "react-native";
import AddressCard from "../../components/Cards/AddressCard";

const AddressScreen = (props) => {
  const [activeTab, setActiveTab] = useState(0);

  const renderAddress = () => {
    return (
      <View
        style={{
          borderTopLeftRadius: 18,
          borderTopRightRadius: 18,
          backgroundColor: "#fff",
          flex: 1,
        }}
      >
        <View
          style={{
            marginHorizontal: 20,
            paddingVertical: 20,
            flexDirection: "row",
            alignItems: "center",
            borderBottomColor: "#e7e7e7",
            borderBottomWidth: 0.6,
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
            Address
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
      </View>
    );
  };

  const TABS = [
    {
      heading: "Delivery Address",
      render: () => renderAddress(),
    },
    {
      heading: "Delivery Items",
      render: () => <View />,
    },
  ];

  const goBack = () => {
    props.navigation.goBack();
  };

  const renderCards = ({ item, index }) => {
    return <AddressCard item={item} />;
  };

  return (
    <Container
      style={{
        backgroundColor: "#F7F7FA",
      }}
    >
      <Header
        noShadow={true}
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
        leftComponent={() => (
          <TouchableOpacity
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
            onPress={goBack}
          >
            <Icon name={"arrow-left"} type={"MaterialCommunityIcons"} />
            <Image
              style={{ width: 60, height: 20, marginLeft: 12 }}
              source={require("../../assets/moglix-logo.jpg")}
            />
            <Text
              style={{
                fontSize: 14,
                fontWeight: "bold",
              }}
            >
              Runner
            </Text>
          </TouchableOpacity>
        )}
      />
      <Tabs
        onChangeTab={(tab) => {
          setActiveTab(tab.i);
        }}
        tabBarUnderlineStyle={{
          backgroundColor: "#D9232D",
          height: 2,
        }}
      >
        {TABS.map((tab, index) => (
          <Tab
            style={{ backgroundColor: "#fff" }}
            heading={
              <TabHeading style={{ backgroundColor: "#fff" }}>
                <Text
                  style={{
                    fontWeight: activeTab !== index ? "normal" : "bold",
                    color: activeTab === index ? "#D9232D" : "#000",
                    fontSize: 16,
                  }}
                >
                  {tab.heading}
                </Text>
              </TabHeading>
            }
          >
            {tab.render()}
          </Tab>
        ))}
      </Tabs>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  home: state.home,
});

export default connect(mapStateToProps, null)(AddressScreen);
