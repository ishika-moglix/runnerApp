import React from "react";
import { View } from "react-native";
import { Header as Head } from "native-base";

export default Header = (props) => {
  return (
    <Head
      noShadow={props.noShadow}
      androidStatusBarColor={"grey"}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#fff",
      }}
    >
      <View style={{ width: "50%" }}>
        {props.leftComponent ? <props.leftComponent /> : null}
      </View>
      <View style={{ width: "50%", alignItems: "flex-end" }}>
        {props.rightComponent ? <props.rightComponent /> : null}
      </View>
    </Head>
  );
};
