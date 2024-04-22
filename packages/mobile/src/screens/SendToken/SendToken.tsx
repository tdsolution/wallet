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
import ItemYourWallet from "./Item/ItemYourWallet";

const SendToken = () => {
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
        <Text style={globalStyles.textHeader}>Send MATIC</Text>
        <Text style={{ opacity: 0 }}>scacasc</Text>
      </View>
      <View>
        <View style={{ gap: 25, paddingHorizontal: 25 }}>
          <View>
            <Text style={styles.lable}>Address</Text>
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
                <Text
                  style={[
                    styles.lable,
                    {
                      color: colors.Primary,
                      marginRight: 10,
                      marginBottom: 0,
                    },
                  ]}
                >
                  Paste
                </Text>
                <TouchableOpacity>
                  <Image
                    style={[styles.iconClose]}
                    source={require("../../assets/icons_v1/icon_qr.png")}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View>
            <Text style={styles.lable}>Amount</Text>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.input}
                placeholder="0.0"
                placeholderTextColor={colors.Gray_Light}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={[
                    styles.lable,
                    {
                      color: colors.Primary,
                      marginBottom: 0,
                    },
                  ]}
                >
                  Max
                </Text>
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
        <Text style={styles.textButton}>Next</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default SendToken;

const styles = StyleSheet.create({
  iconClose: {
    width: 16,
    height: 16,
    resizeMode: "contain",
    tintColor: colors.Primary,
  },
  input: {
    width: "80%",
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
    width: "100%",
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
    borderColor: '#DDDDDD',
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
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
});
