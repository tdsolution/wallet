import {View} from 'react-native';
import React from 'react';
import styles from './styles';
const ExternalShadow = ({children, style, ...props}) => {
  return (
    <View style={{...styles.topShadow, ...style}}>
      <View style={[styles.bottomShadow, {...props}]}>{children}</View>
    </View>
  );
};

export default ExternalShadow;
