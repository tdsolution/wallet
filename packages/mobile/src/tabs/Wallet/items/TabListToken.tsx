import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import ItemWallet from "./ItemWallet";
import { navigation } from "@tonkeeper/router";
import { Text } from "@tonkeeper/uikit";

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
        marginTop: 10
      }}
    >
      <View>
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
