import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../../../constants/colors";
import { useNavigation } from "@tonkeeper/router";
import { WalletStackRouteNames } from "$navigation";

const ItemYourWallet = () => {
    const navigation = useNavigation();
  const token = "0xd0F0bd3B24B436B868720711FC1060A99c8Dc049";
  let truncatedAddress =
    token.length > 20 ? token.substring(0, 20) + "..." : token;
  return (
    <TouchableOpacity onPress={() => navigation.navigate(WalletStackRouteNames.DetailToken)}>
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require("../../../assets/icons_v1/icon_qr.png")}
      />
      <View>
        <Text style={styles.title}>Main Account</Text>
        <Text style={styles.textToken}>{truncatedAddress}</Text>
      </View>
    </View>
    </TouchableOpacity>
  );
};

export default ItemYourWallet;

const styles = StyleSheet.create({
  container: {
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
