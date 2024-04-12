import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
// name, mnemonic, privateKey
const ItemAccount = ({ item, onPress }) => {
  const [isCheck, setIsCheck] = useState(false);
  return (
    <View style={{ marginBottom: 11 }}>
      <View style={styles.headerItem}>
        <View style={{ flexDirection: "row" }}>
          <View>
            <Image
              source={require("../../../assets/logo/img_td.png")}
              style={styles.image}
            />
            <Image
              source={require("../../../assets/logo/img_check_connect.png")}
              style={[styles.imageCheck, { display: "none" }]}
            />
          </View>
          <View>
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.body}>Muti-coin wallet</Text>
          </View>
        </View>
        <TouchableOpacity>
          <Image
            source={require("../../../assets/icons/png/ic_menu_dot.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.textbutton}>Backup to iCloud</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ItemAccount;

const styles = StyleSheet.create({
  headerItem: {
    backgroundColor: "#4871EA14",
    height: 70,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  image: {
    width: 29,
    height: 29,
    borderRadius: 15,
    resizeMode: "cover",
    marginRight: 11,
  },
  icon: {
    width: 21,
    height: 21,
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2B2D42",
    lineHeight: 20,
    textAlign: "left",
    fontFamily: "Poppins-Bold",
  },
  body: {
    fontSize: 12,
    fontWeight: "400",
    color: "#909090",
    lineHeight: 16,
    textAlign: "left",
    fontFamily: "Poppins-Medium",
  },
  textbutton: {
    fontSize: 12,
    fontWeight: "600",
    color: "#4871EA",
    lineHeight: 16,
    textAlign: "right",
    fontFamily: "Poppins-Bold",
    marginTop: 8,
  },
  imageCheck: {
    width: 13.13,
    height: 13.13,
    borderRadius: 15,
    resizeMode: "cover",
    position: "absolute",
    top: -5,
    right: 8,
  },
});
