import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../../constants/colors";

const ItemYourWallet = ({item, callback}) => {
  let truncatedAddress =
    item.addressWallet.length > 20 ? item.addressWallet.substring(0, 20) + "..." : item.addressWallet;
  return (
    <TouchableOpacity onPress={() => {}}>
      <Image
        style={styles.image}
        source={require("../../../assets/logo/img_td.png")}
      />
      <View>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.textToken}>{truncatedAddress}</Text>
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
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.Black,
    textAlign: "left",
    fontFamily: "Poppins-Bold",
  },
  textToken: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.Black,
    textAlign: "left",
    fontFamily: "Poppins-Medium",
  },
});
