import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Button
} from "react-native";
import React, { FC, useEffect, useMemo, useState } from "react";
import ItemWallet from "./ItemWallet";
import { getBalanceToken, getTokenListByChainID } from "$libs/EVM/token/tokenEVM";
import { useBalanceTD } from "@tonkeeper/shared/hooks";
import { navigation, useFocusEffect } from "@tonkeeper/router";
import { fetchBalaceEvm, formatCurrencyNoCrc } from "$libs/EVM/useBalanceEVM";
import SaveListCoinRate from "$libs/EVM/api/get_exchange_rate";
import { Text } from "@tonkeeper/uikit";

const TabListToken = ({
  tokens,
  chainActive,
  address,
  tokensImport,
}) => {
  
  const {balance, setBalance} = useBalanceTD();
  useFocusEffect(
    React.useCallback(() => { 
     let a = 0;
      tokens.map((token, id)=> {
        async function fetchBalance() {
        if (token.tokenAddress != "coin") {
          const balance2 = await getBalanceToken(chainActive.rpc, token.tokenAddress, address);
          const coinRate = await SaveListCoinRate.getCoinRateById(token.id ?? '');
          const rateUsd = coinRate?.usd ?? "0";
          const balanceUsd = parseFloat(rateUsd) * parseFloat(balance2); 
          a = a + balanceUsd;
        } else if (token.tokenAddress == "coin") {
          const balance2 = await fetchBalaceEvm(address, chainActive.rpc);
          const coinRate = await SaveListCoinRate.getCoinRateById(token.id ?? '');
          const rateUsd = coinRate?.usd ?? "0";
          const balanceUsd = parseFloat(rateUsd) * parseFloat(balance2);
          a = a + balanceUsd;
        } 
        setBalance(a);
      }
      fetchBalance();
      });
      
    }, [tokens, address])
  );

  return (
    <View
      style={{
        width: "100%",
        paddingBottom: 80,
      }}
    >
      <View>
        <View style={{ marginTop: 10 }}></View>
        <FlatList
          data={tokens}
          renderItem={({ item }) => (
            <ItemWallet
              id={item.id}
              symbol={item.symbol}
              image={item.logo}
              rpc={chainActive.rpc}
              addressToken={item.tokenAddress}
              address={address}
            />
          )}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />
        <FlatList
          data={tokensImport}
          renderItem={({ item }) => (
            <ItemWallet
              // id={item.id}
              symbol={item.symbol}
              // image={item.logo}
              rpc={chainActive.rpc}
              addressToken={item.tokenAddress}
              address={address}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          scrollEnabled={false}
            ListFooterComponent={
            <View style={{ alignItems: "center", marginBottom: 40 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ImportToken")}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text
                  type="label2"
                  color="primaryColor"
                    style={{
                      marginRight: 10,
                    }}
                  >
                    Import Tokens
                  </Text>
                  <Image
                    source={require("../../../assets/logo/icon_dowload.png")}
                    style={{ width: 20, height: 20 }}
                  />
                </View>
              </TouchableOpacity>
            </View>
          }
          ListHeaderComponent={<View style={{ marginTop: 0 }}></View>}
        />
      </View>
    </View>
  );
};
export default TabListToken;

const styles = StyleSheet.create({});
const data = [
  { id: "1", title: "Item 1", description: "Description of item 1" },
  { id: "2", title: "Item 2", description: "Description of item 2" },
  { id: "3", title: "Item 3", description: "Description of item 3" },
  // Thêm các đối tượng khác nếu cần
];
