import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Button
} from "react-native";
import React, { useEffect } from "react";
import ItemWallet from "./ItemWallet";
import { getTokenListByChainID } from "$libs/EVM/token/tokenEVM";
import { useChain } from "@tonkeeper/shared/hooks";
import { navigation } from "@tonkeeper/router";

const TabListToken = ({
  tokens,
  chainActive,
  address,
  tokensImport,
}) => {
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
          ListFooterComponent={
            <View style={{ alignItems: "center", marginBottom: 40 }}>
              <TouchableOpacity
                onPress={() => navigation.navigate("ImportToken")}
              >
                <View style={{ flexDirection: "row" }}>
                  <Text
                    style={{
                      color: "#4871EA",
                      fontWeight: "600",
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
