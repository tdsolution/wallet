
import { StyleSheet } from 'react-native';
import { height, trendyColor, width } from '../../assets/styles/common';


const styles = StyleSheet.create({
  container: {
    flex:1,
    paddingTop: height(10),
    paddingHorizontal: width(12),
  },

  screen: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },


  title: {
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 24,
    lineHeight: 29,
    color: trendyColor.blueColor,
    marginBottom: 8,
    marginTop: 50,
  },

  textShadow: {
    textShadowColor: 'rgba(38, 43, 70, 0.32)',
    textShadowOffset: {width: 1, height: 1},
    textShadowRadius: 1,
  },

  button: {
    width: '100%',
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: 500,
    opacity: 0.95,
    textAlign: 'center',
    color: trendyColor.textColor,
  },

  footer: {
    position: 'absolute',
    bottom: 35,
    left: 0,
    right: 0,
  },
});

export default styles;
