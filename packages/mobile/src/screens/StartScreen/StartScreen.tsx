import {
  Screen,
  View,
  Steezy,
  Text,
  Spacer,
  Button,
  deviceHeight,
  Icon,
} from '@tonkeeper/uikit';
import Svg from 'react-native-svg';
import { useWindowDimensions, Image,TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { memo, useCallback, useEffect, useState } from 'react';
import { t } from '@tonkeeper/shared/i18n';
import { MainStackRouteNames } from '$navigation';
import { useDispatch } from 'react-redux';
import { walletActions } from '$store/wallet';
import { useNavigation } from '@tonkeeper/router';
import { deviceWidth } from '$utils';
import { FontWeights } from '@tonkeeper/uikit/src/components/Text/TextStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { chainActive } from '@tonkeeper/shared/utils/KEY_STORAGE';
import { DataChains } from '@tonkeeper/shared/utils/network';
import { createWalletFromMnemonic, generateMnemonic } from '$libs/EVM/createWallet';
import { CreateWalletStackRouteNames } from '$navigation/CreateWalletStack/types';
import SaveListCoinRate from '$libs/EVM/api/get_exchange_rate';
import { ActivityIndicator } from 'react-native';
import { colors } from '../../constants/colors';

const bip39 = require('bip39')
const HEIGHT_RATIO = deviceHeight / 844;
const  WIDTH_RATIO = deviceWidth / 844;
export const StartScreen = memo(() => {
  const [isDisable, setIsDisable] = useState<boolean>(false)
  const dimensions = useWindowDimensions();
  const dispatch = useDispatch();
  const nav = useNavigation();
  const origShapesWidth = 560;
  const origShapesHeight = 494;
  const origShapesScreenHeight = 844;
  const ratioHeight = dimensions.height / origShapesScreenHeight;
  const logoShapesPosX = origShapesWidth / 2 - dimensions.width / 2;
  const logoShapesPosY =
    origShapesHeight / 2 - (origShapesHeight * ratioHeight) / 2;

  const handleCreatePress = useCallback(async () => {
    setIsDisable(true);
    dispatch(walletActions.generateVault());
    const mnemonic  = await generateMnemonic();
    try {
      await createWalletFromMnemonic(mnemonic);
      nav.navigate(MainStackRouteNames.CreateWalletStack);
    } catch (error) {
      console.log("Error: ", error)
    } finally {
      setIsDisable(false);
    }
  }, [dispatch, nav]);

  const handleImportPress = useCallback(() => {
    nav.navigate(MainStackRouteNames.ImportWalletStack);
  }, [dispatch, nav]);

  useEffect(() => {
    fetchChainActive();
  }, []);

  const fetchChainActive = async () => {
      await SaveListCoinRate.fullFlowSaveData();
      const storedChainActive = await AsyncStorage.getItem(chainActive);
      if (storedChainActive == null) {
        await AsyncStorage.setItem(chainActive, JSON.stringify(DataChains[0]));
      } else {
        return;
      }
  };

  return (
    <Screen>
      <View style={{ flex: 1 , backgroundColor:'#FAFAFA'}}>
        <View
          style={{
            height: 490 * HEIGHT_RATIO,
            alignItems:'center',
            justifyContent:'center'
          }}
        >
           <Image
            style={{ width:'100%' ,position: 'absolute'}}
            source={require("../../assets/logo/add_wallet.png")}
            resizeMode='contain'
            />
        </View>
        <View style={styles.info}>
          <Text type="body1" color="textSecondary" textAlign="center" 
          style={{fontSize:20 * HEIGHT_RATIO, color:'#1E1E1E'}} 
          lineHeight= {30 * HEIGHT_RATIO}
          >
            Join 80M+ people sharing the future of the internet with us
          </Text>
        </View>
      </View >
      <View style={styles.content}>
        <View style={styles.buttons}>
          <TouchableOpacity disabled={isDisable} onPress={handleCreatePress}>
            <View style={styles.buttonV}>
                <View style={styles.iconButton}>
                  <Image source={require('../../assets/icons/png/ic_baseline-plus.png')} style={{width:30 * HEIGHT_RATIO,height:30 * HEIGHT_RATIO}}/>
                </View>
                <View>
                  <Text style={{color:'#4871EA', fontSize:14 * HEIGHT_RATIO, fontWeight:'600', lineHeight: 25 * HEIGHT_RATIO}}>{t("start_screen.create_wallet_button")}</Text>
                  <Text style={{color:'#7C7C7C', fontSize:12 * HEIGHT_RATIO, fontWeight:'400', lineHeight: 25 * HEIGHT_RATIO}}>Secret phrase or swift wallet</Text>
                </View>
            </View>
          </TouchableOpacity>
           <TouchableOpacity onPress={handleImportPress} style={{marginTop: 16 * HEIGHT_RATIO}}>
            <View style={styles.buttonV}>
                <View style={styles.iconButton}>
                  <Image source={require('../../assets/icons/png/ic_baseline-plus.png')} style={{width:30 * HEIGHT_RATIO,height:30 * HEIGHT_RATIO}}/>
                </View>
                <View>
                  <Text style={{color:'#4871EA', fontSize:14 * HEIGHT_RATIO, fontWeight:'600', lineHeight: 25 * HEIGHT_RATIO}}>{t("start_screen.import_wallet_button")}</Text>
                  <Text style={{color:'#7C7C7C', fontSize:12 * HEIGHT_RATIO, fontWeight:'400', lineHeight: 25 * HEIGHT_RATIO}}>Import, restore or view-only</Text>
                </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      {isDisable && <View
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
      <ActivityIndicator size="large" color={colors.Primary}/>
    </View>}
    </Screen>
  );
});

const styles = Steezy.create(({ safeArea }) => ({
  iconButton:{
   backgroundColor: 'rgba(72,113,234,0.14)',
   width:40 * HEIGHT_RATIO,
   height:40 * HEIGHT_RATIO,
   borderRadius:100,
   alignItems:'center',
   justifyContent:'center',
   marginRight:10 * HEIGHT_RATIO,
  },
  buttonV:{
    backgroundColor:'#F2F2F2',
    paddingTop:14 * HEIGHT_RATIO,
    paddingBottom:14 * HEIGHT_RATIO,
    borderRadius:10,
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20 * HEIGHT_RATIO,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  logoIcon: {
    position: "relative",
  },
  content: {
    backgroundColor:'#FAFAFA',
    paddingBottom: safeArea.bottom,
  },
  logo: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 1,
  },
  info: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    paddingHorizontal: 32 * HEIGHT_RATIO,
    paddingBottom: 8 * HEIGHT_RATIO,
  },
  buttons: {
    paddingHorizontal: 32 * HEIGHT_RATIO,
    paddingTop: 16 * HEIGHT_RATIO,
    paddingBottom: 32 * HEIGHT_RATIO,
  },
  bottomGradient: {
    position: "absolute",
    bottom: 0,
    height: 224,
    width: "100%",
    zIndex: 1,
  },
  square: {
    width: 40,
    height: 40,
    borderRadius: 8,
  },
}));

const LogoShapes = () => (
  <Svg width={560} height={494} fill="none">
     <Image
       style={{ width: 350, height: 300,position: 'absolute'}}
       source={require("../../assets/logo/add_wallet.png")}
            />
  </Svg>
);
