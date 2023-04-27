import { StyleSheet } from "react-native";

const StyleTab = StyleSheet.create({
    wrap: {
        backgroundColor: '#E6E7EE',
        borderRadius: 10,
        height: 35,
        width: 35,
        alignItems: 'center',
        justifyContent: 'center',
      },
    
      image: {
        resizeMode: 'cover',
        width: '65%',
        height: '65%',
      },
    
      innnerShadow: {
        width: 55,
        height: 55,
        alignItem: 'center',
        justifyContent: 'center',
      },
    
      contentImage: {
        resizeMode: 'contain',
        width: '100%',
        height: '50%',
      },
});
export default StyleTab;
