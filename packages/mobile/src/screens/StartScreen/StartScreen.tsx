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
import { memo, useCallback, useEffect } from 'react';
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
const bip39 = require('bip39')
const HEIGHT_RATIO = deviceHeight / 844;
const  WIDTH_RATIO = deviceWidth / 844;
export const StartScreen = memo(() => {
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
    dispatch(walletActions.generateVault());
    const mnemonic  = await generateMnemonic();
    createWalletFromMnemonic(mnemonic);
    nav.navigate(MainStackRouteNames.CreateWalletStack);
  }, [dispatch, nav]);
  const handleImportPress = useCallback(() => {
    nav.navigate(MainStackRouteNames.ImportWalletStack);
  }, [dispatch, nav]);
  useEffect(() => {
    fetchChainActive();
  }, []);
    const fetchChainActive = async () => {
        const storedChainActive = await AsyncStorage.getItem(chainActive);
        if(storedChainActive == null){
         await AsyncStorage.setItem(chainActive, JSON.stringify(DataChains[0]));
        }else{
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
          <Text type="body1" color="textSecondary" textAlign="center" style={{fontSize:20, color:'#1E1E1E'}}>
            Join 80M+ people sharing the future of the internet with us
          </Text>
        </View>
      </View >
      <View style={styles.content}>
        <View style={styles.buttons}>
          <TouchableOpacity onPress={handleCreatePress}>
            <View style={styles.buttonV}>
                <View style={styles.iconButton}>
                  <Image source={require('../../assets/icons/png/ic_baseline-plus.png')} style={{width:30,height:30}}/>
                </View>
                <View>
                  <Text style={{color:'#4871EA', fontSize:14, fontWeight:'600'}}>{t("start_screen.create_wallet_button")}</Text>
                  <Text style={{color:'#7C7C7C', fontSize:12, fontWeight:'400'}}>Secret phrase or swift wallet</Text>
                </View>
            </View>
          </TouchableOpacity>
          <Spacer y={16}/>
           <TouchableOpacity onPress={handleImportPress}>
            <View style={styles.buttonV}>
                <View style={styles.iconButton}>
                  <Image source={require('../../assets/icons/png/ic_baseline-plus.png')} style={{width:30,height:30}}/>
                </View>
                <View>
                  <Text style={{color:'#4871EA', fontSize:14, fontWeight:'600'}}>{t("start_screen.import_wallet_button")}</Text>
                  <Text style={{color:'#7C7C7C', fontSize:12, fontWeight:'400'}}>Import, restore or view-only</Text>
                </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Screen>
  );
});

const styles = Steezy.create(({ safeArea }) => ({
  iconButton:{
   backgroundColor: 'rgba(72,113,234,0.14)',
   width:40,
   height:40,
   borderRadius:100,
   alignItems:'center',
   justifyContent:'center',
   marginRight:10,
  },
  buttonV:{
    backgroundColor:'#F2F2F2',
    paddingTop:14,
    paddingBottom:14,
    borderRadius:10,
    flexDirection:'row',
    alignItems:'center',
    paddingHorizontal:20,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
  },
  tinyLogo: {
    width: 100,
    height: 100,
  },
  logoIcon: {
    position: "relative",
  },
  logoDemo: { 
    width: 150, // Độ rộng của logo
    height: 150, // Độ cao của logo
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

    paddingHorizontal: 32,
    paddingBottom: 8,
  },
  buttons: {
    paddingHorizontal: 32,
    paddingTop: 16,
    paddingBottom: 32,
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
