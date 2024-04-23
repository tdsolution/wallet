import { useDeeplinking } from '$libs/deeplinking';
import React, {memo, useMemo} from 'react';
import { Steezy } from '$styles';
import { Text, TouchableOpacity } from '@tonkeeper/uikit';
import {Image, View} from 'react-native';
import { useNavigation } from '@tonkeeper/router';
import { WalletStackRouteNames } from "$navigation";

export const NotificationButton = memo (() => {
   const navigation = useNavigation();
   const deeplinking = useDeeplinking();
   const hitSlop = useMemo(()=> ({
    top:26,
    bottom: 26,
    left:26,
    right:26
   }), []);
   return (
      <TouchableOpacity
      onPress={()=> navigation.navigate(WalletStackRouteNames.Notification)}
      style={styles.container}
      activeOpacity={0.6}
      hitSlop={hitSlop}
      > 
      <View style={{flexDirection:'row', alignItems:'center'}}>
         <Image source={require("../assets/icons_v1/icon_notification.png")}  style={{width:25, height:25}} resizeMode='contain'/>
      </View>
      </TouchableOpacity>
   );
});
const styles = Steezy.create({
   container:{
      zIndex:3,
   }
});