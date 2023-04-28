import { Dimensions, StyleSheet } from "react-native";
import { trendyColor, height, width } from "../../assets/styles/common";
var fullWidth = Dimensions.get('window').width;


const StyleDiscover = StyleSheet.create({
    container: {
        paddingTop: height(1),
        paddingHorizontal: width(3),
      },
    
      backBtn: {
        width: 41,
        height: 41,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        // backgroundColor: 'red',
      },
    
      buttonBack: {
        padding: 4,
      },
    
      title: {
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 28,
        // lineHeight: 29,
        color: trendyColor.blueColor,
      },
    
      text: {
        textAlign: 'center',
        // paddingVertical: 5,
        fontSize: 16,
        fontWeight: 500,
        color: trendyColor.textColor,
      },
    
      textChart: {
        fontWeight: '800',
        fontSize: 20,
        color: trendyColor.blueColor,
        textAlign: 'left',
        paddingLeft: 5,
      },
    
      image: {
        resizeMode: 'cover',
      },
      //transaction
      menus: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: height(1),
        paddingHorizontal: width(3),
      },
    
      buttonMenu: {
        backgroundColor: trendyColor.primay,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
      },
    
      textShadow: {
        textShadowColor: 'rgba(38, 43, 70, 0.32)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1,
      },
    
      textButton: {
        fontSize: 14,
        marginLeft: width(1),
      },
    
      buttonFilter: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 70,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '700',
        color: trendyColor.textColor,
        paddingHorizontal: 6,
      },
    
      line: {
        width: fullWidth,
        backgroundColor: '#313650',
        height: height(0.2),
      },
    
      innnerShadow: {
        width: 35,
        height: 35,
        alignItem: 'center',
        justifyContent: 'center',
      },
    
      threeButtonWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        paddingHorizontal: width(3),
        marginVertical: width(2),
      },
    
      button: {
        height: 35,
        width: width(33),
        display: 'flex',
        // flex: 0,
        // flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: trendyColor.primay,
        borderRadius: width(3),
        paddingHorizontal: 1,
        gap: 2,
      },
    
      contentImage: {
        resizeMode: 'contain',
        width: '100%',
      },
    
      contentItem: {
        backgroundColor: '#E6E7EE',
        borderRadius: 14,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
        paddingRight: 10,
      },
    
      imageContentWrapper: {
        backgroundColor: ' rgba(0, 0, 0, 0.08)',
        width: 65,
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10,
        borderRightColor: '#525A80',
        borderRightWidth: 1,
      },
    
      contentMoney: {
        color: trendyColor.textColor,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500',
      },
    
      contentTwoItem: {
        justifyContent: 'center',
      },
    
      contentName: {
        color: trendyColor.textColor,
        fontWeight: '800',
        fontSize: 14,
        lineHeight: 30,
      },
    
      contentDateTime: {
        fontWeight: 400,
        fontSize: 14,
        lineHeight: 20,
        color: '#404358',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        gap: 4,
      },
    
      contentAmountName: {
        fontWeight: 400,
        fontSize: 14,
        lineHeight: 20,
        color: '#404358',
      },
    
      contentMoney: {
        fontWeight: 800,
        fontSize: 14,
        lineHeight: 30,
        // color: '#7593ff',
      },
      viewMore: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        paddingHorizontal: width(3),
        borderRadius: 16,
        borderColor: '#000',
        borderWidth: 1,
        marginTop: 10,
        // justifySelf: 'center',
        alignSelf: 'center',
      },
});
export default StyleDiscover;
