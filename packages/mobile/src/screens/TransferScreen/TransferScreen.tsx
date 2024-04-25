import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import HeaderBar from "../../components/HeaderBar";
import { useNavigation } from "@tonkeeper/router";
import { colors } from "../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import { useChain, useEvm } from "@tonkeeper/shared/hooks";
import { send } from "process";
import { SendCoinEVM, SendTokenEVM } from "$libs/EVM/send/SendCoinAndToken";
import { handlers } from "react-native-localize/dist/typescript/module";
import { WalletStackRouteNames } from "$navigation";
import { Toast } from "$store";
import SaveTransaction, { TransactionModel } from "$libs/EVM/HistoryEVM/SaveTransaction";

const TransferScreen = ({route}) => {
  const {id, symbol, image, address, addressToken, rpc, addressTo, amount} = route.params;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chain = useChain()?.chain;
  const evm = useEvm()?.evm;

  const handleBack = () => {
    navigation.goBack();
  };

  // const addressToken = "0x06A0F0fa38AE42b7B3C8698e987862AfA58e90D9";
  function formatHexString(hexString: string) {
    const prefix = hexString.slice(0, 10); // Lấy các ký tự đầu tiên (bao gồm cả "0x" và 6 ký tự tiếp theo)
    const suffix = hexString.slice(-6); // Lấy 6 ký tự cuối cùng
    return prefix + '...' + suffix;
  };
  const handleContinue = async () => {
    setIsLoading(true);
    try { 
      if (addressToken != "coin") {
        await SendTokenEVM(addressTo, evm.privateKey, chain.rpc, addressToken, amount);
         Toast.success("Transaction success!!");
      const sampleTransaction: TransactionModel = {
        unSwap: true,
        amount: amount,
        fromAddress: evm.addressWallet,
        toAddress: addressTo,
        idxChain: chain.chainId,
        isRead: false,
        name:  "Send Coin",
        symbol: symbol,
        time: Date.now().toString(),
      };
      await SaveTransaction.fullFlowSaveData([sampleTransaction]);
      setIsLoading(false);
        navigation.navigate(WalletStackRouteNames.DetailToken, { 
        id: id, 
        symbol: symbol,
        image: image,
        address: address,
        addressToken: addressToken,
        rpc: rpc,
      });
      }
     else if (addressToken == "coin") {
        await SendCoinEVM(addressTo, evm.privateKey, chain.rpc, amount);
         Toast.success("Transaction success!!");
      const sampleTransaction: TransactionModel = {
        unSwap: true,
        amount: amount,
        fromAddress: evm.addressWallet,
        toAddress: addressTo,
        idxChain: chain.chainId,
        isRead: false,
        name:  "Send Token" ,
        symbol: symbol,
        time: Date.now().toString(),
      };
        await SaveTransaction.fullFlowSaveData([sampleTransaction]);
        setIsLoading(false);
        navigation.navigate(WalletStackRouteNames.DetailToken, { 
        id: id, 
        symbol: symbol,
        image: image,
        address: address,
        addressToken: addressToken,
        rpc: rpc,
      });
      }
    }
    catch(error) {
      Toast.fail('Transaction failed!!');
    }
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
            source={require("../../assets/icons/png/ic-arrow-up-16.png")}
          />
        </TouchableOpacity>
        <View style={{width: "100%", alignItems: "center"}}>
        <Text style={[globalStyles.textHeader, {marginLeft: -40}]}>Transfer</Text>
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={styles.price}>{amount} {chain.name}</Text>
        <Text style={styles.priceDolla}>= 0.0 $</Text>
      </View>
      <View style={styles.box}>
        <View style={styles.row}>
          <Text style={styles.text}>Asset</Text>
          <Text style={styles.text}>Core Chain ({chain.name})</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>From</Text>
          <Text style={styles.text}>{formatHexString(evm.addressWallet)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.text}>To</Text>
          <Text style={styles.text}>{formatHexString(addressTo)}</Text>
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
      <TouchableOpacity style={[styles.button]} onPress={handleContinue}>
        <Text style={styles.textButton}>Continue</Text>
      </TouchableOpacity>
      {isLoading && <View
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      >
      <ActivityIndicator size="large" color={colors.Primary}/>
    </View>}
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
