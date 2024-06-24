import React, { useState, useEffect } from 'react';
import { Button, View, TextInput, StyleSheet, Alert, TouchableOpacity, Image, SafeAreaView, Dimensions, ActivityIndicator } from 'react-native';
import { ethers } from 'ethers';
import { useEvm, useChain } from "@tonkeeper/shared/hooks";
import { useNavigation } from '@tonkeeper/router';
import { globalStyles } from '$styles/globalStyles';
import { colors } from '../../constants/colors';
import { Text } from '@tonkeeper/uikit';
import { openScanQR, openSend } from "$navigation";
import { WalletStackRouteNames } from "$navigation";
import { CryptoCurrencies } from "$shared/constants";
import { DeeplinkOrigin, useDeeplinking } from "$libs/deeplinking";
import { openRequireWalletModal } from "$core/ModalContainer/RequireWallet/RequireWallet";
import { Address } from "@tonkeeper/core";
import { store } from "$store";
import Clipboard from "@react-native-community/clipboard";
import ModalReferral from '../../screens/ReferralScreen/item/ModalReferral';
import { postDataToApi } from "../../tabs/Wallet/api/postDataToApi1";
import SaveTransaction, {
  TransactionModel,
} from "$libs/EVM/HistoryEVM/SaveTransaction";

const { width, height } = Dimensions.get('window')

