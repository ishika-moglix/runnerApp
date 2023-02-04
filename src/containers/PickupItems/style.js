import { StyleSheet, Dimensions, Platform, ImageEditor } from "react-native";

//import { FORMERR } from 'dns';
const IS_IOS = Platform.OS === "ios";
const { width: viewportWidth, height: viewportHeight } =
  Dimensions.get("window");

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

/********New imports******/
import Dimension from "../../Theme/Dimension";
import Colors from "../../Theme/Colors";

export default StyleSheet.create({
  ContainerCss: { backgroundColor: "#F7F7FA", position: "relative" },
  headerTitle: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomMediumFont,
    color: Colors.PrimaryTextColor,
    marginLeft: Dimension.margin12,
    textAlignVertical: "center",
  },
  backIconWrap: {
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon: { color: Colors.PrimaryTextColor, fontSize: Dimension.font24 },
  profileiconWrap: { alignItems: "center" },
  ProfileIcon: { color: Colors.PrimaryTextColor, fontSize: Dimension.font24 },
  tabName: { backgroundColor: Colors.white },
  tabStyle: {
    backgroundColor: Colors.white,
    borderLeftColor: Colors.white,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  activetab: {
    backgroundColor: Colors.white,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0,
    marginLeft: 0,
    marginRight: 0,
  },
  activetext: {
    color: Colors.RedThemeColor,
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomSemiBoldFont,
  },
  tabtext: {
    color: Colors.PrimaryTextColor,
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomRegularFont,
  },
  addressWrap: {
    paddingHorizontal: Dimension.padding15,
  },
  addressTopWrap: {
    paddingVertical: Dimension.padding15,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: Colors.BorderColor,
    borderBottomWidth: 1,
    justifyContent: "space-between",
  },
  addressTopText: {
    fontSize: Dimension.font14,
    color: Colors.Black,
    fontFamily: Dimension.CustomMediumFont,
  },
  diectionIcon: {
    fontSize: Dimension.font24,
    color: Colors.BlueText,
  },

  DeliveryItemWrap: {
    margin: Dimension.margin15,
  },

  footerWrap: {
    position: "absolute",
    bottom: 0,
    padding: Dimension.padding5,
    width: "100%",
    backgroundColor: Colors.BorderColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  DisbaledAttemptedBtn: {
    backgroundColor: Colors.white,
    borderRadius: 4,
    marginRight: Dimension.margin5,
    flex: 1,
    height: Dimension.height45,
  },
  DisbaledAttemptedBtntext: {},
  EnabledAttemptedBtn: {
    backgroundColor: Colors.white,
    borderRadius: 4,
    marginRight: Dimension.margin5,
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: Dimension.height45,
  },
  EnabledAttemptedBtntext: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.ExtralightGrayText,
  },

  EnabledDeliverdBtn: {
    backgroundColor: Colors.RedThemeColor,
    borderRadius: 4,
    flex: 1,
    height: Dimension.height45,
  },
  EnabledDeliverdBtnText: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.white,
  },
  DisabledDeliverdBtn: {
    backgroundColor: Colors.ExtralightGrayText,
    borderRadius: 4,
    flex: 1,
    height: Dimension.height45,
  },
  DisabledDeliverdBtnText: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.white,
  },
});
