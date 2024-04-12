import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import ItemWallet from "./ItemWallet";
import { DATA_TOKEN } from "./Data";

const TabListToken = () => {
  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <View>
        
        <FlatList
          data={DATA_TOKEN}
          renderItem={({ item }) => (
            <ItemWallet
              title={item.title}
              price={item.price}
              profit={item.profit}
            />
          )}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={{ height: 50 }} />}
          ListHeaderComponent={<View style={{ height: 25 }} />}
          scrollEnabled={false}
        />
      </View>
    </View>
  );
};

export default TabListToken;

const styles = StyleSheet.create({
});
