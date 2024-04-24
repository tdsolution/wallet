import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
} from "react-native";
import React from "react";
import HeaderBar from "../../components/HeaderBar";
import { useNavigation } from "@tonkeeper/router";
import { colors } from "../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import { useChain } from "@tonkeeper/shared/hooks";

const TransferScreen = ({props}: {props: any}) => {
    const {address, amount} = props;
  const navigation = useNavigation();
  const chain = useChain()?.chain;
  const handleBack = () => {
    navigation.goBack();
  };
  const addressToken = "0x06A0F0fa38AE42b7B3C8698e987862AfA58e90D9";
  function formatHexString(hexString: string) {
    const prefix = hexString.slice(0, 10); // Lấy các ký tự đầu tiên (bao gồm cả "0x" và 6 ký tự tiếp theo)
    const suffix = hexString.slice(-6); // Lấy 6 ký tự cuối cùng
    return prefix + '...' + suffix;
  }
  return (
    <SafeAreaView style={globalStyles.container}>
      <View
        style={[
          globalStyles.row,
          { paddingHorizontal: 25, paddingVertical: 10 },
        ]}
      >
        <TouchableOpacity onPress={handleBack}>
          <Image
            style={styles.iconClose}
            source={require("../../assets/icons/png/ic-arrow-up-16.png")}
          />
        </TouchableOpacity>
        <Text style={globalStyles.textHeader}>Transfer</Text>
        <Text style={{ opacity: 0 }}>scacasc</Text>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.price}>0.0 {chain.name}</Text>
        <Text style={styles.priceDolla}>= 0.0 $</Text>
      </View>
      <View style={styles.box}>
        <View style={styles.row}>
          <Text style={styles.text}>Asset</Text>
          <Text style={styles.text}>Core Chain ({chain.name})</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>From</Text>
          <Text style={styles.text}>{formatHexString(addressToken)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>To</Text>
          <Text style={styles.text}>{formatHexString(addressToken)}</Text>
        </View>
      </View>
      <View style={styles.box}>
        <View style={styles.row}>
          <Text style={styles.text}>Network fee</Text>
          <Text style={styles.text}>0.00063 CORE (0.001587$)</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>Max total</Text>
          <Text style={styles.text}>0.0 $</Text>
        </View>
      </View>
      <TouchableOpacity style={[styles.button]}>
        <Text style={styles.textButton}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TransferScreen;

const styles = StyleSheet.create({
  iconClose: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: colors.Primary,
    transform: [{ rotate: "-90deg" }],
  },
  price: {
    fontSize: 35,
    fontWeight: "bold",
    color: colors.Black,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
    marginTop: 20,
  },
  priceDolla: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.Gray_Light,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    marginTop: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: "contain",
    marginTop: 10,
  },
  caption: {
    fontSize: 14,
    fontWeight: "normal",
    color: colors.Gray_Light,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
  textCheckExplorer: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.Primary,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
  button: {
    height: 50,
    backgroundColor: "#4871EA",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 100,
    position: "absolute",
    bottom: 0,
    left: 25,
    right: 25,
  },
  textButton: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.White,
    fontFamily: "Poppins-Medium",
  },
  textToken: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.Black,
    textAlign: "left",
    fontFamily: "Poppins-Medium",
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.Black,
    textAlign: "left",
    fontFamily: "Poppins-Bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  box: {
    backgroundColor: "#eeeeee",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    gap: 20,
    marginTop: 30,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.Gray,
    fontFamily: "Poppins-Medium",
  },
});
