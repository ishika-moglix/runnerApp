import { StyleSheet, Dimensions, Platform } from "react-native";

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
  container: {
    padding: Dimension.padding20,
    position:"relative"
  },
  cardWrap: {
    marginBottom: Dimension.margin15,
    width: "100%",
    padding: Dimension.padding15,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#C4C4C4",
    flexDirection:"row"
  },
  cardTitle: {
    fontSize: Dimension.font16,
    color: Colors.PrimaryTextColor,
    fontFamily: Dimension.CustomSemiBoldFont,
  },
  rowWrap: {
    marginTop: Dimension.margin10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  normalText: {
    fontSize: Dimension.font14,
    color: Colors.PrimaryTextColor,
    fontFamily: Dimension.CustomRegularFont,
  },
  BoldText: {
    fontSize: Dimension.font14,
    color: Colors.PrimaryTextColor,
    fontFamily: Dimension.CustomSemiBoldFont,
  },
  lightGarytext: {
    fontSize: Dimension.font12,
    color: Colors.lightGrayText,
    fontFamily: Dimension.CustomRegularFont,
  },
  viewListBtn: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: Dimension.margin15,
  },
  RedBoldText: {
    fontSize: Dimension.font14,
    color: Colors.RedThemeColor,
    fontFamily: Dimension.CustomSemiBoldFont,
  },
  rightArrowIcon: {
    width: Dimension.width24,
    height: Dimension.width24,
  },
  dateText: {
    color: Colors.PrimaryTextColor,
    fontSize: Dimension.font16,
    marginLeft: Dimension.margin20,
    marginRight: Dimension.margin20,
    fontFamily: Dimension.CustomMediumFont,
  },
  startNowBtn: {
    marginTop: Dimension.margin10,
    width: "100%",
    borderRadius: 8,
    backgroundColor: Colors.RedThemeColor,
    height: Dimension.height40,
    elevation: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  startNowText: {
    fontSize: Dimension.font14,
    color: Colors.white,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginRight: Dimension.margin10,
  },

  bottomAction:{
    position:"absolute",
    width:"100%",
    left:0,
    bottom:0
  },
  footerCss:{
    backgroundColor:"#fff",
    borderTopColor:"#ccc",
    borderTopWidth:1,
    padding:Dimension.padding10,
    margin:0,
   //height:60

  },
  footerTxt:{
    fontSize: Dimension.font14,
    color: Colors.PrimaryTextColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    //marginRight: Dimension.margin10,
  },
  graybtn:{
    marginTop: Dimension.margin10,
    width: "100%",
    borderRadius: 8,
    backgroundColor: Colors.white,
    borderWidth:1,
    borderColor:'#CFD2E2',
    height: Dimension.height40,
    elevation: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  graybtnTxt:{
    fontSize: Dimension.font14,
    color: Colors.PrimaryTextColor,
    fontFamily: Dimension.CustomSemiBoldFont,
  },
  scrollviewCss:{
    paddingVertical:Dimension.padding15
  },
  poidtxt:{
    fontSize: Dimension.font14,
    color: Colors.PrimaryTextColor,
    fontFamily: Dimension.CustomSemiBoldFont,
    backgroundColor:Colors.white,
    paddingHorizontal:Dimension.padding15,
    paddingVertical:Dimension.padding4,
    paddingTop:8,
    borderRadius:4,
    alignSelf:"flex-start",
    borderWidth:1,
    borderColor:Colors.ExtralightGrayText,
    
  },
});
