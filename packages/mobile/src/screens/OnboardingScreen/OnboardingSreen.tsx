import {
  Screen,
  View,
  Steezy,
  Text,
  Spacer,
  Button,
  deviceHeight,
  deviceWidth
} from '@tonkeeper/uikit';
import { t } from '@tonkeeper/shared/i18n';
import { useWindowDimensions,Image, ImageBackground } from 'react-native';
import Svg from 'react-native-svg';
 import { memo, useCallback } from 'react';
 import { useNavigation } from '@tonkeeper/router';
 import { useDispatch } from 'react-redux';
import { MainStackRouteNames } from '$navigation';
 const HEIGHT_RATIO = deviceHeight / 844;
export const OnboardingScreen = memo (() => {
  const dimensions = useWindowDimensions();
  const dispatch = useDispatch();
  const nav = useNavigation();
    const handleCreatePress = useCallback(() => {
    nav.navigate(MainStackRouteNames.Start);
  }, [dispatch, nav]);
  return (
    <Screen>
        <View  style={{ flex: 1, backgroundColor:'#FAFAFA' }}>
          <View
          style={{
            height:340 * HEIGHT_RATIO,
            backgroundColor:"#4871EA",
            justifyContent: 'center', // căn giữa theo chiều dọc
            alignItems: 'center',
            display:'flex',
            flexDirection:'column'
          }}
        >
          <View style={styles.info}>
            <Text type="h2" textAlign="center" fontSize={28 * HEIGHT_RATIO} lineHeight= {30 * HEIGHT_RATIO}>
              TD Wallet
            </Text>
          </View>
          <View style={styles.imageEther}>
             <Image source={require('../../assets/logo/ether.png')} resizeMode="contain" style={{height:160 * HEIGHT_RATIO, width:'40%'}}/>
          </View>
        </View>
        <View style={{alignItems:'center', width: '100%'}}>
           <ImageBackground source={require('../../assets//logo/path.png')} resizeMode="cover" style={{width:'100%', height:175 * HEIGHT_RATIO}}/>
        </View>
        <View style={styles.contentText}>
          <Text style={{color:'#4871EA', fontSize: 26* HEIGHT_RATIO,textAlign: "left"}} lineHeight= {30 * HEIGHT_RATIO}>Investing in cryptocurrency made easy.</Text>
        </View>
        <View style={styles.content}>
          <View style={styles.buttons}>
            <Button
            title={t("onboarding_screen.get_started")}
            onPress={handleCreatePress}
          />
          </View>
        </View>
        </View>
    </Screen>
  );
});
const styles = Steezy.create(({ safeArea }) => ({
  content:{
    paddingBottom: safeArea.bottom,
  },
  buttons:{
    paddingHorizontal: 20 * HEIGHT_RATIO,
    paddingBottom: 30 * HEIGHT_RATIO,
  },
  contentText:{
    width: "100%",
    paddingVertical: 80 * HEIGHT_RATIO,
    paddingHorizontal: 20 * HEIGHT_RATIO,
  },
  imageEther: {
    width: '100%',
    height:180 * HEIGHT_RATIO,
    paddingTop:80 * HEIGHT_RATIO,
    justifyContent:'center',
    alignItems:'center',
  },
  info: {
    lineHeight:10 * HEIGHT_RATIO,
    marginTop: 70 * HEIGHT_RATIO,
    //marginBottom:10 * HEIGHT_RATIO,
  },
}));