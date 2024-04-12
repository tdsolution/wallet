import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import ItemWallet from "./ItemWallet";
import { DATA } from "./Data";

const TabListToken = () => {
  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <View>
        <FlatList
          // style={{ marginVertical: 25 }}
          data={DATA}
          renderItem={({ item }) => (
            <ItemWallet
              title={item.title}
              price={item.price}
              profit={item.profit}
              // image={item.imageURL}
            />
          )}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          ListFooterComponent={<View style={{ height: 50 }} />}
          ListHeaderComponent={<View style={{ height: 25 }} />}
        />
      </View>
    </View>
  );
};

export default TabListToken;

const styles = StyleSheet.create({});
