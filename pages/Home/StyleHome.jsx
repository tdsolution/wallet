import {Dimensions, StyleSheet} from 'react-native';
import {trendyColor, height, width} from '../../assets/styles/common';
// Dimensions README.md
var fullWidth = Dimensions.get('window').width;
var fullHeight = Dimensions.get('window').height;

const StyleHome = StyleSheet.create({
    container: {
        flex: 1,
        // height: '100%',
        maxHeight: fullHeight,
        backgroundColor: trendyColor.primary,
      },
      card: {
        backgroundColor: '#e6e7ee',
        display: 'flex',
        // flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 20,
        paddingHorizontal: 18,
        paddingVertical: 24,
      },
      text: {
        fontWeight: '700',
        fontSize: 30,
        flex: 1,
        alignItems: 'center',
        color: '#8f9ff8',
      },
    
      image: {
        flex: 1,
        resizeMode: 'contain',
        paddingRight: width(2),
      },
    
      button: {
        height: 35,
        width: width(25),
        display: 'flex',
        // flex: 0,
        // flexGrow: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: trendyColor.primay,
        borderRadius: width(3),
        paddingHorizontal: 2,
        gap: 2,
      },
    
      buttonMenu: {
        backgroundColor: trendyColor.primay,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 25,
        height: 25,
      },
    
      buttonAZ: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 70,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '700',
        color: trendyColor.textColor,
        paddingHorizontal: 10,
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
    
      line: {
        width: fullWidth,
        backgroundColor: '#313650',
        height: height(0.2),
      },
    
      menus: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: height(1),
        paddingHorizontal: width(3),
      },
    
      contentItem: {
        backgroundColor: '#E6E7EE',
        borderRadius: 14,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 60,
      },
    
      contentNameorTotal: {
        color: trendyColor.textColor,
        fontWeight: '800',
        fontSize: 14,
        lineHeight: 20,
        marginBottom: 5,
      },
    
      contentPriceorPercentage: {
        fontSize: 14,
        lineHeight: 20,
        color: '#48FFDE',
        fontWeight: '500',
      },
    
      contentImage: {
        resizeMode: 'contain',
        height: 20,
        width: '100%',
      },
    
      contentMoney: {
        color: trendyColor.textColor,
        fontSize: 14,
        lineHeight: 20,
        fontWeight: '500',
      },
    
      contentTwoItem: {
        minWidth: 70,
        position: 'relative',
        justifyContent: 'center',
      },
    
      chart: {},
    
      innnerShadow: {
        width: 40,
        height: 40,
        alignItem: 'center',
        // padding: 5,
        justifyContent: 'center',
      },
    
      threeButtonWrap: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        // alignItems: 'center',
        paddingHorizontal: width(3),
        marginVertical: width(2),
      },
});
export default StyleHome;
