import { Dimensions, StyleSheet } from "react-native";
import { trendyColor, height, width } from "../../assets/styles/common";
var fullHeight = Dimensions.get('window').height;


const StyleSetting = StyleSheet.create({
    container: {
        flex: 1,
        // height: '100%',
        maxHeight: fullHeight,
        backgroundColor: '#e6e7ee',
      },
    
      title: {
        fontWeight: '700',
        textAlign: 'center',
        fontSize: 28,
        // lineHeight: 29,
        color: trendyColor.blueColor,
      },
    
      button: {
        height: 50,
        display: 'flex',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: trendyColor.primay,
        borderRadius: width(3),
        paddingHorizontal: 1,
        gap: 6,
        position: 'relative',
      },
    
      contentImage: {
        resizeMode: 'contain',
        width: '100%',
      },
    
      line: {
        width: '100%',
        backgroundColor: '#313650',
        height: height(0.2),
      },
    
      innnerShadow: {
        width: 35,
        height: 35,
        alignItem: 'center',
        justifyContent: 'center',
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
});
export default StyleSetting;
