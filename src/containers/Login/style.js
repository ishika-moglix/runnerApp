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
  logoImage: { height: Dimension.height30, width: '100%', marginTop: Dimension.margin24 },
  logoWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  IllustrationWrap: {
    alignItems: "center",
    justifyContent: "center", paddingVertical: 100
  },
  IllustrationImg: { height: 197 },
  signInWrap: {
    position: "absolute", bottom: 0, left: 0, width: "100%", backgroundColor: "#fff", padding: Dimension.padding15, borderTopLeftRadius: 18, borderTopRightRadius: 18, shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.75,
    shadowRadius: 10,

    elevation: 10,
  },
  headingText: { fontSize: Dimension.font16, fontFamily: Dimension.CustomSemiBoldFont, marginBottom: Dimension.margin30 },
  inputErrorWrap: { marginBottom: Dimension.margin30, },
  ItemWrap: {
    borderWidth: 1,
    borderColor: Colors.lightGrayText,
    borderRadius: 8,
    backgroundColor: '#fff',
    position: 'relative'
  },
  errorCss: { borderColor: Colors.RedThemeColor },
  ItemCss: {

    paddingTop: 0,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    height: Dimension.height40,
    paddingVertical: 0, borderBottomWidth: 0,

    borderRadius: 8,
  },
  LabelCss: { backgroundColor: '#fff', marginHorizontal: Dimension.margin10, alignSelf: 'flex-start', fontSize: Dimension.font14, fontFamily: Dimension.CustomRegularFont, paddingTop: 3, paddingLeft: Dimension.padding5, paddingRight: Dimension.padding5, color: Colors.ExtralightGrayText, marginTop: 0, justifyContent: "center", paddingBottom: 0, opacity: 1 },

  inputCss: { marginTop: 0, marginTop: -Dimension.margin12, paddingBottom: 0, height: Dimension.height30, fontSize: Dimension.font14, color: Colors.PrimaryTextColor, fontFamily: Dimension.CustomRegularFont, width: '100%', paddingLeft: Dimension.padding10 },
  btnStyle: { backgroundColor: Colors.RedThemeColor, borderRadius: 8, height: Dimension.height40 },
  btnText: { fontSize: Dimension.font14, fontFamily: Dimension.CustomSemiBoldFont, color: "#fff", textTransform: 'uppercase' },

  LabelCss: { backgroundColor: '#fff', marginHorizontal: Dimension.margin10, alignSelf: 'flex-start', fontSize: Dimension.font14, fontFamily: Dimension.CustomRegularFont, paddingTop: 3, paddingLeft: Dimension.padding5, paddingRight: Dimension.padding5, color: Colors.ExtralightGrayText, marginTop: 0, justifyContent: "center", paddingBottom: 0, opacity: 1 },

  inputCss: { marginTop: 0, marginTop: -Dimension.margin12, paddingBottom: 0, height: Dimension.height30, fontSize: Dimension.font14, color: Colors.PrimaryTextColor, fontFamily: Dimension.CustomRegularFont, width: '100%', paddingLeft: Dimension.padding10 },
  ModalContainer:{
    backgroundColor:"#fff",
    padding:Dimension.padding12,
    borderRadius:8
  },
  issueTxt:{
    fontSize: Dimension.font16,
    fontFamily: Dimension.CustomSemiBoldFont, 
    color: Colors.PrimaryTextColor,
  },
  uploadUidTxt:{
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomMediumFont, 
    color: Colors.PrimaryTextColor,
    marginTop:Dimension.margin8,
  },
  uidtxt:{
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomBoldFont, 
    color: Colors.RedThemeColor
  },
  uploadBtn:{
    backgroundColor: Colors.white, 
    borderRadius: 8,
   
    justifyContent:"center",
   // height: Dimension.height40 ,
   
    marginTop:Dimension.margin20,
    paddingHorizontal:Dimension.padding15,
    alignSelf:"flex-end",
    paddingVertical:Dimension.padding10,
    borderWidth:1,
    borderColor:Colors.RedThemeColor,
  },
  uploadBtnTxt1:{
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomRegularFont,
    color:Colors.PrimaryTextColor,
  },
  uploadBtnTxt2:{
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomSemiBoldFont,
    color:Colors.RedThemeColor,
    textAlign:"left"
  },
  uploadBtnTxt:{
    fontSize: Dimension.font14,
    fontFamily: Dimension.CustomSemiBoldFont,
    color: "#fff"
  },
  uploadBtn1:{
    backgroundColor: Colors.PrimaryTextColor, 
    borderRadius: 8,
    alignContent:'center',
    alignItems:"center",
    justifyContent:"center",
    height: Dimension.height40 ,
    marginTop:Dimension.margin15,
    paddingHorizontal:Dimension.padding15,
    alignSelf:"flex-end"
  },


});