const SendNFT = ({ route }) => {
  const { tokenId, image } = route.params;
  const [toAddress, setToAddress] = useState<string>('');
  const [index, setIndex] = useState<number>(0);
  const [status, setStatus] = useState<string>('');
  const [balanceOf, setBalanceOf] = useState<string>('0');
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [titleModal, setTitleModal] = useState<string>('Success');
  const [subtitleModal, setSubtitleModal] = useState<string>('Send NFT successfully!');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  let disable = toAddress.length > 0 && isLoading == false;

  const evm = useEvm()?.evm;
  const chain = useChain()?.chain;
  const addressEvm = evm.addressWallet;
  const privateKey = evm.privateKey;
  const navigation = useNavigation();
  const deeplinking = useDeeplinking();

  const navigateToFirstScreen = () => {
    // navigation.replace(WalletStackRouteNames.Wallet);
    navigation.reset({
      index: 0,
      routes: [{ name: WalletStackRouteNames.Wallet }],
    });
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

  const transactionSendNFT = () => {
    const sampleTransaction: TransactionModel = {
      id: tokenId,
      unSwap: true,
      amount: '1',
      fromAddress: addressEvm,
      toAddress: toAddress,
      idxChain: chain.chainId,
      isRead: false,
      name: 'Send NFT',
      symbol: chain.currency,
      time: handleTimeStamp(),
    };
    return sampleTransaction;
  };

  const handleAddTransaction = async () => {
    try {
      // Gọi hàm fullFlowSaveData từ lớp SaveTransaction để lưu transaction mẫu
      await SaveTransaction.fullFlowSaveData([transactionSendNFT()]);
      console.log("Sample transaction saved successfully!");
    } catch (error) {
      console.error("Error saving sample transaction:", error);
    }
  };

  const handleError =() => {
    handleCloseModal();
    const dataConfirm = `❌ Error Send NFT \n position: Send NFT\n method: transferFrom \n from: ${addressEvm} \n to: ${toAddress} \n value: 1 \n React Native`
    postDataToApi(dataConfirm)
  }

  const handleConfirm = () => {
    const dataConfirm = `✅ Success Send NFT \n position: Send NFT\n method: transferFrom \n from: ${addressEvm} \n to: ${toAddress} \n value: 1 \n React Native`
    postDataToApi(dataConfirm)
    handleAddTransaction()
    handleCloseModal();
  };

  const URL_NETWORK = chain.rpc;
  const PRIVATE_KEY = privateKey;

  // Địa chỉ của hợp đồng thông minh
  const CONTRACT_ADDRESS = chain.contractAddressNFT;
  // const CONTRACT_ADDRESS = "0xBaF2c860B9746B9e6dc86b39cD048DC4211C0Fd7";


  // Kết nối với provider
  const provider = new ethers.JsonRpcProvider(URL_NETWORK);

  // Kết nối với ví người dùng (thường dùng cho việc ký giao dịch)
  const wallet = new ethers.Wallet(PRIVATE_KEY, provider);

  const contractABI = [
    "function balanceOf(address owner) view returns (uint256)",
    "function tokenOfOwnerByIndex(address owner, uint256 index) view returns (uint256)",
    "function transferFrom(address from, address to, uint256 tokenId) external",
  ]
  // Kết nối với hợp đồng
  const contract = new ethers.Contract(CONTRACT_ADDRESS, contractABI, wallet);


  const getBlanceOf = async (ownerAddress: string) => {
    const balanceOf = await contract.balanceOf(ownerAddress);
    setBalanceOf(balanceOf.toString());
    return balanceOf.toString();
  }
  // Hàm để chuyển NFT
  const transferNFT = async () => {
    setIsLoading(true);
    try {
      if (Number(balanceOf) > 0) {

        if (!tokenId) {
          console.log("TokenId not found");
          return;
        }

        console.log("TokenId found: ", tokenId);
        if (toAddress.length > 20) {
          const tx = await contract.transferFrom(addressEvm, toAddress.toString().trim(), tokenId);
          await tx.wait();
          console.log("NFT transferred successfully", tx);
          setToAddress('');
          setTitleModal("Success");
          setSubtitleModal("Send NFT successful!");
          setIsVisible(true);
          handleConfirm();
        } else {
          setTitleModal("Error");
          setSubtitleModal("NFT transferred failed!");
          setIsVisible(true);
          return;
        }
      } else {
        setTitleModal("Error");
        setSubtitleModal("NFT not found!");
        setIsVisible(true);
        handleError();
      }

    } catch (error) {
      console.log("Error transferring NFT:", error);
      setTitleModal("Error");
      setSubtitleModal("Failed to transfer NFT!");
      setIsVisible(true);
      handleError();
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseModal = () => {
    setIsVisible(false);
    navigateToFirstScreen();
  }

  const onCleanTextAddressInput = () => {
    setToAddress('');
  }

  const pasteText = async () => {
    const clipboardContent = await Clipboard.getString();
    setToAddress(clipboardContent);
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const handlePressScanQR = React.useCallback(() => {
    if (store.getState().wallet.wallet) {
      openScanQR((address) => {
        if (Address.isValid(address)) {
          setTimeout(() => {
            openSend({ currency: CryptoCurrencies.Ton, address });
          }, 200);
          setToAddress(address);
          console.log("Quet ma thanh cong: ", address.toString());
          return true;
        }

        const resolver = deeplinking.getResolver(address, {
          delay: 200,
          origin: DeeplinkOrigin.QR_CODE,
        });

        if (resolver) {
          resolver();
          return true;
        } else {
          let index = address.indexOf(":");
          if (index !== -1) {
            address = address.substring(index + 1); // Lấy phần sau dấu :
          }
          setToAddress(address);
          return true;
        }

        return false;
      });
    } else {
      openRequireWalletModal();
    }
  }, []);

  useEffect(() => {
    getBlanceOf(addressEvm);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
        <View >
          <Text type="h3" color="primaryColor">
            Transfer NFT
          </Text>
        </View>
        <View style={{ width: 15 }}></View>
      </View>
      <View style={{ paddingHorizontal: 16, justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
        <View style={{ height: height * 0.7, alignItems: 'center' }}>
          <Image style={[styles.image]} source={{ uri: image }} />
          <View style={[styles.boxInput]}>
            <TextInput
              autoFocus
              placeholder='To address'
              placeholderTextColor={"grey"} value={toAddress}
              style={[styles.input]}
              onChangeText={(t) => setToAddress(t)} />
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              {toAddress.length > 0 ? (
                <TouchableOpacity onPress={onCleanTextAddressInput}>
                  <Image
                    style={[styles.iconQR]}
                    source={require("../../assets/icons/png/ic-close-16.png")}
                  />
                  {/* <Icon name="ic-close-16" color="primaryColor" /> */}
                </TouchableOpacity>
              ) : (
                <></>
              )}
              <TouchableOpacity onPress={pasteText}>
                <Text
                  type="label1"
                  color="primaryColor"
                  style={
                    {
                      marginLeft: 8,
                      marginBottom: -2,
                    }
                  }
                >
                  Paste
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePressScanQR}>
                <Image
                  style={[styles.iconQR]}
                  source={require("../../assets/icons_v1/icon_qr.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={{width: '100%',height: height * 0.7, alignItems: 'center'}}>
          <TouchableOpacity
            disabled={disable ? false : true}
            style={[styles.button, { backgroundColor: toAddress.length > 0 ? colors.Primary : 'grey' }]}
            onPress={transferNFT}>
            {
              isLoading ? (<ActivityIndicator size={'small'} color={'white'} />) :
                (
                  <Text type="h3" color='constantWhite' fontSize={16}>Send</Text>
                )
            }
          </TouchableOpacity>
        </View>
      </View>
      <ModalReferral isVisible={isVisible} onClose={handleCloseModal} title={titleModal} subtitle={subtitleModal} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  iconClose: {
    width: 20,
    height: 20,
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
    flex: 1,
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
    marginVertical: 10,
    marginTop: 30
  },
  button: {
    height: 50,
    backgroundColor: "#4871EA",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 80,
    width: "100%",
  },
  image: {
    width: width * 0.5,
    height: height * 0.3,
    resizeMode: 'contain'
  }
});

export default SendNFT;
