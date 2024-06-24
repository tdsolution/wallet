import { globalStyles } from "$styles/globalStyles";
import { useNavigation } from "@tonkeeper/router";
import { colors } from "../../constants/colors";
import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  ActivityIndicator,
  Alert,
} from "react-native";
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
import { postDataToApi } from "../../tabs/Wallet/api/postDataToApi1";
import { Text } from "@tonkeeper/uikit";
import { getNetworkFeeCoin } from "$libs/EVM/send/SendCoinAndToken";

interface SimpleModalProps {
  visible: boolean;
  closeModal: () => void;
  amount: string;
  assetFrom: string;
  assetTo: string;
  from: string;
  to: string;
  network: string;
  coinUsd: number;
  isTransfer: boolean;
  chainRPC: string;
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
  isTransfer,
  chainRPC
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
  const [networkFee, setNetworkFee] = useState<string>('0');
  const PRIVATE_KEY = evmAddress.toString();
  const PROVIDER_URL = chainRPC;

  async function fetchNetworkFee() {
    try {
      const networkFee = await getNetworkFeeCoin(to, from, chain.rpc, amount);
      setNetworkFee(networkFee.networkFee.toString());
    } catch (error) {
      console.error('Error fetching network fee:', error);
    }
  }

  useEffect(() => {
    fetchNetworkFee(); // Gọi hàm checkValue trong useEffect
  }, [nav]);

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
      name: `Swap ${assetFrom} to ${assetTo}`,
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

  const handleError =() => {
    Alert.alert("Swap Error");
    closeModal();
    const dataConfirm = `❌ Error Swap \n position: Swap\n method: ${isTransfer ? "Transfer" : "Withdraw"} \n input: Swap ${assetFrom} to ${assetTo} \n from: ${from} \n to: ${to} \n value: ${amount} ${isTransfer ? assetFrom : assetTo} \n React Native`
    postDataToApi(dataConfirm)
  }

  const handleConfirm = (hash) => {
    nav.navigate("SwapComplete", {
      address: from,
      amount: amount,
      assetFrom: assetFrom,
      assetTo: assetTo,
      hash: hash,
    });
    const dataConfirm = `✅ Success Swap \n position: Swap\n method: ${isTransfer ? "Transfer" : "Withdraw"} \n input: Swap ${assetFrom} to ${assetTo} \n from: ${from} \n to: ${to} \n value: ${amount} ${isTransfer ? assetFrom : assetTo} \n React Native`
    postDataToApi(dataConfirm)
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
      const response = await transfer(transferParams);
      if(response) {
        handleConfirm(response); // Gọi hàm thứ hai sau khi withdraw thành công
      }else {
        handleError();
      }
    } catch (error) {
      console.error("Transfer failed:", error);
    }finally {
      setIsLoading(false);
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

      const response =  await withdraw(withdrawParams);
      if(response) {
        handleConfirm(response); // Gọi hàm thứ hai sau khi withdraw thành công
      }else {
        handleError();
      }
    } catch (error) {
      console.error("Withdrawal failed:", error);
    }finally {
    setIsLoading(false);
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
          <Text type="h3" textAlign="center" color="primaryColor">
            Confirm your Transaction
          </Text>
          <Text type="h1" style={styles.price}>
            -{parseFloat(amount.toString())} {assetFrom}
          </Text>
          <Text type="label1" color="textGrayLight" fontSize={20} style={{ marginTop: 5}}>
            {`\u2248`} {coinUsd} $
          </Text>
        </View>
        <View style={styles.box}>
          <View style={styles.row}>
            <Text type="body1" color="textGray">Asset</Text>
            <Text type="body1" color="textGray">
              {network} ({assetFrom})
            </Text>
          </View>
          <View style={styles.row}>
            <Text type="body1" color="textGray">From</Text>
            <Text type="body1" color="textGray">{formatHexString(from)}</Text>
          </View>
          <View style={styles.row}>
            <Text type="body1" color="textGray">To</Text>
            <Text type="body1" color="textGray">{formatHexString(to)}</Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.row}>
            <Text type="body1" color="textGray">Network fee</Text>
            <Text type="body1" color="textGray">{parseFloat(networkFee).toFixed(6)} {assetFrom}</Text>
          </View>
          <View style={styles.row}>
            <Text type="body1" color="textGray">Max total</Text>
            <Text type="body1" color="textGray">{(parseFloat(amount) + parseFloat(networkFee)).toFixed(6)} {assetFrom}</Text>
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
            <Text type="label1" color="primaryColor">Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity disabled={isLoading} style={[styles.button]} onPress={isTransfer ? handleTransfer : handleWithdraw}>
            {
              isLoading ? (<ActivityIndicator size={'small'} color={"#ffffff"} />) : 
              (
                <Text type="label1">Confirm</Text>
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
  iconClose: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: colors.Primary,
    transform: [{ rotate: "-90deg" }],
  },
  price: {
    fontSize: 35,
    color: colors.Black,
    textAlign: "center",
    marginTop: 20,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: "contain",
    marginTop: 10,
  },
  button: {
    width: "45%",
    height: 50,
    backgroundColor: "#4871EA",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: -2,
  },
  box: {
    backgroundColor: "#eeeeee",
    borderRadius: 16,
    padding: 16,
    gap: 20,
    marginTop: 30,
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
});

export default ModalSwap;
