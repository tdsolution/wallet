import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import React, { useState } from "react";
import { colors } from "../../../constants/colors";
import { useSwapCoin } from "@tonkeeper/shared/hooks/useSwapCoin";
import { Text } from "@tonkeeper/uikit";

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
      <Text type="label1" style={[{ color: color, marginLeft: 10 }]}>{item.symbol}</Text>
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
    width: 45,
    height: 45,
    resizeMode: "contain",
    borderRadius: 40,
  },
  chainImg: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    borderRadius: 15,
    position: "absolute",
    top: 0,
    right: 0,
    borderWidth: 2,
    borderColor: "white",
  },
});
