import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../../constants/colors";
import { Text } from "@tonkeeper/uikit";

const ItemYourWallet = ({item, callback}) => {
  let truncatedAddress =
    item.addressWallet.length > 20 ? item.addressWallet.substring(0, 20) + "..." : item.addressWallet;
  return (
    <TouchableOpacity onPress={() => callback(item.addressWallet)} style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../assets/icons_v1/img_td.jpeg")}
      />
      <View>
        <Text type="label1" color="textPrimaryAlternate">{item.name}</Text>
        <Text type="body2" color="textPrimaryAlternate">{truncatedAddress}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ItemYourWallet;

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
    borderWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    padding: 10,
    borderColor: "#DDDDDD",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "contain",
    marginRight: 10,
  },
});
