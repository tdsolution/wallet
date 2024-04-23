import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  Pressable,
  Keyboard,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderBar from "../../components/HeaderBar";
import { useNavigation } from "@tonkeeper/router";
import { colors } from "../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import ItemYourWallet from "./Item/ItemYourWallet";
import SaveListWallet, { ListWalletModel } from "$libs/EVM/SaveWallet";
import { Icon } from "$uikit";
import Clipboard from "@react-native-community/clipboard";

const SendToken = () => {
  const navigation = useNavigation();
  const [wallet, setWallet] = useState<ListWalletModel[]>();
  const [address, setAddress] = useState("");

  useEffect(() => {
    async function getdata() {
        const data = await SaveListWallet.getData();
        setWallet(data);
    }
    getdata();
  }, []);

  const handlePasteAddress = (address) => {
    setAddress(address);
    console.log(address);
  }

  const onCleanTextInput = () => {
    setAddress("");
  };

  const pasteText = async () => {
    const clipboardContent = await Clipboard.getString();
    setAddress(clipboardContent);
  };
 
  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
      <Pressable onPress={Keyboard.dismiss} style={{flex:1}}>
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
        <View style={{alignItems: "center", width: "100%"}}>
        <Text style={[globalStyles.textHeader, {marginLeft: -5}]}>Send MATIC</Text>
        </View>
      </View>
      <View style={{flex:1}}>
        <View style={{ gap: 25, paddingHorizontal: 25 }}>
          <View>
            <Text style={styles.lable}>Address</Text>
            <View style={styles.boxInput}>
              <TextInput
                style={styles.input}
                placeholder="0x..."
                placeholderTextColor={colors.Gray_Light}
                value={address}
                onChangeText={(text) => setAddress(text)}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  width: "30%"
                }}
              >
                { address ?
                <TouchableOpacity onPress={onCleanTextInput}>
                <Icon name="ic-close-16" color= "primaryColor"/>
                </TouchableOpacity>
              : <></>}
              <TouchableOpacity onPress={pasteText}>
                <Text
                  style={[
                    styles.lable,
                    {
                      color: colors.Primary,
                      marginLeft: 8,
                      marginBottom: -2,
                    },
                  ]}
                >
                  Paste
                </Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image
                    style={[styles.iconQR]}
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
          {wallet?.map((item, index) => (<ItemYourWallet item={item} callback={handlePasteAddress} key={index}/>))}
          {/* <FlatList
            contentContainerStyle={{ gap: 10 }}
            data={wallet}
            renderItem={({item }) => <ItemYourWallet item={item} callback={handlePasteAddress}/>}
            keyExtractor={(item) => item.privateKey}
          /> */}
        </View>
        <View style={{paddingHorizontal: 25 }}>
          <TouchableOpacity style={[styles.button]}>
            <Text style={styles.textButton}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
      </Pressable>
      </ScrollView>
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
  iconQR: {
    width: 20,
    height: 20,
    resizeMode: "contain",
    tintColor: colors.Primary,
    marginLeft: 8,
  },
  input: {
    width: "70%",
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
    width: "100%",
  },
  textButton: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.White,
    fontFamily: "Poppins-Medium",
  },
});
