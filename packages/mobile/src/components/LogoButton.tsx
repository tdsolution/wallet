import { useDeeplinking } from '$libs/deeplinking';
import React, {memo, useMemo} from 'react';
import { Steezy } from '$styles';
import { Text, TouchableOpacity } from '@tonkeeper/uikit';
import {Image, View} from 'react-native';
export const LogoButton = memo (() => {
   const deeplinking = useDeeplinking();
   const hitSlop = useMemo(()=> ({
    top:26,
    bottom: 26,
    left:26,
    right:26
   }), []);
   return (
      <TouchableOpacity
      onPress={()=>{}}
      style={styles.container}
      activeOpacity={0.6}
      hitSlop={hitSlop}
      > 
      <View style={{flexDirection:'row', alignItems:'center'}}>
         <Image source={require("../assets/logo/icon_logo_app.png")}  style={{width:50, height:50}} resizeMode='contain'/>
         <Text type='h3' fontSize={16} color="primaryColor">TD WALLET</Text>
      </View>
      </TouchableOpacity>
   );
});
const styles = Steezy.create({
   container:{
      zIndex:3,
   }
});