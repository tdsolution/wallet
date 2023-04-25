import {Dimensions, PixelRatio} from 'react-native';

const MYWIDTH = Dimensions.get('window').width;
const MYHEIGHT = Dimensions.get('window').height;

export const width = num =>
  PixelRatio.roundToNearestPixel(MYWIDTH * (num / 100));
export const height = num =>
  PixelRatio.roundToNearestPixel(MYHEIGHT * (num / 100));

export const trendyColor = {
  primay: '#E6E7EE',
  textColor: '#404358',
  blueColor: '#8f9ff8',
  blueText: '#7593FF',
  greenText: '#48FFDE',
};
