import { StyleSheet, Text, View, Image,TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { colors } from "../../../../constants/colors";
import { getBalanceToken } from "$libs/EVM/token/tokenEVM";
import {  fetchBalaceEvm, formatCurrencyNoCrc } from "$libs/EVM/useBalanceEVM";
import SaveListCoinRate from "$libs/EVM/api/get_exchange_rate";

interface Props {
  dapp:any;
}
const display12Words = (sentence) => {
  const words = sentence.split(' ');
  if (words.length <= 10) {
    return sentence;
  } else {
    return words.slice(0, 10).join(' ');
  }
}
const ItemApps = (props: Props) => {
  const {dapp} = props;
  return (
     <TouchableOpacity onPress={() => {console.log('demo')}}>
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
             <View style={{width: 25, height: 25,marginRight:10, borderWidth:1, borderRadius:40, borderColor:'#F0F0F0',justifyContent:'center', alignItems:'center' }}>
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
    alignItems:'flex-end',
    justifyContent:'center',
    backgroundColor:'#ffffff',
    paddingHorizontal:10,
    paddingVertical:6,
    borderRadius:10,
    flexDirection:'row'
  },
  logo: {
     width: 60, height: 60 , padding:10
  },
  title: {
    color:'#000000',
    fontSize:14
  },
  body: {
    color:'#7C7C7C', 
   fontSize:12,
    fontFamily: "Poppins-Light",
    lineHeight: 20
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});