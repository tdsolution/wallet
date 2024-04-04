import { useNavigation } from '@tonkeeper/router';
import { List, Modal, TouchableOpacity, View, deviceHeight, Text } from '@tonkeeper/uikit';
import { FC, memo, useEffect, useMemo, useState } from 'react';
import {Image} from 'react-native';
import { t } from '../i18n';
import { DataChains } from '../utils/network';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { chainActive } from '../utils/KEY_STORAGE';
import { useChain } from '../hooks';

interface Props {
    selected? : string;
    onSelect? : (identifier: string) => void;
}
export const SelectNetworkModal: FC<Props> = memo((props) => {
    const HEIGHT_RATIO = deviceHeight / 844;
    const nav = useNavigation();
    const {chain,setChain} = useChain();
    const [chainIdActiveVar, setChainIdActiveVar] = useState<string>('1100');
    const selectNetworks = useMemo(() => {
        return DataChains;
    }, [props.selected]);
     const handlePress = async (data:any) => {
      await AsyncStorage.setItem(chainActive, JSON.stringify(data));
       console.log('Active Chain:', data.chainId);
       setChainIdActiveVar(data.chainId);
       setChain(data);
       nav.goBack();
  };
  useEffect(() => {
    // console.log(chain.id);
    fetchChainActive();
  }, []);
    const fetchChainActive = async () => {
        const storedChainActive = await AsyncStorage.getItem(chainActive);
        const data1 = storedChainActive != null ? JSON.parse(storedChainActive) : '';
        setChainIdActiveVar(data1.chainId);
        console.log('Active Chain:', data1.chainId);
    };
    return (
        <Modal >
            <Modal.Header title={t('select_a_network')}/>
            <Modal.ScrollView style= {{backgroundColor:'#f9f9f9'}}>
                <Modal.Content safeArea>
                    <List style= {{backgroundColor:'#f9f9f9'}}>
                        {
                        selectNetworks.map((chain) => (
                            <TouchableOpacity onPress={()=>{handlePress(chain)}} key={chain.chainId}>
                         <View style={{backgroundColor:'#ffff', height:50 * HEIGHT_RATIO, paddingVertical:10 * HEIGHT_RATIO, marginTop:10 * HEIGHT_RATIO, flexDirection:'row', alignItems:'center', borderLeftWidth:2, borderColor: chain.chainId == chainIdActiveVar ? '#4871EA':'#ffff'}}> 
                            <View style={{alignItems:'center', borderRadius:50 * HEIGHT_RATIO,width:40 * HEIGHT_RATIO, height:40 * HEIGHT_RATIO , backgroundColor:'#fff', justifyContent:'center'}}>
                              <Image source={{ uri: chain.logo }} style={{ width: 30 * HEIGHT_RATIO, height: 30 * HEIGHT_RATIO,borderRadius:50 * HEIGHT_RATIO }} />
                            </View>
                            <Text style={{color:'#000', marginLeft:10 * HEIGHT_RATIO, fontSize:14 * HEIGHT_RATIO}}>{chain.name}</Text>
                            {chain.chainId == chainIdActiveVar ?  <View style={{marginLeft:10}}>
                                 <Image source={require('@tonkeeper/uikit/assets/icons_v1/check_active.png')} style={{ width: 25 * HEIGHT_RATIO, height: 25 * HEIGHT_RATIO,borderRadius:50 * HEIGHT_RATIO }} />
                            </View> : null}
                         </View>
                         </TouchableOpacity>
                         ))
                        }
                    </List>
                </Modal.Content>
            </Modal.ScrollView>
        </Modal>
    );  
})