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
import { Col } from "native-base";

export default StyleSheet.create({
  modalWrap: {
    width: Dimensions.get("window").width,
    alignSelf: "center",
    borderTopLeftRadius: 18,
    borderTopRightRadius: 18,

    paddingTop: Dimension.padding20,
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
  },
  dateText: {
    color: Colors.PrimaryTextColor,
    fontSize: Dimension.font16,
    marginLeft: Dimension.margin20,
    marginRight: Dimension.margin20,
    fontFamily: Dimension.CustomMediumFont,
  },
  modalTopWrap: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: Dimension.padding15,
  },
  headingText: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomMediumFont,
    color: Colors.PrimaryTextColor,
    textAlignVertical: "center",
    flex: 8,
  },
  closeIcon: {
    color: Colors.PrimaryTextColor,
    fontSize: Dimension.font24,
    marginLeft: Dimension.margin15,
    flex: 1,
  },
  containercss: {
    backgroundColor: Colors.white,
    paddingVertical: Dimension.padding15,
    paddingHorizontal: Dimension.padding15,
  },
  uploadWrap: {
    flexDirection: "row",
  },
  CameraBtnWrap: {
    flex: 1,
    height: Dimension.height120,
    borderStyle: "dashed",
    backgroundColor: Colors.grayShadeforBG,
    borderColor: Colors.SecondaryTextColor,
    borderWidth: 1,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
    marginRight: Dimension.margin15,
  },
  galleryBtnWrap: {
    flex: 1,
    height: Dimension.height120,
    borderStyle: "dashed",
    backgroundColor: Colors.grayShadeforBG,
    borderColor: Colors.SecondaryTextColor,
    borderWidth: 1,
    borderRadius: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  cameraIcon: {
    fontSize: Dimension.font24,
    color: Colors.SecondaryTextColor,
  },
  cameraText: {
    fontSize: Dimension.font12,
    color: Colors.PrimaryTextColor,
    fontFamily: Dimension.CustomRegularFont,
    marginTop: Dimension.margin5,
  },
  imageWrap: {
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.BorderColor,
    position: "relative",
    marginRight: Dimension.margin20,
    width: Dimension.height80,
    height: Dimension.height80,
    alignItems: "center",
    justifyContent: "center",
  },
  imgCss: {
    width: Dimension.height60,
    height: Dimension.height60,
  },
  closeBtn: {
    position: "absolute",
    top: -Dimension.padding10,
    right: -Dimension.padding10,
  },
  closeSmallIcon: {
    fontSize: Dimension.font20,
    color: Colors.PrimaryTextColor,
  },
  footerCss: {
    backgroundColor: Colors.BorderColor,
    margin: Dimension.padding5,
    elevation: 0,
  },
  footerTabCss: {
    backgroundColor: Colors.BorderColor,
    elevation: 0,
  },
  disabledBtn: {
    backgroundColor: Colors.ExtralightGrayText,
    borderRadius: 4,
    height: Dimension.height45,
    elevation: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  EnabledBtn: {
    backgroundColor: Colors.RedThemeColor,
    borderRadius: 4,
    height: Dimension.height45,
    elevation: 0,
  },
  btntext: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.white,
  },

  //reason Model
  radioWrap: {
    paddingHorizontal: Dimension.padding15,
    paddingVertical: Dimension.padding20,
  },
  radioBtnWrap: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: Dimension.padding15,
    borderBottomColor: Colors.BorderColor,
    borderBottomWidth: 1,
  },
  radioText: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomRegularFont,
    color: Colors.PrimaryTextColor,
    marginLeft: Dimension.margin10,
  },
  radioBtn: {
    fontSize: Dimension.font22,
    color: Colors.RedThemeColor,
  },
});
