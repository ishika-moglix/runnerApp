/**
 * This file defines the base application styles.
 *
 * Use it to define generic component styles (e.g. the default text styles, default button styles...).
 */
import {StyleSheet, Dimensions, Platform} from 'react-native';
import Fonts from 'App/Theme/Fonts';
import {Right} from 'native-base';
import Dimension from 'App/Theme/Dimension';
import Colors from 'App/Theme/Colors';
// import ApplicationStyles from 'App/Theme/ApplicationStyles'
const IS_IOS = Platform.OS === 'ios';
const {width: viewportWidth, height: viewportHeight} = Dimensions.get('window');

function wp(percentage) {
  const value = (percentage * viewportWidth) / 100;
  return Math.round(value);
}

const slideHeight = viewportHeight * 0.36;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);

export const sliderWidth = viewportWidth;
export const itemWidth = slideWidth + itemHorizontalMargin * 2;

export default {
  screen: {
    container: {
      flex: 1,
    },
  },
  carousel: {
    container: {
      // ...ApplicationStyles.screen.container,
      flex: 1,
      top: 200,
      // justifyContent: 'center',
    },
    item: {
      width: viewportWidth - 60,
      height: viewportHeight - 60,
    },
    carousel: {
      flex: 1,
      backgroundColor: 'red',
    },
    tile: {
      flex: 1,
      width: Dimensions.get('window').width * 0.85,
      backgroundColor: 'yellow',
    },
    imageContainer: {
      flex: 1,
      // marginBottom: Platform.select({ ios: 0, android: 1 }), // Prevent a random Android rendering issue
      backgroundColor: 'white',
      borderRadius: 8,
    },
    image: {
      // ...StyleSheet.absoluteFillObject,
      resizeMode: 'center',
    },
  },
  login: {},
  SideBar: {
    MenuIcon: {
      color: '#303030',
      marginLeft: Fonts.style.margin10,
      marginRight: Fonts.style.margin18,
    },
    Menutext: {
      color: '#000',
      fontSize: Fonts.style.font14.fontSize,
      fontFamily: 'roboto',
      lineHeight: 19,
    },
    TopMenu: {
      paddingTop: 20,
      paddingBottom: 20,
      paddingLeft: 20,
      paddingRight: 20,
      backgroundColor: '#F2F2F2',
      fontSize: Fonts.style.font18.fontSize,
      fontFamily: 'roboto',
      fontWeight: 'bold',
    },
    TopMenuInner: {
      marginLeft: Fonts.style.margin40,
      marginTop: -25,
      color: '#3E3E3E',
      flex: 0.5,
    },
    TopmenuIcon: {paddingRight: Fonts.style.padding20},
  },
  productScreen: {
    ProductDetailWrap: {
      backgroundColor: '#fdfdfd',
      paddingTop: 15,
      paddingBottom: 10,
      paddingLeft: 20,
      paddingRight: 20,
      alignItems: 'center',
      marginBottom: Fonts.style.margin15,
    },
    ProductNameStyle: {
      fontSize: Fonts.style.normal.fontSize,
      fontFamily: 'roboto',
      color: '#303030',
      fontWeight: 'bold',
      marginBottom: Fonts.style.margin10,
    },
    reviewSummary: {
      backgroundColor: '#5BA621',
      borderRadius: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 5,
      paddingBottom: 5,
      height: 30,
    },
    reviewSummarytext: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: Fonts.style.font12.fontSize,
      fontFamily: 'roboto',
    },
    reviewstar: {
      color: '#FFFFFF',
      fontWeight: 'bold',
      marginLeft: Fonts.style.margin10,
      paddingLeft: 10,
      fontSize: Fonts.style.normal.fontSize,
      fontFamily: 'roboto',
    },
    StockAvailability: {
      color: '#5BA621',
      fontSize: Fonts.style.font14.fontSize,
      fontFamily: 'roboto',
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    reviewCount: {
      color: 'rgba(48, 48, 48, .5)',
      fontSize: Fonts.style.font10.fontSize,
      fontFamily: 'roboto',
    },
    ItemCode: {
      color: 'rgba(48, 48, 48, 1)',
      fontSize: Fonts.style.font10.fontSize,
      fontFamily: 'roboto',
    },
    shareBtn: {
      textalign: 'Right',
      fontWeight: 'bold',
      color: 'rgba(43, 43, 43, 1)',
      fontSize: 28,
      fontFamily: 'roboto',
    },
    PrdActualPrice: {
      color: 'rgba(48, 48, 48, .5)',
      fontSize: Fonts.style.font14.fontSize,
      fontFamily: 'roboto',
      textalign: 'left',
      textDecorationLine: 'line-through',
    },
    Prdoff: {
      color: 'rgba(91, 166, 33, 1)',
      fontSize: Fonts.style.font14.fontSize,
      fontFamily: 'roboto',
      marginLeft: Fonts.style.margin10,
    },
    PrdOfferPrice: {
      color: 'rgba(48, 48, 48, 1)',
      fontSize: Fonts.style.font20.fontSize,
      fontFamily: 'roboto',
      fontWeight: 'bold',
    },
    PrdTaxGst: {
      color: 'rgba(48, 48, 48, 1)  ',
      fontSize: Fonts.style.font14.fontSize,
      fontFamily: 'roboto',
      //  backgroundColor:"#000",
      //color:'#fff'
      marginTop: -18,
      marginLeft: -10,
    },
    PrdPriceWrap: {
      alignItems: 'flex-start',
      paddingBottom: 20,
    },
    descWrap: {marginTop: Fonts.style.margin15},
    // borderWidth: 1, borderRadius: 3, borderColor: 'rgba(149, 165, 166, 0.3)'
    DescriptionInnerWrap: {
      width: 100,
      height: 1,
      backgroundColor: 'rgba(44, 62, 80, 0.5)',
      marginLeft: 0,
      marginBottom: Fonts.style.margin10,
    },
    DescTitle: {
      marginBottom: Fonts.style.margin8,
      fontSize: Fonts.style.font18.fontSize,
      fontWeight: 'bold',
      color: '#303030',
      paddingRight: 15,
      textTransform: 'uppercase',
      fontFamily: 'roboto',
    },
    descriptionText: {
      fontSize: Fonts.style.font14.fontSize,
      lineHeight: 20,
      color: '#303030',
      fontFamily: 'roboto',
    },
    PinCodeWrap: {
      backgroundColor: '#fff',
      paddingBottom: 15,
      paddingTop: 15,
      marginBottom: Fonts.style.margin15,
    },
    inputWrap: {
      backgroundColor: 'rgba(65, 123, 253, .10)',
      paddingTop: 10,
      paddingBottom: 20,
      paddingLeft: 15,
      paddingRight: 15,
    },
    IconStyle: {color: 'rgba(0, 109, 240, 1)'},
    pinBtn: {color: 'rgba(13, 153, 255, 1)'},
    PinBottomtext: {
      marginLeft: Fonts.style.margin40,
      color: 'rgba(48, 48, 48, .5)',
      marginTop: -30,
    },
    CodSuccessText: {
      marginLeft: Fonts.style.margin40,
      color: '#5ba621',
      marginTop: Fonts.style.margin10,
    },
    CodFailureText: {
      marginLeft: Fonts.style.margin40,
      color: '#ff0000',
      marginTop: Fonts.style.margin10,
    },
    SpecificationWrap: {
      backgroundColor: '#fff',
      paddingTop: 15,
      paddingBottom: 15,
    },
    specKey: {
      fontSize: Fonts.style.font14.fontSize,
      paddingLeft: 15,
      paddingRight: 15,
      fontFamily: 'roboto',
    },
    SpecVal: {
      fontSize: Fonts.style.font14.fontSize,
      paddingLeft: 15,
      paddingRight: 15,
      fontFamily: 'roboto',
    },
    colWrap: {
      flex: 1,
      justifyContent: 'center',
      paddingBottom: 10,
      paddingTop: 10,
      borderColor: 'rgba(199, 199, 199, 1)',
      borderWidth: 1,
      borderStyle: 'dotted',
      borderRadius: 1,
    },
    reviewWrap: {
      marginTop: Fonts.style.margin15,
      backgroundColor: '#fff',
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    reviewInner: {
      borderTopWidth: 1,
      borderRadius: 1,
      borderTopStyle: 'dotted',
      borderTopColor: '#707070',
    },
    dealsWrap: {
      marginBottom: Fonts.style.margin15,
      backgroundColor: '#fff',
      paddingTop: 15,
      paddingBottom: 15,
    },
    dealInnerWrap: {
      flex: 1,
      flexWrap: 'wrap',
      alignContent: 'flex-start',
      flexDirection: 'row',
      DealTxt: {
        fontSize: Fonts.style.font14.fontSize,
        lineHeight: 19,
        color: '#303030',
        fontFamily: 'roboto',
      },
      DealCode: {fontWeight: 'bold'},
      borderBottomColor: '#E3E3E3',
      borderBottomWidth: 1,
      paddingVertical: 10,
      paddingHorizontal: 20,
    },
    DealImg: {color: '#000'},
    DealLink: {color: '#0D99FF', fontSize: 30, fontFamily: 'roboto'},
    reviewBtn: {
      marginTop: Fonts.style.margin15,
      marginBottom: Fonts.style.margin15,
      backgroundColor: 'rgba(48, 48, 48, 1)',
    },
    // reviewInner:{ borderBottomWidth:1, borderBottomColor:'rgba(112, 112, 112, 1)'},
    reviewerName: {
      color: 'rgba(48, 48, 48, 1)',
      marginBottom: Fonts.style.margin8,
    },
    reviewerDate: {
      color: 'rgba(48, 48, 48, .5)',
      marginBottom: Fonts.style.margin8,
    },
    reviewerTitle: {
      color: 'rgba(48, 48, 48, 1)',
      marginBottom: Fonts.style.margin8,
      fontWeight: 'bold',
      fontSize: Fonts.style.font18.fontSize,
      fontFamily: 'roboto',
    },
    reviewerText: {
      color: 'rgba(48, 48, 48, 1)',
      marginBottom: Fonts.style.margin8,
      fontSize: Fonts.style.font14.fontSize,
      fontFamily: 'roboto',
    },
    startIcon: {
      color: 'rgba(253, 185, 44, 1)',
      marginRight: Fonts.style.margin8,
    },
    likeDislikeBtn: {
      borderWidth: 1,
      borderColor: 'rgba(112, 112, 112, 1)',
      color: 'rgba(165, 165, 165, 1)',
      paddingBottom: 16,
      paddingTop: 16,
      paddingLeft: 16,
      paddingRight: 16,
      marginRight: Fonts.style.margin10,
    },

    servicetext: {
      color: '#303030',
      fontWeight: 'bold',
      fontSize: Fonts.style.font14.fontSize,
      fontFamily: 'roboto',
    },
    QuoteBtn: {
      color: 'rgba(13, 153, 255, 1)',
      fontWeight: 'bold',
      fontSize: Fonts.style.font12.fontSize,
      textalign: Right,
      fontFamily: 'roboto',
    },
  },
  orderScreen: {
    orderImg: {width: 100, height: 100, borderWidth: 1, borderColor: '#949494'},
    prdName: {
      marginLeft: -30,
      fontSize: Fonts.style.font16.fontSize,
      fontWeight: '200',
      fontFamily: 'roboto',
    },
    prdBrand: {
      fontSize: Fonts.style.font14.fontSize,
      marginTop: 1,
      marginLeft: -30,
      color: '#949494',
      fontFamily: 'roboto',
    },
    prdBrandName: {
      fontSize: Fonts.style.font16.fontSize,
      marginTop: 1,
      color: '#000',
      marginLeft: Fonts.style.margin10,
      fontFamily: 'roboto',
    },
    prdQuantity: {
      color: '#000',
      marginLeft: -30,
      fontSize: Fonts.style.font14.fontSize,
      fontWeight: '200',
      fontFamily: 'roboto',
    },
    prdprice: {
      fontWeight: 'bold',
      fontSize: Fonts.style.font18.fontSize,
      marginLeft: -30,
      marginRight: Fonts.style.margin10,
      color: 'rgba(43, 43, 43, 1)',
      fontFamily: 'roboto',
    },
    prdGst: {
      marginLeft: Fonts.style.margin10,
      marginTop: Fonts.style.margin5,
      color: 'rgba(48, 48, 48, .5)',
      marginTop: 4,
    },
    textWrap: {flexDirection: 'row', marginTop: Fonts.style.margin5},
  },
  ToastCss: {
    ToastBtn: {
      color: Colors.white,
      fontSize: Dimension.font12,
      fontFamily: Dimension.CustomSemiBoldFont,
    },
    ToastText: {
      color: Colors.white,
      fontSize: Dimension.font12,
      fontFamily: Dimension.CustomSemiBoldFont,
    },
    SuccessToastWrap: {
      marginTop: Dimension.margin30,
      backgroundColor: '#303030',
      borderRadius: 8,
      width: '90%',
      justifyContent: 'center',
      alignSelf: 'center',
      zIndex: 1999999,
    },
    FailureToastWrap: {
      marginTop: Dimension.margin30,
      backgroundColor: Colors.RedThemeColor,
      borderRadius: 8,
      width: '90%',
      justifyContent: 'center',
      alignSelf: 'center',
      zIndex: 99999999999999999999,
      position: 'absolute',
    },
    GstToastText: {
      color: Colors.PrimaryTextColor,
      fontSize: Dimension.font12,
      fontFamily: Dimension.CustomSemiBoldFont,
    },
  },
  GstToastWrap: {
    marginBottom: Dimension.margin30,
    backgroundColor: '#FFEBE0',
    borderRadius: 8,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
    zIndex: 99999999999999999999,
    position: 'absolute',
    borderColor: '#F5681E',
    borderWidth: 1,
  },
};
