import { StyleSheet, Text, View, FlatList, TouchableOpacity , Image} from "react-native";
import React, { useEffect } from "react";
import ItemWallet from "./ItemWallet";
import { getTokenListByChainID } from "$libs/EVM/token/tokenEVM";
import { useChain } from "@tonkeeper/shared/hooks";

const TabListToken = ({tokens, chainActive, address}) => {
  return (
    <View
      style={{
        width: "100%",
        paddingBottom:80,
      }}
    >
      <View>
        <View style= {{marginTop:10}}>
          </View>
        <FlatList
          data={tokens}
          renderItem={({ item }) => (
            <ItemWallet
              id={item.id} 
              symbol={item.symbol}
              image={item.logo}
              rpc = {chainActive.rpc}
              addressToken = {item.tokenAddress} 
              address = {address}
            />
          )}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ListFooterComponent={
          <View style={{  alignItems:'center', marginBottom:40}} >
            <TouchableOpacity>
              <View style={{flexDirection:'row'}}>
                <Text style={{color:'#4871EA', fontWeight:'600', marginRight:10}}>Import Tokens</Text>
                 <Image source={require('../../../assets/logo/icon_dowload.png')}  style={{width:20,height:20}}/>
              </View>
            </TouchableOpacity>
          </View>}
          ListHeaderComponent={ 
          <View style= {{marginTop:0}}>
          </View>
       }
        />
      </View>
    </View>
  );
};

export default TabListToken;

const styles = StyleSheet.create({
});
