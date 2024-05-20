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
} from "react-native";
import { ethers, JsonRpcProvider, formatUnits } from "ethers";
import {
  swapETHForTokens,
  swapTokensForETH,
  // transferTokens,
  transferTokens2,
  transferTokens3,
} from "./swapDataToken";

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
}) => {
  function formatHexString(hexString: string) {
    const prefix = hexString.slice(0, 10); // Lấy các ký tự đầu tiên (bao gồm cả "0x" và 6 ký tự tiếp theo)
    const suffix = hexString.slice(-6); // Lấy 6 ký tự cuối cùng
    return prefix + "..." + suffix;
  }
  const nav = useNavigation();
  const [amountInEth, setAmountInEth] = useState("0.01");
  // const [transactionHash, setTransactionHash] = useState("");

  const handleConfirm = () => {
    nav.navigate("SwapComplete", {
      address: from,
      amount: amount,
      assetFrom: assetFrom,
      assetTo: assetTo,
    });
    closeModal();
  };

  // // Thay thế bằng URL của Infura hoặc URL của nhà cung cấp khác
  // const provider = new ethers.JsonRpcProvider('https://bsc-testnet.publicnode.com/');

  // // Ví dụ với Private Key (bạn cần bảo mật private key của mình)
  // const privateKey = '0xaf2c05d68a462db06595e2e1d210c68d6d9a961b2f7ad601be3f66c915608314';
  // const wallet = new ethers.Wallet(privateKey, provider);
  // const recipientAddress = '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd';
  // const amountInEth = ethers.parseEther('0.01'); // Số lượng tBNB muốn chuyển (0.1 tBNB)

  // // Khởi tạo ví từ khóa riêng tư
  // const privateKey =
  //   "0xaf2c05d68a462db06595e2e1d210c68d6d9a961b2f7ad601be3f66c915608314";
  // const provider = new ethers.JsonRpcProvider(
  //   "https://bsc-testnet.publicnode.com/"
  // );
  // const wallet = new ethers.Wallet(privateKey, provider);

  // // Địa chỉ hợp đồng thông minh token và ABI của nó
  // const tokenContractAddress = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";
  // const tokenABI = [
  //   // Định nghĩa ABI của hợp đồng token
  //   // Ví dụ: "function swapTokenForETH(uint amount) payable"
  //   "function swapTokenForETH(uint amount) payable",
  // ];

  // // Khởi tạo đối tượng hợp đồng token
  // const tokenContract = new ethers.Contract(
  //   tokenContractAddress,
  //   tokenABI,
  //   wallet
  // );

  // // Số lượng token bạn muốn đổi
  // const amountOfTokens = ethers.parseUnits("0.0000000001", 18); // Ví dụ: đổi 10 token

  // // Gọi phương thức swapTokenForETH trong hợp đồng token
  // async function swapTokenForETH() {
  //   try {
  //     const transaction = await tokenContract.swapTokenForETH(amountOfTokens, {
  //       gasPrice: ethers.parseUnits("5", "gwei"), // Giá gas, có thể cần điều chỉnh
  //       gasLimit: 100000, // Giới hạn gas, có thể cần điều chỉnh
  //     });

  //     console.log("Swap token for ETH transaction hash:", transaction.hash);

  //     // Chờ giao dịch được xác nhận
  //     const receipt = await transaction.wait();
  //     console.log("Transaction receipt:", receipt);
  //   } catch (error) {
  //     console.error("Error swapping token for ETH:", error);
  //   }
  // }

  // // URL của provider (ở đây sử dụng BSC Testnet)
  // const providerUrl = "https://bsc-testnet.publicnode.com/";
  // const provider = new ethers.JsonRpcProvider(providerUrl);

  // // Khóa riêng tư của ví
  // const privateKey =
  //   "0xaf2c05d68a462db06595e2e1d210c68d6d9a961b2f7ad601be3f66c915608314";
  // const wallet = new ethers.Wallet(privateKey, provider);

  // // Địa chỉ hợp đồng thông minh token và ABI của nó
  // const tokenContractAddress = "0xEa5007831646fa01C7079B15cFa4c62748905b04";
  // const tokenABI = [
  //   "function balanceOf(address) view return (uint)",
  //   // "function transfer(address to, uint256 value) public returns (bool)",
  //   "function transfer(address to, uint amount)"
  // ];

  // // Khởi tạo đối tượng hợp đồng token
  // const tokenContract = new ethers.Contract(
  //   tokenContractAddress,
  //   tokenABI,
  //   wallet
  // );

  // // Địa chỉ nhận token
  // const recipientAddress = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";

  // // Số lượng token muốn gửi (ví dụ: 10 token, với 18 decimal)
  // const amountToSend = ethers.parseUnits("0.01", 18); // Điều chỉnh số lượng và số decimal tùy thuộc vào token của bạn

  // async function sendToken() {
  //   try {
  //     // Gọi phương thức transfer trong hợp đồng token
  //     const transaction = await tokenContract.transfer(
  //       recipientAddress,
  //       amountToSend
  //     );
  //     console.log("Transaction sent:", transaction);

  //     // Chờ giao dịch được xác nhận
  //     const receipt = await transaction.wait();
  //     console.log("Transaction mined:", receipt);
  //   } catch (error) {
  //     console.error("Error sending token:", error);
  //   }
  // }

  // sendToken();
  // const Provider = new ethers.getDefaultProvider('https://bsc-testnet.publicnode.com/');
  // const HexPrivateKey = new Buffer.from('0xaf2c05d68a462db06595e2e1d210c68d6d9a961b2f7ad601be3f66c915608314', 'hex');
  // const Signer = new ethers.Wallet(HexPrivateKey, Provider);

  // const transfer = async () => {
  //   const providerUrl = "https://bsc-testnet.publicnode.com/";
  //   const provider = new ethers.JsonRpcProvider(providerUrl);

  //   const tokenAddress = "0xEa5007831646fa01C7079B15cFa4c62748905b04";
  //   const tokenABI = [
  //     "function balanceOf(address) view return (uint)",
  //     // "function transfer(address to, uint256 value) public returns (bool)",
  //     "function transfer(address to, uint amount)",
  //   ];
  //   const tokenContract = new ethers.Contract(tokenAddress, tokenABI, Provider);

  //   const tokenBalance = await tokenContract.balanceOf('0xEa5007831646fa01C7079B15cFa4c62748905b04');
  //   console.log("Ton Balance: " + tokenBalance.toString());
  //   console.log(
  //     "token balance in decimal: ",
  //     ethers.formatUnits(tokenBalance, 18)
  //   );
  //   const tokenSinger = tokenContract.connect(Signer);
  //   const tokenAmount = ethers.parseUnits("0.01", 18);
  //   const transaction = await tokenSinger.transfer("0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd", tokenAmount);
  //   console.log("Transaction Hash:", transaction.hash);
  // };
  // transfer();

  // Hàm swap token sang ETH
  // const swapTokensForETH = async ({
  //   providerUrl,
  //   privateKey,
  //   contractAddress,
  //   amountInTokens,
  //   minETH,
  // }) => {
  //   try {
  //     // Kết nối với mạng Ethereum thông qua URL của provider
  //     const provider = new ethers.JsonRpcProvider(providerUrl);
  //     console.log(">>>>>>>>Provider:", provider);
  //     // Khởi tạo ví từ khóa riêng
  //     const wallet = new ethers.Wallet(privateKey, provider);
  //     console.log(">>>>>>>>Wallet:", wallet);

  //     // ABI của hợp đồng thông minh
  //     const contractABI = [
  //       "function swapTokensForETH(uint256 amountInTokens, uint256 minETH) public returns (uint256)",
  //     ];

  //     // Khởi tạo đối tượng hợp đồng
  //     const contract = new ethers.Contract(
  //       contractAddress,
  //       contractABI,
  //       wallet
  //     );
  //     console.log(">>>>>>>>Contract:", contract);

  //     // Chuyển đổi số lượng token từ dạng thập phân sang Wei
  //     const amountInTokensWei = ethers.parseUnits(amountInTokens, 18);
  //     console.log(">>>>>>>>amountInTokensWei:", amountInTokensWei);

  //     const minETHWei = ethers.parseEther(minETH);
  //     console.log(">>>>>>>>minETHWei:", minETHWei);

  //     // Gọi hàm swapTokensForETH trong hợp đồng thông minh
  //     const transaction = await contract.swapTokensForETH(
  //       amountInTokensWei,
  //       minETHWei,
  //       {
  //         gasLimit: 200000, // Giới hạn gas (có thể cần điều chỉnh)
  //         gasPrice: ethers.parseUnits("10", "gwei"), // Điều chỉnh giá gas nếu cần
  //       }
  //     );
  //     console.log("Transaction sent:", transaction);

  //     // Chờ giao dịch được xác nhận
  //     const receipt = await transaction.wait();
  //     console.log("Transaction mined:", receipt);
  //   } catch (error) {
  //     console.error("Error during token swap:", error);
  //   }
  // };

  // // Sử dụng hàm swapTokensForETH
  // const swapParams = {
  //   providerUrl: "https://bsc-testnet.publicnode.com/",
  //   privateKey:
  //     "0xaf2c05d68a462db06595e2e1d210c68d6d9a961b2f7ad601be3f66c915608314",
  //   contractAddress: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd", // Địa chỉ của hợp đồng token của bạn
  //   amountInTokens: "0.01", // Số lượng token bạn muốn chuyển đổi
  //   minETH: "2", // Số lượng ETH tối thiểu bạn muốn nhận
  // };

  const yourFunction = async () => {
    // Tham số cho phương thức swapETHForTokens
    const swapParams = {
      providerUrl: "https://bsc-testnet.publicnode.com/",
      privateKey:
        "0xaf2c05d68a462db06595e2e1d210c68d6d9a961b2f7ad601be3f66c915608314",
      contractAddress: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
      amountInETH: "0.01",
      minTokens: "10",
    };

    // Gọi phương thức swapETHForTokens từ module hiện tại
    await swapETHForTokens(swapParams);
  };

  // const [transactionHash, setTransactionHash] = useState("");
  // const [error, setError] = useState("");

  // const sendEthToTokenContract = async () => {
  //   const provider = new ethers.JsonRpcProvider(
  //     "https://bsc-testnet.publicnode.com/"
  //   );
  //   const signer = new ethers.Wallet(
  //     "0xaf2c05d68a462db06595e2e1d210c68d6d9a961b2f7ad601be3f66c915608314",
  //     provider
  //   );

  //   const tx = await signer.sendTransaction({
  //     to: "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd",
  //     value: ethers.parseUnits("0.01", "ether"),
  //   });
  //   console.log(tx);
  // };

  // const swapBNBToWBNB = async () => {
  //   try {
  //     // Khởi tạo một nhà cung cấp
  //     const provider = new ethers.JsonRpcProvider(
  //       "https://bsc-testnet.publicnode.com/"
  //     );

  //     // Lấy thông tin người ký từ nhà cung cấp
  //     const signer = await provider.getSigner();

  //     // ABI của hợp đồng ERC-20
  //     const abi = ["function transfer(address to, uint256 amount)"];

  //     // Khởi tạo đối tượng hợp đồng từ địa chỉ và ABI
  //     const contractAddress = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd"; // Địa chỉ của hợp đồng token
  //     const contract = new ethers.Contract(contractAddress, abi, signer);

  //     // Chuyển đổi số lượng token từ dạng thập phân sang Wei
  //     const amount = ethers.parseUnits("0.01", 18);

  //     // Gọi hàm transfer để chuyển token
  //     const tx = await contract.transfer(
  //       "0xEa5007831646fa01C7079B15cFa4c62748905b04", // Địa chỉ nhận token
  //       amount
  //     );

  //     console.log("Transaction sent:", tx.hash);

  //     // Chờ giao dịch được xác nhận
  //     const receipt = await tx.wait();
  //     console.log("Transaction receipt:", receipt);
  //   } catch (error) {
  //     console.error("Error during token transfer:", error);
  //   }
  // };

  // const test = async () => {
  //   try {
  //     const providerUrl = "https://bsc-testnet.publicnode.com/";
  //     const provider = new ethers.JsonRpcProvider(providerUrl);

  //     const tokenAddress = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";
  //     const abi = [
  //       "function decimals() view returns (uint8)",
  //       "function symbol() view returns (string)",
  //       "function balanceOf(address) view returns (uint256)",
  //     ];

  //     const tokenContract = new ethers.Contract(tokenAddress, abi, provider);

  //     // Lấy thông tin symbol của token
  //     const sym = await tokenContract.symbol();

  //     // Lấy số thập phân mà token sử dụng
  //     const decimals = await tokenContract.decimals();

  //     // Đọc số dư token của một tài khoản
  //     const balance = await tokenContract.balanceOf(
  //       "0xEa5007831646fa01C7079B15cFa4c62748905b04"
  //     );

  //     // Chuyển đổi số dư từ Wei sang định dạng dễ đọc
  //     const balanceFm = ethers.formatUnits(balance, decimals);
  //     const balanceGet = await provider.getBalance(
  //       "0xEa5007831646fa01C7079B15cFa4c62748905b04"
  //     );
  //     const balanceGetRM = ethers.formatEther(balanceGet);

  //     console.log("Balance: " + balance.toString());
  //     console.log("Balance FM: " + balanceFm);
  //     console.log("Balance Get: " + balanceGet);
  //     console.log("balanceGetRM: " + balanceGetRM);
  //     console.log("Symbol: " + sym);
  //     console.log("Decimals: " + decimals);
  //     console.log("Token Contract: ", tokenContract);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };

  // const test = async () => {
  //   try {
  //     const providerUrl = "https://bsc-testnet.publicnode.com/";
  //     const provider = new ethers.JsonRpcProvider(providerUrl);

  //     const senderAddress = "0xEa5007831646fa01C7079B15cFa4c62748905b04";
  //     const recipientAddress = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";
  //     const privateKey = '0xaf2c05d68a462db06595e2e1d210c68d6d9a961b2f7ad601be3f66c915608314'; // Replace with the private key of the sender address

  //     const wallet = new ethers.Wallet(privateKey, provider);

  //     // Get the balance of the sender address
  //     const balanceGet = await provider.getBalance(senderAddress);
  //     console.log("Sender Balance (wei): " + balanceGet.toString());
  //     console.log("Sender Balance (BNB): " + ethers.formatEther(balanceGet));

  //     // Amount to send (0.01 BNB)
  //     const amountToSend = ethers.parseUnits("0.01", "ether");

  //     // Ensure the sender has enough balance
  //     // if (balanceGet.lt(amountToSend)) {
  //     //   throw new Error("Insufficient balance");
  //     // }

  //     // Create the transaction
  //     const tx = {
  //       to: recipientAddress,
  //       value: amountToSend,
  //       gasPrice: await provider.getGasPrice(),
  //       gasLimit: ethers.hexlify(21000), // Gas limit for a standard transfer
  //     };

  //     // Send the transaction
  //     const transactionResponse = await wallet.sendTransaction(tx);
  //     console.log("Transaction sent: ", transactionResponse);

  //     // Wait for the transaction to be mined
  //     const receipt = await transactionResponse.wait();
  //     console.log("Transaction mined: ", receipt);
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
  // };
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
          <TouchableOpacity style={[styles.button]} onPress={yourFunction}>
            <Text style={styles.textButton}>Confirm</Text>
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
