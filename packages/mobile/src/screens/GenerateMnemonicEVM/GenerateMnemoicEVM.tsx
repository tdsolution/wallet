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
import { generateMnemonic } from '$libs/EVM/createWallet';
import { NavBar } from '$uikit';
const HEIGHT_RATIO = deviceHeight / 844;
const  WIDTH_RATIO = deviceWidth / 844;
export const GenerateMnemonicEVM = memo(() => {
  const  title   = 'Recovery Pharase';
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
  const [mnemonic, setMnemonic] = useState<string[]>([]);
  const generate = useCallback(async () => {
  const mnemonicString  = await generateMnemonic();
  const newMnemonic: string[] = mnemonicString.split(' ');
  setMnemonic(newMnemonic);
  }, []);
  const nextPress = useCallback(async () => {
   await AsyncStorage.setItem('mnemonicEVM',mnemonic.join(' '));
   console.log('nextPress');
  }, []);
  useEffect(() => {
    generate();
  }, []);
  return (
    <Screen>
      <NavBar isForceBackIcon children={title} />
      <View style={{backgroundColor:'#FAFAFA', flex:1}}> 
        <View style={{alignItems:'center',  marginVertical:10, marginHorizontal:20, marginBottom:20}}>
            <Text style={{color:'#4871EA',fontSize:18, fontWeight:'700', paddingVertical:10}}>Remember Your Seed Phrase</Text>
            <Text style={{color:'#000000',fontSize:14}}>This is your seed phrase.Write it down on a paper and keep it in a safe place. You'll be asked to re-enter this phrase this (in order) on the next step.</Text>
            </View>
            <View style={{backgroundColor:'#FAFAFA'}}>
            </View>
            <TouchableOpacity style={{marginBottom:10, marginHorizontal:20, alignItems:'flex-end'}}>
                <Text style={{color:'#1E1E1E'}}>Copy</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap'}}>
            {mnemonic.map((item, index) => (
                <View key={index} style={{ width: '50%', paddingHorizontal: 30 }}>
                <View style={{ borderRadius: 50, backgroundColor: '#4871EA', padding: 8, alignItems: 'center', marginBottom: 10 }}>
                    <Text>{item}</Text>
                </View>
                </View>
            ))}
            </View>
      </View>
       <TouchableOpacity style={{alignItems:'center', margin:10}} onPress={nextPress}>
                <View style={{width:'90%', backgroundColor:'#4871EA',  marginHorizontal:40, padding:12, borderRadius:50, alignItems:'center'}}>
                  <Text style={{fontSize:18, fontWeight:'600', }}>Next</Text>
                 </View>
          </TouchableOpacity>
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
