import React from 'react';
import InsetShadow from 'react-native-inset-shadow';

import styles from './styles';

const InternalShadow = ({children, style}) => {
  return (
    <InsetShadow
      children={InsetShadowBottom(children)}
      containerStyle={{...styles.shadow, ...style}}
      shadowRadius={10}
      shadowOffset={25}
      elevation={20}
      shadowOpacity={0.5}
      shadowColor="rgb(38, 49, 105,0.5)"
      right={false}
      bottom={false}
      borderRadius={10}
    />
  );
};
const InsetShadowBottom = children => {
  return (
    <InsetShadow
      children={children}
      containerStyle={{
        width: '100%',
        height: '100%',
        borderRadius: 5,
        alignItem: 'center',
        justifyContent: 'center',
      }}
      shadowRadius={10}
      shadowOffset={25}
      elevation={20}
      shadowOpacity={1}
      shadowColor="#fff"
      top={false}
      left={false}
      borderRadius={10}
    />
  );
};
export default InternalShadow;
