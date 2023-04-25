import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  topShadow: {
    borderRadius: 10,
    shadowOffset: {
      width: -2,
      height: -2,
    },
    // shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowColor: 'rgba(255, 255, 255, 0.8)',
    elevation: 20,
    // backgroundColor: '#e6e7ee',
  },
  bottomShadow: {
    borderRadius: 10,
    padding: 10,
    shadowOffset: {
      width: 5,
      height: 5,
    },
    shadowOpacity: 0.6,
    shadowColor: 'rgba(83, 92, 136, 0.6)',
    shadowRadius: 10,
    elevation: 20,
    backgroundColor: '#e6e7ee',
  },
});

export default styles;
