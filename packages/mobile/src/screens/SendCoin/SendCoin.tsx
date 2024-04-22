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
import ItemYourWallet from "../../screens/SendToken/Item/ItemYourWallet";

const SendCoin = () => {
  const navigation = useNavigation();
  const [wallet, setWallet] = React.useState([
    { id: "1", name: "" },
    { id: "2", name: "" },
  ]);
  const handleBack = () => {
    navigation.goBack();
  };
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
            source={require("../../assets/icons/png/ic-close-16.png")}
          />
        </TouchableOpacity>
        <Text style={globalStyles.textHeader}>Send Coins</Text>
        <Text style={{ opacity: 0 }}>scacasc</Text>
      </View>
      <View>
        <View style={{ gap: 25, paddingHorizontal: 25 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={styles.title}>From</Text>
            <View
              style={{
                width: "80%",
                borderWidth: 1,
                flexDirection: "row",
                alignItems: "center",
                borderRadius: 8,
                padding: 10,
                borderColor: "#DDDDDD",
              }}
            >
              <Image
                style={[styles.image]}
                source={require("../../assets/icons_v1/icon_qr.png")}
              />
              <View>
                <Text style={styles.textTitle}>Main Account</Text>
                <Text style={styles.textToken}>saasssaa</Text>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={styles.title}>To</Text>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.input}
                placeholder="0x..."
                placeholderTextColor={colors.Gray_Light}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <TouchableOpacity>
                  <Image
                    style={[styles.iconClose, { tintColor: colors.Black }]}
                    source={require("../../assets/icons_v1/icon_qr.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: 1,
            borderWidth: 0.2,
            borderColor: "#EEEEEE",
            marginVertical: 20,
          }}
        ></View>
        <View style={{ paddingHorizontal: 25 }}>
          <Text style={styles.title}>Your wallets</Text>
          <FlatList
            contentContainerStyle={{ gap: 10 }}
            data={wallet}
            renderItem={({ item }) => <ItemYourWallet />}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
      </View>
      <TouchableOpacity style={[styles.button]}>
        <Text style={styles.textButton}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SendCoin;

const styles = StyleSheet.create({
  iconClose: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    tintColor: colors.Primary,
  },
  input: {
    width: "93%",
    height: 57,
    paddingVertical: 5,
    paddingRight: 10,
    fontSize: 16,
    fontWeight: "500",
    color: colors.Black,
    textAlign: "left",
    fontFamily: "Poppins-Light",
    alignItems: "center",
    justifyContent: "center",
  },
  lable: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.Black,
    textAlign: "left",
    fontFamily: "Poppins-Bold",
    marginBottom: 10,
  },
  iconInput: {
    width: 20,
    height: 20,
    tintColor: colors.Gray_Light,
    resizeMode: "contain",
  },
  boxInput: {
    width: "80%",
    height: 57,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: "500",
    color: colors.Black,
    textAlign: "left",
    fontFamily: "Poppins-Light",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.Black,
    textAlign: "left",
    fontFamily: "Poppins-Bold",
    marginBottom: 16,
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
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "contain",
    marginRight: 10,
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
});
