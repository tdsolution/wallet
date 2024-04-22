import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ToastAndroid,
  Platform,
} from "react-native";
import React, { useState, useEffect } from "react";
import { colors } from "../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import InputItem from "./Item/InputItem";
import { ScrollView } from "react-native-gesture-handler";
import { navigation } from "@tonkeeper/router";
import { JsonRpcProvider, formatUnits, Contract } from "ethers";
import { abi } from "./Item/Data";
import { Alert } from "react-native";
import { useNavigation } from "@tonkeeper/router";
import { useChain } from "@tonkeeper/shared/hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SaveListToken from "$libs/EVM/HistoryEVM/SaveToken";
import { ListTokenModel } from "$libs/EVM/HistoryEVM/SaveToken";
import { getTokenListByChainID } from "$libs/EVM/token/tokenEVM";

const ImportToken = () => {
  const nav = useNavigation();
  const chain = useChain()?.chain;
  const [tokenInfo, setTokenInfo] = useState({
    chainId: "",
    tokenAddress: "",
    symbol: "",
    decimals: 0,
  });
  const [symbol, setSymbol] = useState("");
  const [decimals, setDecimals] = useState("");
  const [tokenAddress, setTokenAddress] = useState("");
  const [result, setResult] = useState(false);
  const disabled = () => {
    if (
      result &&
      tokenAddress.length >= 40 &&
      symbol.length != 0 &&
      decimals.length != 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  let timeOut: ReturnType<typeof setTimeout> | null = null; // Khai báo kiểu dữ liệu của timeOut

  const handleInputChange = (value: string) => {
    setTokenAddress(value);

    // Nếu đã có một timeout đang chạy, hủy nó
    if (timeOut) {
      clearTimeout(timeOut);
    }

    // Thiết lập một timeout mới, gọi hàm countDownSearch sau 3 giây
    if (value.length >= 40) {
      timeOut = setTimeout(() => {
        handleDataEntered(value);
      }, 500);
    }
  };

  const onClearTokenAddress = () => {
    setTokenAddress("");
    setSymbol("");
    setDecimals("");
  };

  const handleDataEntered = async (tokenAddress: string) => {
    try {
      const provider = new JsonRpcProvider(chain.rpc);
      // const tokenContractAddress = '0x0221144D770De4ca55D0a9B7306cA8BF7FB8B805'; // Thay YOUR_TOKEN_CONTRACT_ADDRESS bằng địa chỉ smart contract của token
      const tokenContract = new Contract(tokenAddress.trim(), abi, provider);
      // Gọi hàm symbol() từ smart contract để lấy symbol
      const symbol = await tokenContract.symbol();
      // Gọi hàm decimals() từ smart contract để lấy số lượng số thập phân (decimals)
      const decimals = await tokenContract.decimals();
      let result = {
        chainId: chain.chainId,
        tokenAddress: tokenAddress.trim(),
        symbol: symbol,
        decimals: Number(decimals.toString()),
      };
      setTokenInfo(result);
      setSymbol(symbol);
      setDecimals(decimals.toString());
      setTokenAddress(tokenAddress.trim());
      setResult(true);
    } catch (error) {
      console.log("Error fetching token info:", error);
      setResult(false);
    }
  };
  useEffect(() => {
    // handleDataEntered("0x0221144D770De4ca55D0a9B7306cA8BF7FB8B805");
  }, []);

  const checkDuplicateTokenAddress = (tokenAddress: string) => {
    const tokenList = getTokenListByChainID(tokenInfo.chainId);
    let isDuplicate = false;
    tokenList.forEach((token: any) => {
      if (token.tokenAddress === tokenAddress) {
        isDuplicate = true;
      }
    });
    return isDuplicate;
  };

  const handleAddToken = async () => {
    try {
      if (checkDuplicateTokenAddress(tokenAddress)) {
        Alert.alert("Token already exists!");
      } else {
        await SaveListToken.fullFlowSaveData(tokenInfo);
        onClearTokenAddress();
        console.log("Token added successfully!");
        if (Platform.OS === "android") {
          ToastAndroid.show("Token added successfully!", ToastAndroid.SHORT);
        } else {
          Alert.alert("Import token successfully!");
        }
      }
      // console.log("Data", result);
    } catch (error) {
      console.error("Error adding token:", error);
    }
  };
  const handleGetToken = async () => {
    try {
      const result = await SaveListToken.getData();
      console.log("Token get successfully!: ", result);
      // console.log("Token get successfully!: ",JSON.stringify(result[0].token[2]));
    } catch (error) {
      console.error("Error get token:", error);
    }
  };
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
          onPress={() => navigation.goBack()}
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
              <TouchableOpacity
                onPress={() => {
                  nav.openModal("/select-network");
                }}
                activeOpacity={0.6}
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: colors.Primary,
                  borderRadius: 8,
                  overflow: "hidden",
                  paddingHorizontal: 20,
                  paddingVertical: 15,
                  marginTop: 10,
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={{ uri: chain.logo }}
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      resizeMode: "contain",
                    }}
                  />
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: colors.Black,
                      fontFamily: "Poppins-Bold",
                      marginLeft: 10,
                    }}
                  >
                    {chain.name}
                  </Text>
                </View>

                <Image
                  source={require("../../assets/icons/png/ic-dropdown-12.png")}
                  style={{
                    tintColor: colors.Primary,
                    width: 20,
                    height: 20,
                    resizeMode: "contain",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              height: 5,
              backgroundColor: colors.Gray_Light,
              marginVertical: 20,
              opacity: 0.5,
            }}
          ></View>
          <View style={{ paddingHorizontal: 25, gap: 20 }}>
            <View>
              <Text style={styles.lable}>Token Address</Text>
              <View>
                <TextInput
                  style={styles.input}
                  placeholder={"0x..."}
                  placeholderTextColor={colors.Gray_Light}
                  value={tokenAddress}
                  onChangeText={handleInputChange}
                />
                {tokenAddress.length > 0 ? (
                  <TouchableOpacity
                    style={styles.buttonIcon}
                    onPress={onClearTokenAddress}
                  >
                    <Image
                      source={require("../../assets/icons/png/ic-close-16.png")}
                      style={[styles.iconInput, { tintColor: colors.Black }]}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
            <View>
              <Text style={styles.lable}>Symbol</Text>
              <View style={styles.boxInput}>
                <Text
                  style={[
                    styles.textBoxInput,
                    {
                      color:
                        symbol.length > 0 ? colors.Black : colors.Gray_Light,
                    },
                  ]}
                >
                  {symbol.length > 0 ? symbol : "ETH"}
                </Text>
                <TouchableOpacity style={styles.buttonIcon}>
                  <Image
                    source={require("../../assets/icons/png/ic-pencil-16.png")}
                    style={styles.iconInput}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View>
              <Text style={styles.lable}>Decimals</Text>
              <View style={styles.boxInput}>
                <Text
                  style={[
                    styles.textBoxInput,
                    {
                      color:
                        decimals.length > 0 ? colors.Black : colors.Gray_Light,
                    },
                  ]}
                >
                  {decimals.length > 0 ? decimals : "18"}
                </Text>
                <TouchableOpacity style={styles.buttonIcon}>
                  <Image
                    source={require("../../assets/icons/png/ic-pencil-16.png")}
                    style={styles.iconInput}
                  />
                </TouchableOpacity>
              </View>
            </View>
            {disabled() ? (
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.White,
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: colors.Primary,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: colors.Primary,
                      fontFamily: "Poppins-Medium",
                    }}
                  >
                    Your token is
                  </Text>
                  <Image
                    style={styles.icon}
                    source={require("../../assets/icons/png/ic-chevron-right-16.png")}
                  />
                </TouchableOpacity>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontWeight: "600",
                      color: colors.Black,
                      fontFamily: "Poppins-Bold",
                      marginRight: 10,
                    }}
                  >
                    {symbol}
                  </Text>
                  <View
                    style={{
                      width: 50,
                      height: 50,
                      borderRadius: 25,
                      backgroundColor: colors.Primary,
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 20,
                        color: colors.White,
                        fontWeight: "bold",
                      }}
                    >
                      {symbol.charAt(0)}
                    </Text>
                  </View>
                </View>
              </View>
            ) : null}

            <TouchableOpacity
              onPress={handleAddToken}
              disabled={!disabled()}
              style={[styles.button, { opacity: disabled() ? 1 : 0.1 }]}
            >
              <Text style={styles.textButton}>Import Token</Text>
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
    borderRadius: 25,
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
  input: {
    height: 57,
    backgroundColor: colors.White,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: "500",
    color: colors.Black,
    textAlign: "left",
    fontFamily: "Poppins-Light",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.Gray_Light,
    paddingRight: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  textBoxInput: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.Black,
    textAlign: "left",
    fontFamily: "Poppins-Light",
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
    borderColor: colors.Gray_Light,
    paddingRight: 50,
    justifyContent: "center",
  },
  textInput: {},
  lable: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.Black,
    lineHeight: 20,
    textAlign: "left",
    fontFamily: "Poppins-Bold",
    marginBottom: 5,
  },
  iconInput: {
    width: 20,
    height: 20,
    tintColor: colors.Gray_Light,
    resizeMode: "contain",
  },
  buttonIcon: {
    position: "absolute",
    right: 15,
    top: 20,
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: colors.Primary,
    resizeMode: "contain",
  },
});
