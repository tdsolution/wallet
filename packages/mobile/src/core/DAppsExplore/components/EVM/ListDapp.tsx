import { StyleSheet, Text, View, FlatList, TouchableOpacity , Image} from "react-native";
import React, { useEffect } from "react";
import { getTokenListByChainID } from "$libs/EVM/token/tokenEVM";
import { useChain } from "@tonkeeper/shared/hooks";
import { navigation } from "@tonkeeper/router";
import ItemApps from "./itemDapps";

const ListDapp = ({dapps}) => {
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
          data={dapps}
          renderItem={({ item }) => (
            <ItemApps
              dapp={item} 
            />
          )}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ListFooterComponent={
          <View style= {{marginTop:0}}>
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

export default ListDapp;

const styles = StyleSheet.create({
});
