import { StyleSheet, Dimensions, Platform } from 'react-native';


//import { FORMERR } from 'dns';
const IS_IOS = Platform.OS === 'ios';
const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}


/********New imports******/
import Dimension from '../../Theme/Dimension';
import Colors from '../../Theme/Colors';
import { Col } from 'native-base';

export default StyleSheet.create({
  ContainerCss: { backgroundColor: "#F7F7FA", position: 'relative' },
  CompanyCardWrap: {
    marginBottom: Dimension.margin15,
    backgroundColor: "#fff",
    padding: Dimension.padding15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.BorderColor,
  },
  CompanyNameBold: {
    fontSize: Dimension.font14,
    color: Colors.Black,
    fontFamily: Dimension.CustomSemiBoldFont,
    borderBottomColor: Colors.BorderColor,
    borderBottomWidth: 1,
    paddingBottom: Dimension.padding5
  },
  ItemTextBold: {
    fontSize: Dimension.font14,
    color: Colors.Black,
    fontFamily: Dimension.CustomSemiBoldFont,
    marginVertical: Dimension.margin15
  },
  CompanyNameLight: {
    fontSize: Dimension.font14,
    color: Colors.Black,
    fontFamily: Dimension.CustomRegularFont,
    borderBottomColor: Colors.BorderColor,
    borderBottomWidth: 1,
    paddingBottom: Dimension.padding5
  },
  ItemTextLight: {
    fontSize: Dimension.font14,
    color: Colors.Black,
    fontFamily: Dimension.CustomRegularFont,
    marginVertical: Dimension.margin15
  },
  startNowBtn: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: Colors.RedThemeColor,
    height: Dimension.height40,
    elevation: 0
  },
  startNowText: {
    fontSize: Dimension.font14,
    color: Colors.white,
    fontFamily: Dimension.CustomSemiBoldFont,

  },
  yetToPickBtn: {
    width: "100%",
    borderRadius: 8,
    backgroundColor: Colors.LightRedThemeColor,
    height: Dimension.height40,
    elevation: 0
  },
  yetToPickText: {
    fontSize: Dimension.font14,
    color: Colors.RedThemeColor,
    fontFamily: Dimension.CustomSemiBoldFont,

  },
  rightArrowIcon: {
    width: Dimension.width24,
    height: Dimension.width24
  },

  // address card Css
  addressCardWrap: {
    paddingLeft: 0, paddingRight: 0,
    paddingTop: Dimension.padding12, paddingBottom: Dimension.padding12,
  },
  addressCardItem: {
    paddingLeft: 0, paddingRight: 0,
    marginBottom: 0, marginTop: 0, paddingTop: Dimension.padding5, paddingBottom: Dimension.padding5
  },
  addresstext: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomRegularFont,
    color: Colors.PrimaryTextColor
  },
  colontext: {
    fontSize: Dimension.font16,
    fontFamily: Dimension.CustomMediumFont,
    color: Colors.PrimaryTextColor
  },
  leftWidth: {
    flex: 3
  },
  centerWidth: { flex: 1 },
  rightWidth: { flex: 7 },

  // Common card Css
  itemText: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomRegularFont,
    color: Colors.Black,
    flex: 7
  },
  quantityText: {
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomSemiBoldFont,
    color: Colors.PrimaryTextColor,
    flex: 2.2,
    textAlign: 'right',

  },
  checkboxWrap: {
    flex: 1
  },
  activeCheckBox: {
    color: Colors.RedThemeColor,
    fontSize: Dimension.font24
  },
  inActiveCheckBox: {
    color: Colors.PrimaryTextColor,
    fontSize: Dimension.font24
  },
  deliveryItemsWrap: { flexDirection: 'row', paddingVertical: Dimension.padding15, borderBottomColor: Colors.BorderColor, borderBottomWidth: 1 },

  //PIckupCardItem

  pickupCard:{
    
      flexDirection: "row",
      alignItems: "flex-start",
      paddingVertical: Dimension.padding15,
      borderBottomColor: Colors.BorderColor,
      borderBottomWidth: 1,
    
  },
  checkBoxWrap:{
    width: "10%",
  },
  checkboxIcon:{
   color: Colors.RedThemeColor,
  fontSize: Dimension.font24
 },
 pickUpRightPart:{
  flexDirection: "row",
  width: "90%",
  flexWrap: "wrap",
  justifyContent: "space-between",
},
PickupitemText: {
  fontSize: Dimension.font14,
  fontFamily: Dimension.CustomRegularFont,
  color: Colors.Black,

},
PickupquantityText: {
  fontSize: Dimension.font12,
  fontFamily: Dimension.CustomSemiBoldFont,
  color: Colors.PrimaryTextColor,
  

},
MinusdisabledQtyWrap:{
  width: 34,
  height: 34,
  alignItems: "center",
  borderColor: "#EFEFF4" ,
  borderWidth: 0.8,
  justifyContent: "center",
  backgroundColor:"#0000001A",
  borderRadius: 4,
},
MinusenableQtyWrap:{
  
    width: 34,
    height: 34,
    alignItems: "center",
    borderColor:"#278BED",
    borderWidth: 0.8,
    justifyContent: "center",
    backgroundColor:"#CBE4FF",
    borderRadius: 4,
  
},
minusQtyText:{
  alignSelf: "center",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: Dimension.font18,
  fontFamily:Dimension.CustomSemiBoldFont,
  color:Colors.PrimaryTextColor
},
qtyInputBox:{
  textAlign: "center",
  borderColor: "#278BED",
  borderWidth: 0.8,
  marginHorizontal: 4,
  borderRadius: 4,
  width: 68,
  height: 34,
  padding: 0,
  fontSize:Dimension.font14,
  color:Colors.PrimaryTextColor,
  fontFamily:Dimension.CustomMediumFont
}

});
