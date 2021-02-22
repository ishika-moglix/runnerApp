import React from "react";
import { View, Text, Image } from "react-native";
import { Right, Left, Header as Head, Icon, Title, Body } from "native-base";

export default Header = (props) => {
  return (
    <Head
      noShadow={props.noShadow}
      androidStatusBarColor={"grey"}
      style={{
        backgroundColor: "#fff",
      }}
    >
      <Left style={{ width: "50%" }}>
        {props.leftComponent ? <props.leftComponent /> : null}
      </Left>
      <Right style={{ width: "50%" }}>
        {props.rightComponent ? <props.rightComponent /> : null}
      </Right>
    </Head>
  );
};
