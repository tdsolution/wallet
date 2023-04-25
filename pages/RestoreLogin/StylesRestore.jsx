import {StyleSheet, Dimensions} from 'react-native';
import {trendyColor, height, width} from '../../assets/styles/common';
const text = {
  textAlign: 'center',
  paddingVertical: 10,
  fontSize: 16,
  fontWeight: 500,
  color: trendyColor.textColor,
};
const styles = StyleSheet.create({
  text,
  warningText: {
    ...text,
    color: trendyColor.blueColor,
  },
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

  buttonCopy: {
    marginTop: height(3),
  },

  allPhrases: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: width(1),
    rowGap: height(1),
    marginVertical: height(2),
  },

  innerShadow: {
    height: 40,
    backgroundColor: '#E6E7EE',
    width: width(28),
  },

  title: {
    marginTop: height(4),
    fontWeight: '700',
    textAlign: 'center',
    fontSize: 28,
    lineHeight: 29,
    color: trendyColor.blueColor,
    marginBottom: 8,
  },
  // warningOfShadow: {
  //   marginTop: height(2),
  //   height: 'auto',
  //   paddingVertical: height(2),
  //   paddingHorizontal: width(3),
  //   backgroundColor: '#ffc107',
  // },
  warningWrap: {
    alignItems: 'center',
    paddingHorizontal: width(4),
    marginTop: height(4),
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
