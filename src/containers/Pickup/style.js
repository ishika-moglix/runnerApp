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

export default StyleSheet.create({
  ContainerCss: { backgroundColor: "#F7F7FA", position: 'relative' },
  headerTitle:{
    fontSize:Dimension.font14,
    fontFamily:Dimension.CustomMediumFont,
    color:Colors.PrimaryTextColor,
    marginLeft:Dimension.margin12,
    textAlignVertical:"center"
  },
  backIconWrap:{
    flexDirection: "row",
    alignItems: "center",
  },
  backIcon:{color:Colors.PrimaryTextColor,fontSize:Dimension.font24},
  profileiconWrap:{ alignItems: "center",},
  ProfileIcon:{color:Colors.PrimaryTextColor,fontSize:Dimension.font24},

  cardWrap:{
    marginBottom: Dimension.margin15,
    width: "100%",
    padding:Dimension.padding15 ,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#C4C4C4",
  },
  cardTitle:{
    fontSize: Dimension.font16,
    color: Colors.PrimaryTextColor,
    fontFamily:Dimension.CustomSemiBoldFont
  },
  rowWrap:{
    marginTop: Dimension.margin10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  normalText:{
    fontSize: Dimension.font14,
    color: Colors.PrimaryTextColor,
    fontFamily:Dimension.CustomRegularFont
  },
  BoldText:{
    fontSize: Dimension.font14,
    color: Colors.PrimaryTextColor,
    fontFamily:Dimension.CustomSemiBoldFont
  },
  lightGarytext:{
    fontSize: Dimension.font12,
    color: Colors.lightGrayText,
    fontFamily:Dimension.CustomRegularFont
  },
  viewListBtn:{
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop:Dimension.margin15
  },
  RedBoldText:{
    fontSize: Dimension.font14,
    color: Colors.RedThemeColor,
    fontFamily:Dimension.CustomSemiBoldFont
  },
  rightArrowIcon:{
    width:Dimension.width24,
    height:Dimension.width24
  },
  dateText:{
    color: Colors.PrimaryTextColor,
    fontSize:Dimension.font16,
    marginLeft:Dimension.margin20,
    marginRight:Dimension.margin20,
    fontFamily:Dimension.CustomMediumFont
 
  }
  });
