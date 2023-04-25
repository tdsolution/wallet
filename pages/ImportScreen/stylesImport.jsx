import {StyleSheet} from 'react-native';
import {trendyColor, height, width} from '../../assets/styles/common';

const stylesImport = StyleSheet.create({
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
  },

  buttonBack: {
    padding: 4,
  },

  main: {
    gap: 20,
    paddingHorizontal: width(2),
    paddingVertical: width(4),
  },

  buttonSwitchWrap: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  buttonSwitch: {
    width: '46%',
    height: 50,
  },
  title: {
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 28,
    lineHeight: 29,
    color: trendyColor.blueColor,
    marginBottom: 8,
  },

  innerShadow: {
    height: 50,
    backgroundColor: '#E6E7EE',
  },

  labelWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontWeight: '500',
    fontSize: 16,
    lineHeight: 20,
    color: trendyColor.textColor,
  },
  text: {
    textAlign: 'center',
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: 500,
    color: trendyColor.textColor,
  },
  textInput: {
    height: '100%',
    paddingHorizontal: width(3),
  },
  footer: {
    position: 'absolute',
    bottom: 35,
    left: 0,
    right: 0,
    paddingHorizontal: width(3),
  },
  button: {
    width: '100%',
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: 500,
    opacity: 0.95,
    textAlign: 'center',
    // color: trendyColor.textColor,
  },
});
export default stylesImport;
