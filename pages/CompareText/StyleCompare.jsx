import {StyleSheet, Dimensions} from 'react-native';
import {trendyColor, height, width} from '../../assets/styles/common';

var fullWidth = Dimensions.get('window').width;
var fullHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    paddingTop: height(1),
    width: fullWidth,
    height: fullHeight,
    paddingHorizontal: width(3),
  },

  backBtn: {
    width: 41,
    height: 41,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

  buttonBack: {
    padding: 4,
  },

  content: {
    paddingTop: height(3),
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
  },

  body: {
    color: trendyColor.textColor,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
  },

  areaContainer: {
    marginVertical: height(3),
    width: '100%',
    height: height(25),
  },

  area: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: width(1.75),
    rowGap: height(1),
    marginVertical: height(0.8),
  },

  buttonCheck: {
    height: 25,
    backgroundColor: '#E6E7EE',
    width: width(25),
    textAlign: 'center',
    lineHeight: 25,
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
    paddingHorizontal: width(3),
  },
});

export default styles;
