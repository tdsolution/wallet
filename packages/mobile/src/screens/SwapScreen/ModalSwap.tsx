import { globalStyles } from "$styles/globalStyles";
import { useNavigation } from "@tonkeeper/router";
import { colors } from "../../constants/colors";
import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { ethers, JsonRpcProvider, formatUnits } from "ethers";
import {
  swapETHForTokens,
  transfer,
  withdraw,
} from "./swapDataToken";
import { useEvm, useChain } from "@tonkeeper/shared/hooks";
import { useSwapCoin } from "@tonkeeper/shared/hooks/useSwapCoin";
import SaveTransaction, {
  TransactionModel,
} from "$libs/EVM/HistoryEVM/SaveTransaction";

interface SimpleModalProps {
  visible: boolean;
  closeModal: () => void;
  amount: string | number;
  assetFrom: string;
  assetTo: string;
  from: string;
  to: string;
  network: string;
  coinUsd: number;
  isTransfer: boolean;
}

const ModalSwap: React.FC<SimpleModalProps> = ({
  visible,
  closeModal,
  amount,
  assetFrom,
  assetTo,
  from,
  to,
  network,
  coinUsd,
  isTransfer
}) => {
  function formatHexString(hexString: string) {
    const prefix = hexString.slice(0, 10); // Lấy các ký tự đầu tiên (bao gồm cả "0x" và 6 ký tự tiếp theo)
    const suffix = hexString.slice(-6); // Lấy 6 ký tự cuối cùng
    return prefix + "..." + suffix;
  }
  const nav = useNavigation();
  const evm = useEvm()?.evm;
  const chain = useChain()?.chain;
  const swapCoinItem = useSwapCoin()?.swapCoinItem;
  let evmAddressWallet = evm.addressWallet;
  let evmAddress = evm.privateKey;
  evmAddress = evmAddress.replace(/^"|"$/g, '');

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const PRIVATE_KEY = evmAddress.toString();
  const PROVIDER_URL = chain.rpc;

  const handleRandomId = () => {
    let timestamp = Date.now();
    let random = Math.floor(Math.random() * 100000);
    return timestamp.toString() + random.toString();
  };

  const handleTimeStamp = () => {
    let timestamp = Date.now();
    return timestamp.toString();
  };

  const transactionSwap = () => {
    const sampleTransaction: TransactionModel = {
      id: handleRandomId(),
      unSwap: true,
      amount: amount.toString(),
      fromAddress: evmAddressWallet,
      toAddress: swapCoinItem.tokenAddress,
      idxChain: chain.chainId,
      isRead: false,
      name: "Swap",
      symbol: chain.currency,
      time: handleTimeStamp(),
    };
    return sampleTransaction;
  };

  // Định nghĩa hàm xử lý thêm token
  const handleAddTransaction = async () => {
    try {
      // Gọi hàm fullFlowSaveData từ lớp SaveTransaction để lưu transaction mẫu
      await SaveTransaction.fullFlowSaveData([transactionSwap()]);
      console.log("Sample transaction saved successfully!");
    } catch (error) {
      console.error("Error saving sample transaction:", error);
    }
  };
  const handleConfirm = () => {
    setIsLoading(false);
    nav.navigate("SwapComplete", {
      address: from,
      amount: amount,
      assetFrom: assetFrom,
      assetTo: assetTo,
    });
    handleAddTransaction()
    closeModal();
  };

  const yourFunction = async () => {
    // Tham số cho phương thức swapETHForTokens
    const swapParams = {
      providerUrl: "https://bsc-testnet.publicnode.com/",
      privateKey:
        "0xfef17f1b207ef081566892220c65c63d4771d931dd2620d50589942275faccd3",
      contractAddress: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
      amountInETH: "0.01",
      minTokens: "0",
    };

    // Gọi phương thức swapETHForTokens từ module hiện tại
    console.log('Check');
    await swapETHForTokens(swapParams);
  };

  // Định nghĩa hàm để gọi transfer
  const handleTransfer = async () => {
    const transferParams = {
      providerUrl: PROVIDER_URL,
      privateKey: PRIVATE_KEY, // Thay bằng private key của ví nguồn
      recipientAddress: swapCoinItem.tokenAddress,
      amount: amount.toLocaleString(), // Chuyển 0.01 BNB
    };

    try {
      setIsLoading(true);
      await transfer(transferParams);
      handleConfirm(); // Gọi hàm thứ hai sau khi withdraw thành công
    } catch (error) {
      console.error("Withdrawal failed:", error);
    }
    // await transfer(transferParams);
  };

  // Định nghĩa hàm để gọi withdraw
  const handleWithdraw = async () => {
    const withdrawParams = {
      providerUrl: PROVIDER_URL,
      privateKey: PRIVATE_KEY, // Thay bằng private key của ví nguồn
      contractAddress: swapCoinItem.tokenAddress, // Thay bằng địa chỉ hợp đồng token của bạn
      recipientAddress: swapCoinItem.tokenAddress,
      amount: amount.toLocaleString(), // Số lượng token cần rút
    };

    try {
      setIsLoading(true);
      await withdraw(withdrawParams);
      handleConfirm(); // Gọi hàm thứ hai sau khi withdraw thành công
    } catch (error) {
      console.error("Withdrawal failed:", error);
    }
    // await withdraw(withdrawParams);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <Pressable style={styles.modalContainer} onPress={closeModal}></Pressable>
      <View style={styles.innerContainer}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={[globalStyles.textHeader, { fontWeight: "bold" }]}>
            Confirm your Transaction
          </Text>
          <Text style={styles.price}>
            -{parseFloat(amount.toString())} {assetFrom}
          </Text>
          <Text style={styles.priceDolla}>
            {`\u2248`} {coinUsd} $
          </Text>
        </View>
        <View style={styles.box}>
          <View style={styles.row}>
            <Text style={styles.text}>Asset</Text>
            <Text style={styles.text}>
              {network} ({assetFrom})
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>From</Text>
            <Text style={styles.text}>{formatHexString(from)}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>To</Text>
            <Text style={styles.text}>{formatHexString(to)}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.row}>
            <Text style={styles.text}>Network fee</Text>
            <Text style={[styles.text]}>0.0005 tBNB</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Max total</Text>
            <Text style={styles.text}>0.0005 {assetFrom}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <TouchableOpacity style={[styles.btnReject]} onPress={closeModal}>
            <Text style={styles.textReject}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={isLoading} style={[styles.button]} onPress={isTransfer ? handleTransfer : handleWithdraw}>
            {
              isLoading ? (<ActivityIndicator size={'small'} color={"#ffffff"} />) : 
              (
                <Text style={styles.textButton}>Confirm</Text>
              )
            }
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
    position: "relative",
  },
  innerContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
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
    width: "45%",
    height: 50,
    backgroundColor: "#4871EA",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
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
    gap: 20,
    marginTop: 30,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.Gray,
    fontFamily: "Poppins-Medium",
  },
  btnReject: {
    width: "45%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.Primary,
  },
  textReject: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.Primary,
    fontFamily: "Poppins-Medium",
  },
});

export default ModalSwap;
