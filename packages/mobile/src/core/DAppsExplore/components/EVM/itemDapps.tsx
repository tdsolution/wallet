import { StyleSheet, View, Image,TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { colors } from "../../../../constants/colors";
import { getBalanceToken } from "$libs/EVM/token/tokenEVM";
import {  fetchBalaceEvm, formatCurrencyNoCrc } from "$libs/EVM/useBalanceEVM";
import SaveListCoinRate from "$libs/EVM/api/get_exchange_rate";
import { trackEvent } from "@aptabase/react-native";
import { openDAppBrowser } from "$navigation/helper";
import { Text, deviceHeight } from "@tonkeeper/uikit";


const display12Words = (sentence) => {
  const words = sentence.split(' ');
  if (words.length <= 10) {
    return sentence;
  } else {
    return words.slice(0, 10).join(' ');
  }
}
interface Props {
  dapp:any;
}
const HEIGHT_RATIO = deviceHeight / 844;
const ItemApps = (props: Props) => {
  const {dapp} = props;
  const handlePress = useCallback(() => {
    openDAppBrowser(dapp.linkDapp);
  }, [dapp]);
  return (
     <TouchableOpacity onPress={handlePress} style={{marginTop:10  * HEIGHT_RATIO}}>
        <View style={styles.container}>
        <View style={{width: 60, height: 60, borderWidth:1, borderRadius:40, borderColor:'#F0F0F0'}}>
              <Image
                source={{uri:dapp.logoDapp}}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            <View style={{marginHorizontal:10, width:'65%'}}>
              <Text style={styles.title}>{dapp.name}</Text>
              <Text style={styles.body}>{display12Words(dapp.desp)}</Text>
            </View>
             <View style={{width: 25, height: 25,marginRight:10 * HEIGHT_RATIO, borderWidth:1, borderRadius:40, borderColor:'#F0F0F0',justifyContent:'center', alignItems:'center' }}>
              <Image
                source={{uri:dapp.logoChain}}
                style={{ width: 18, height: 18, borderRadius:40,}}
                resizeMode="contain"
              />
            </View>
          </View>
     </TouchableOpacity>
  );
};

export default ItemApps;

const styles = StyleSheet.create({
  container:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#ffffff',
    paddingHorizontal:10,
    paddingVertical:6,
    borderRadius:10,
    flexDirection:'row'
  },
  logo: {
     width: 40, height: 40 , margin:10
  },
  title: {
    color:'#000000',
    fontSize:14
  },
  body: {
    color:'#7C7C7C', 
   fontSize:12,
    lineHeight: 20
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});