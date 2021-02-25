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
  CompanyCardWrap:{
    marginBottom: Dimension.margin15,
    backgroundColor: "#fff",
    padding: Dimension.padding15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.BorderColor,
  },
  CompanyNameBold:{
    fontSize: Dimension.font14,
    color: Colors.Black,
    fontFamily:Dimension.CustomSemiBoldFont,
    borderBottomColor:Colors.BorderColor,
    borderBottomWidth:1,
    paddingBottom:Dimension.padding5
  },
  ItemTextBold:{
    fontSize: Dimension.font14,
    color: Colors.Black,
    fontFamily:Dimension.CustomSemiBoldFont,
    marginVertical:Dimension.margin15
  },
  CompanyNameLight:{
    fontSize: Dimension.font14,
    color: Colors.Black,
    fontFamily:Dimension.CustomRegularFont,
    borderBottomColor:Colors.BorderColor,
    borderBottomWidth:1,
    paddingBottom:Dimension.padding5
  },
  ItemTextLight:{
    fontSize: Dimension.font14,
    color: Colors.Black,
    fontFamily:Dimension.CustomRegularFont,
    marginVertical:Dimension.margin15
  },
  startNowBtn:{
    width: "100%",
    borderRadius: 8,
    backgroundColor: Colors.RedThemeColor,
    height:Dimension.height40,
    elevation:0
  },
  startNowText:{
    fontSize: Dimension.font14,
    color: Colors.white,
    fontFamily:Dimension.CustomSemiBoldFont,
    
  },
  yetToPickBtn:{
    width: "100%",
    borderRadius: 8,
    backgroundColor: Colors.LightRedThemeColor,
    height:Dimension.height40,
    elevation:0
  },
  yetToPickText:{
    fontSize: Dimension.font14,
    color: Colors.RedThemeColor,
    fontFamily:Dimension.CustomSemiBoldFont,
    
  },
  rightArrowIcon:{
    width:Dimension.width24,
    height:Dimension.width24
  },
 
  });
