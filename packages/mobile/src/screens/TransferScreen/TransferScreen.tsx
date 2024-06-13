import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@tonkeeper/router";
import { colors } from "../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import { useChain, useEvm } from "@tonkeeper/shared/hooks";
import { GasLimitPromise, SendCoinEVM, SendTokenEVM } from "$libs/EVM/send/SendCoinAndToken";
import { WalletStackRouteNames } from "$navigation";
import { Toast } from "$store";
import SaveTransaction, { TransactionModel } from "$libs/EVM/HistoryEVM/SaveTransaction";
import SaveListCoinRate from "$libs/EVM/api/get_exchange_rate";
import { Text } from "@tonkeeper/uikit";

const TransferScreen = ({route}) => {
  const {id, symbol, image, address, addressToken, rpc, addressTo, amount} = route.params;
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const chain = useChain()?.chain;
  const evm = useEvm()?.evm;
  const [gasLimit, setGasLimit] = useState<string>('0');
  const [coinRate, setCoinRate] = useState<string>('0');

  const handleBack = () => {
    navigation.goBack();
  };

  // const addressToken = "0x06A0F0fa38AE42b7B3C8698e987862AfA58e90D9";
  function formatHexString(hexString: string) {
    const prefix = hexString.slice(0, 10); // Lấy các ký tự đầu tiên (bao gồm cả "0x" và 6 ký tự tiếp theo)
    const suffix = hexString.slice(-6); // Lấy 6 ký tự cuối cùng
    return prefix + '...' + suffix;
  };
  const handleRandomId = () => {
    let timestamp = Date.now();
    let random = Math.floor(Math.random() * 100000);
    return timestamp.toString() + random.toString();
  };

  const handleTimeStamp = () => {
    let timestamp = Date.now();
    return timestamp.toString();
  };

  const handleContinue = async () => {
    setIsLoading(true);
    if (addressToken != "coin") {
      const a = await SendTokenEVM(addressTo, evm.privateKey, chain.rpc, addressToken, amount);
      if (a) {
        Toast.success("Transaction success!!");
        const sampleTransaction: TransactionModel = {
          unSwap: true,
          amount: amount,
          fromAddress: evm.addressWallet,
          toAddress: addressTo,
          idxChain: chain.chainId,
          isRead: false,
          name: "Send Token",
          symbol: symbol,
          time: Date.now().toString(),
          id: handleRandomId()
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
        })
      }
      else {
        Toast.fail('Transaction failed!!');
        setIsLoading(false);
      }
    }
    else if (addressToken == "coin") {
      const a = await SendCoinEVM(addressTo, evm.privateKey, chain.rpc, amount);
      if (a) {
        Toast.success("Transaction success!!");
        const sampleTransaction: TransactionModel = {
          unSwap: true,
          amount: amount,
          fromAddress: evm.addressWallet,
          toAddress: addressTo,
          idxChain: chain.chainId,
          isRead: false,
          name: "Send Coin",
          symbol: symbol,
          time: Date.now().toString(),
          id: handleRandomId()
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
      else {
        Toast.fail('Transaction failed!!');
        setIsLoading(false);
      }
    }
  };
 useEffect(() => {
    async function fetchGasLimit() {
      try {
        const gasLimit = await GasLimitPromise(addressTo, evm.privateKey, chain.rpc, amount);
        setGasLimit(gasLimit);
      } catch (error) {
        console.error('Error fetching gas limit:', error);
      }
    }
     async function fetchCoinRate() {
      try {
        const coinRate = await SaveListCoinRate.getCoinRateById(id);
        setCoinRate(coinRate?.usd ?? '0');
      } catch (error) {
        console.error('Error fetching gas limit:', error);
      }
    }
    fetchGasLimit();
    fetchCoinRate();
  }, []);
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
        <Text type="h2" color="primaryColor" style={{marginLeft: -40}}>Transfer</Text>
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text type="h1" color="textPrimaryAlternate" style={{ marginTop: 20}}>{amount} {chain.currency}</Text>
        <Text type="label1" color="textGrayLight" style={{marginTop: 5}}>= 0.0 $</Text>
      </View>
      <View style={styles.box}>
        <View style={styles.row}>
          <Text type="label1" color="textGray">Asset</Text>
          <Text type="label1" color="textGray">{chain.name}</Text>
        </View>
        <View style={styles.row}>
          <Text type="label1" color="textGray">From</Text>
          <Text type="label1" color="textGray">{formatHexString(evm.addressWallet)}</Text>
        </View>
        <View style={styles.row}>
          <Text type="label1" color="textGray">To</Text>
          <Text type="label1" color="textGray">{formatHexString(addressTo)}</Text>
        </View>
      </View>
      <View style={styles.box}>
        <View style={styles.row}>
          <Text type="label1" color="textGray">Network fee</Text>
          <Text type="label1" color="textGray">{gasLimit} {chain.currency} {'('+(parseFloat(gasLimit) * parseFloat(coinRate)).toFixed(6)+'$)'}</Text>
        </View>
        <View style={styles.row}>
          <Text type="label1" color="textGray">Max total</Text>
          <Text type="label1" color="textGray">{((parseFloat(gasLimit) * parseFloat(coinRate))+(parseFloat(amount) * parseFloat(coinRate))).toFixed(6)} $</Text>
        </View>
      </View>
      <TouchableOpacity style={[styles.button]} onPress={handleContinue}>
        <Text type="label1">Confirm</Text>
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
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: "contain",
    marginTop: 10,
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
});