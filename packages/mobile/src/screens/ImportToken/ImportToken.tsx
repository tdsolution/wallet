import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import React from "react";
import { colors } from "../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import InputItem from "./Item/InputItem";
import { ScrollView } from "react-native-gesture-handler";

const ImportToken = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          globalStyles.row,
          {
            paddingHorizontal: 5,
            paddingVertical: 10,
            backgroundColor: colors.Primary,
          },
        ]}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Image
            source={require("../../assets/icons/png/ic-chevron-left-16.png")}
            style={styles.iconBack}
          />
          <Text style={styles.textBack}>Back</Text>
        </TouchableOpacity>
        <Text style={[globalStyles.textHeader, { color: colors.White }]}>
          Import Token
        </Text>
        <Text style={{ opacity: 0 }}>ascasac </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={{ padding: 25 }}>
            <Text style={styles.textTitle}>Imports your custom Tokens</Text>
            <Text style={styles.textBody}>
              Please select the appropriate network with additional Tokens to
              include in your wallet
            </Text>
            <View style={{ marginTop: 25 }}>
              <Text style={styles.textXChoose}>Choose your network</Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: colors.Primary,
                  borderRadius: 8,
                  overflow: "hidden",
                  paddingHorizontal: 10,
                  paddingVertical: 15,
                  marginTop: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={require("../../assets/logo/img_usdt.png")}
                    style={{ width: 50, height: 50, resizeMode: "contain" }}
                  />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: "600",
                      color: colors.Black,
                      fontFamily: "Poppins-Bold",
                      marginLeft: 10,
                    }}
                  >
                    Etherium
                  </Text>
                </View>
                <Image
                  source={require("../../assets/icons/png/ic-dropdown-12.png")}
                  style={{ tintColor: colors.Primary, width: 24, height: 24 }}
                />
              </View>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: 10,
              backgroundColor: colors.Gray_Light,
              marginVertical: 20,
            }}
          ></View>
          <View style={{ paddingHorizontal: 25 }}>
            <InputItem lable="Token Address" placeholder="Ox..." icon={false} />
            <InputItem lable="Symbol" placeholder="ETH" icon={true} />
            <InputItem
              lable="Decimals"
              placeholder="18"
              type="numeric"
              icon={true}
            />
            <TouchableOpacity style={styles.button}>
              <Text style={styles.textButton}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ImportToken;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Primary,
  },
  textBack: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.White,
    fontFamily: "Poppins-Medium",
    marginLeft: 12,
  },
  iconBack: {
    width: 16,
    height: 16,
    tintColor: colors.White,
    resizeMode: "contain",
  },
  content: {
    flex: 1,
    backgroundColor: colors.White,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.White,
    fontFamily: "Poppins-Medium",
    marginBottom: 10,
  },

  textTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#4871EA",
    lineHeight: 26,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
  },
  textBody: {
    fontSize: 14,
    fontWeight: "500",
    color: "#909090",
    lineHeight: 20,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    marginTop: 10,
  },
  textXChoose: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4871EA",
    lineHeight: 26,
    textAlign: "left",
    fontFamily: "Poppins-Bold",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#4871EA",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 100,
  },
  textButton: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.White,
    fontFamily: "Poppins-Medium",
  },
});
