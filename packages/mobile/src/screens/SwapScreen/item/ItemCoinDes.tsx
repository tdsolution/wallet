import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { colors } from "../../../constants/colors";
import { Text } from "@tonkeeper/uikit";

type ItemProps = {
  item: any;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const ItemCoinDes = ({ item, index }: any) => {
  return (
    <TouchableOpacity
      style={[styles.container]}
      onPress={() => console.log("Index: ", index)}
    >
      <View style={{ position: "relative" }}>
        <Image style={[styles.logo]} source={{ uri: item.logo }} />
        <Image
          style={[styles.chainImg]}
          source={{
            uri: item.chainImg,
          }}
        />
      </View>
      <Text style={[styles.symbol]}>{item.symbol}</Text>
    </TouchableOpacity>
  );
};

export default ItemCoinDes;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
    borderRadius: 40,
  },
  chainImg: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    borderRadius: 15,
    position: "absolute",
    top: 0,
    right: 0,
    borderWidth: 2,
    borderColor: "white",
  },
  symbol: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.Black,
    marginLeft: 10,
  },
});
