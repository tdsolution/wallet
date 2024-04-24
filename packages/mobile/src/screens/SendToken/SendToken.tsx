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
  Alert,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import HeaderBar from "../../components/HeaderBar";
import { useNavigation } from "@tonkeeper/router";
import { colors } from "../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import ItemYourWallet from "./Item/ItemYourWallet";
import SaveListWallet, { ListWalletModel } from "$libs/EVM/SaveWallet";
import { Icon } from "$uikit";
import Clipboard from "@react-native-community/clipboard";
import SaveTransaction, {
  TransactionModel,
} from "$libs/EVM/HistoryEVM/SaveTransaction";
import { Toast } from "@tonkeeper/uikit";

const SendToken = ({ route }: any) => {
  const { id, symbol, image, address, addressToken, rpc ,price} = route.params;
  const navigation = useNavigation();
  const [wallet, setWallet] = useState<ListWalletModel[]>();
  const [addressInput, setAddressInput] = useState("");
  const [amount, setAmount] = useState("0.0");

  useEffect(() => {
    async function getdata() {
        const data = await SaveListWallet.getData();
        setWallet(data);
    }
    getdata();
  }, []);

  const handlePasteAddress = (addressInput) => {
    setAddressInput(addressInput);
    console.log(addressInput);
  }

  const onCleanTextInput = () => {
    setAddressInput("");
  };
  const onCleanTextAmount = () => {
    setAmount("0.0");
  };

  const pasteText = async () => {
    const clipboardContent = await Clipboard.getString();
    setAddressInput(clipboardContent);
  };
 
  const handleBack = () => {
    navigation.goBack();
  };
  const handleNext = useCallback(() => {
    if(price > 0){
      Toast.success("");
    }else{
      Toast.fail('Insufficient balance!!');
    }
  }, []);


  const sampleTransaction: TransactionModel = {
    unSwap: true,
    amount: "1000000000",
    fromAddress: "0x42D78018D4607566c70B8AfBc993CF1289B26cCE",
    toAddress: "0x483bBF9Fdaa62892eA53aC791F7a41CD9bd6FDdD",
    idxChain: "97",
    isRead: false,
    name: "Send Coin",
    symbol: "USDT",
    time: Date.now().toString(),
  };

  // Định nghĩa hàm xử lý thêm token
  const handleAddTransaction = async () => {
    try {
      // Gọi hàm fullFlowSaveData từ lớp SaveTransaction để lưu transaction mẫu
      await SaveTransaction.fullFlowSaveData([sampleTransaction]);
      console.log("Sample transaction saved successfully!");
    } catch (error) {
      console.error("Error saving sample transaction:", error);
    }
  };

  const handleClearToken = async () => {
    try {
      // Gọi hàm fullFlowSaveData từ lớp SaveTransaction để lưu transaction mẫu
      const result = await SaveTransaction.clearData();
    } catch (error) {
      console.error("Error saving sample transaction:", error);
    }
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
        <Text style={[globalStyles.textHeader, {marginLeft: -5}]}>Send {symbol}</Text>
        </View>
      </View>
      <View style={{flex:1, justifyContent: "space-between"}}>
        <View>
          <View style={{ gap: 25, paddingHorizontal: 25 }}>
            <View>
              <Text style={styles.lable}>Address</Text>
              <View style={styles.boxInput}>
                <TextInput
                  style={styles.input}
                  placeholder="0x..."
                  placeholderTextColor={colors.Gray_Light}
                  value={addressInput}
                  onChangeText={(text) => setAddressInput(text)}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    width: "30%"
                  }}
                >
                  { addressInput ?
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
                  value={amount}
                  onChangeText={(text) => setAmount(text)}
                />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                   { amount ?
                  <TouchableOpacity onPress={onCleanTextAmount} style={{marginRight:10}}>
                  <Icon name="ic-close-16" color= "primaryColor"/>
                  </TouchableOpacity>
                : <></>}
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
          </View>
        </View>
      </View>
      </Pressable>
      </ScrollView>
         <View style={{paddingHorizontal: 10 }}>
          <TouchableOpacity style={[styles.button]} onPress={handleNext}>
            <Text style={styles.textButton}>Next</Text>
          </TouchableOpacity>
        </View> 
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
    borderColor: "#DDDDDD",
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
    paddingVertical:16,
    backgroundColor: "#4871EA",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 100,
    width: "100%",
  },
  button1:{
    paddingVertical:16,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 100,
    width: "100%",
    backgroundColor:'red'
  },
  textButton: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.White,
    fontFamily: "Poppins-Medium",
  },
});
