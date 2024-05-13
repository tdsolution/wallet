import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React, { useState } from "react";
import { colors } from "../../../constants/colors";
import { useSwapCoin } from "@tonkeeper/shared/hooks/useSwapCoin";

interface ItemCoinOrgProps {
  item: any;
  index: number;
  onPress: () => void;
  backgroundColor: string;
  borderColor: string;
  color: string;
}

const ItemCoinOrg = ({ item, index, onPress }: ItemCoinOrgProps) => {
  const { swapCoin } = useSwapCoin() || {};
  const backgroundColor = swapCoin === index ? "#d0dbfa" : "white";
  const borderColor = swapCoin === index ? colors.Primary : "white";
  const color = swapCoin === index ? colors.Primary : colors.Black;
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: backgroundColor,
          borderLeftWidth: 2,
          borderLeftColor: borderColor,
        },
      ]}
      onPress={onPress}
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
      <Text style={[styles.symbol, { color: color }]}>{item.symbol}</Text>
    </TouchableOpacity>
  );
};

export default ItemCoinOrg;

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
    fontFamily: "Poppins-Bold",
    marginLeft: 10,
  },
});
