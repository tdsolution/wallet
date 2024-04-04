import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { colors } from "../../../constants/colors";

interface Props {
  title: string;
  onPress?: void;
  image?: string;
  price: string;
  profit: string;
}

const ItemWallet = (props: Props) => {
  const { title, onPress, image, profit, price } = props;
  let imageURL = require("../../../assets/logo/img_twt.png");
  if (title === "TWT") {
    imageURL = require("../../../assets/logo/img_twt.png");
  } else if (title === "TD WALLET") {
    imageURL = require("../../../assets/logo/img_td.png");
  } else {
    imageURL = require("../../../assets/logo/img_usdt.png");
  }
  let profitColor = title === "USDT" ? colors.Red : colors.Green;
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Image style={styles.logo} source={imageURL} />
        <View>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.row}>
            <Text style={styles.body}>{price}</Text>
            <Text style={[styles.body, { marginLeft: 8, color: profitColor }]}>
              {profit}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={[styles.title, { textAlign: "right" }]}>0</Text>
        <Text style={[styles.body, { textAlign: "right" }]}>$0.00</Text>
      </View>
    </View>
  );
};

export default ItemWallet;

const styles = StyleSheet.create({
  logo: {
    width: 48,
    height: 48,
    borderRadius: 24,
    resizeMode: "contain",
    marginRight: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "left",
    color: colors.Primary,
    lineHeight: 20,
  },
  body: {
    fontSize: 13,
    fontWeight: "400",
    textAlign: "left",
    color: "#B6B6B6",
    fontFamily: "Poppins-Light",
    lineHeight: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginBottom: 32,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
