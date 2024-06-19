import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Platform,
  Pressable,
  Keyboard,
} from "react-native";
import React, { useEffect, useState } from "react";
import HeaderBar from "../../components/HeaderBar";
import { colors } from "../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import { useChain, useEvm } from "@tonkeeper/shared/hooks";
import { useSwapCoin } from "@tonkeeper/shared/hooks/useSwapCoin";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { FontWeights } from "@tonkeeper/uikit/src/components/Text/TextStyles";
import { useFocusEffect, useNavigation } from "@tonkeeper/router";
import ModalSwap from "./ModalSwap";
import ModalCoinDes from "./ModalCoinDes";
import ModalCoinOrg from "./ModalCoinOrg";
import { dataCoinOrg } from "./dataSwap/dataCoinOrg";
import { dataCoinDes } from "./dataSwap/dataCoinDes";
import { getTokenListByChainID } from "$libs/EVM/token/tokenEVM";
import { getBalanceToken } from "$libs/EVM/token/tokenEVM";
import SaveListCoinRate from "$libs/EVM/api/get_exchange_rate";
import { fetchBalaceEvm } from "$libs/EVM/useBalanceEVM";
import { ethers } from "ethers";
import { Text } from "@tonkeeper/uikit";

const SwapScreen = () => {
  const chain = useChain()?.chain;
  const evm = useEvm()?.evm;
  const addressEvm = evm.addressWallet;
  const swapCoin = useSwapCoin()?.swapCoin;
  const nav = useNavigation();
  const [selectedItemIndex, setSelectedItemIndex] = useState(null);
  const tokensEVM = getTokenListByChainID(chain.chainId);

  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalVisibleCoinDes, setModalVisibleCoinDes] =
    useState<boolean>(false);
  const [modalVisibleCoinOrg, setModalVisibleCoinOrg] =
    useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [dataCoinDesIndex, setDataCoinDesIndex] = useState<any[]>(dataCoinDes);
  const [dataCoinOrgIndex, setDataCoinOrgIndex] = useState<any[]>(dataCoinOrg);
  const [isChangeCoinDes, setIsChangeCoinDes] = useState<boolean>(true);
  const [isDisable, setIsDisable] = useState<boolean>(true);
  const checkValue = () => {
    if (inputValue !== "" && !isNaN(Number(inputValue))) {
      setIsDisable(false);
    } else if (inputValue !== "" && isNaN(Number(inputValue))) {
      setInputValue("");
      setIsDisable(true);
    }
    else if (inputValue == "") {
      setIsDisable(true);
    }
  };
  
  const [price, setPrice] = useState("0");
  const [priceUsd, setPriceUsd] = useState(0);
  const [coinUsd, setCoinUsd] = useState(0);
  const [coinUsd24, setCoinUsd24] = useState(0);
  const [isCheckLevel, setIsCheckLevel] = useState(false);
  let coin = coinUsd * parseFloat(inputValue);
  // Lấy phần tử từ mảng thứ nhất
  const itemFromData1 = dataCoinDesIndex[swapCoin];
  console.log('itemFromData1:', itemFromData1)
  // Lấy phần tử từ mảng thứ hai
  const itemFromData2 = dataCoinOrgIndex[swapCoin];

  const handleSwap = () => {
    setModalVisible(true);
  };
  const handleSwapCoin = () => {
    !isChangeCoinDes
      ? setModalVisibleCoinDes(true)
      : setModalVisibleCoinOrg(true);
  };

  const handleCoinDes = () => {
    setIsChangeCoinDes(!isChangeCoinDes);
  };

  async function fetchBalance() {
    if (tokensEVM != "coin") {
      const balance = await getBalanceToken(chain.rpc, tokensEVM, addressEvm);
      const coinRate = await SaveListCoinRate.getCoinRateById(
        itemFromData1.id ?? ""
      );
      const rateUsd = coinRate?.usd ?? "0";
      const coinUsd24 = coinRate?.usdChange ?? "0";
      const checkLevel = parseFloat(coinUsd24);
      setIsCheckLevel(checkLevel >= 0 ? true : false);
      const balanceUsd = parseFloat(rateUsd) * parseFloat(balance);
      setPrice(balance);
      setPriceUsd(balanceUsd);
      setCoinUsd24(parseFloat(coinUsd24));
      setCoinUsd(parseFloat(rateUsd));
    } else if (tokensEVM == "coin") {
      const balance = await fetchBalaceEvm(addressEvm, chain.rpc);
      const coinRate = await SaveListCoinRate.getCoinRateById(
        itemFromData1.id ?? ""
      );
      const rateUsd = coinRate?.usd ?? "0";
      const coinUsd24 = coinRate?.usdChange ?? "0";
      const checkLevel = parseFloat(coinUsd24);
      setIsCheckLevel(checkLevel >= 0 ? true : false);
      const balanceUsd = parseFloat(rateUsd) * parseFloat(balance);
      setPrice(balance);
      setPriceUsd(balanceUsd);
      setCoinUsd24(parseFloat(coinUsd24));
      setCoinUsd(parseFloat(rateUsd));
    }
  }
  useFocusEffect(
    React.useCallback(() => {
      fetchBalance();
    }, [addressEvm, swapCoin])
  );
  useEffect(() => {
    checkValue(); // Gọi hàm checkValue trong useEffect
  }, [inputValue]);

  return (
    <View style={styles.container}>
      <Pressable onPress={Keyboard.dismiss}>
      <View style={[styles.row]}>
        <TouchableOpacity onPress={() => nav.goBack()}>
          <Image
            style={styles.icon}
            source={require("../../assets/icons/png/ic-chevron-left-16.png")}
          />
        </TouchableOpacity>
        <Text type="h3" color="primaryColor">SwapScreen</Text>
        <TouchableOpacity>
          <Image
            style={styles.icon}
            source={require("../../assets/icons/png/ic-settings-28.png")}
          />
        </TouchableOpacity>
      </View>
      <View>
        <View style={[styles.box]}>
          <View style={{ width: "48%" }}>
            <Text type="label1" color="textBlack">From</Text>
            <TextInput
              style={[styles.input]}
              value={inputValue}
              onChangeText={(text) => setInputValue(text.replace(/[^0-9 .]/g, ""))}
              placeholder="0"
              placeholderTextColor={colors.Gray_Light}
              autoFocus
              cursorColor = {colors.Primary}
              
            />
            <Text type="body1" color="textGray">
              $ {inputValue.length > 0 ? coin : 0}
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleSwapCoin}
            style={{
              width: "48%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <Image
                  style={[styles.imgCurrent]}
                  source={{
                    uri: !isChangeCoinDes
                      ? itemFromData1.logo
                      : itemFromData2.logo,
                  }}
                />
                <Image
                  style={[styles.imgLogo]}
                  source={{
                    uri: !isChangeCoinDes
                      ? itemFromData1.chainImg
                      : itemFromData2.chainImg,
                  }}
                />
              </View>

              <Text type="label1" color="textBlack">
                {!isChangeCoinDes ? itemFromData1.symbol : itemFromData2.symbol}
              </Text>
            </View>
            <Image
              style={styles.icDown}
              source={require("../../assets/icons/png/ic-chevron-down-16.png")}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            width: "100%",
            height: 10,
            position: "relative",
            zIndex: 100,
          }}
        >
          <View
            style={{
              position: "absolute",
              top: -20,
              right: 0,
              left: 0,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={[styles.btnChange]}
              onPress={handleCoinDes}
            >
              <Image
                style={{
                  width: 30,
                  height: 30,
                  resizeMode: "contain",
                  tintColor: "white",
                }}
                source={require("../../assets/icons/png/ic_swap_vert.png")}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.box]}>
          <View style={{ width: "48%" }}>
            <Text type="label1" color="textBlack">To</Text>
            <Text
            type="h1"
              style={[
                styles.price,
                { color: inputValue ? colors.Primary : colors.Gray_Light },
              ]}
              numberOfLines={0}
            >
              {!inputValue ? 0 : inputValue}
            </Text>
            <Text type="body1" color="textGray">
              $ {inputValue.length > 0 ? coin : 0}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() =>
              isChangeCoinDes
                ? setModalVisibleCoinDes(true)
                : setModalVisibleCoinOrg(true)
            }
            style={{
              width: "48%",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View>
                <Image
                  style={[styles.imgCurrent]}
                  source={{
                    uri: isChangeCoinDes
                      ? itemFromData1.logo
                      : itemFromData2.logo,
                  }}
                />
                <Image
                  style={[styles.imgLogo]}
                  source={{
                    uri: isChangeCoinDes
                      ? itemFromData1.chainImg
                      : itemFromData2.chainImg,
                  }}
                />
              </View>

              <Text type="label1" color="textBlack">
                {isChangeCoinDes ? itemFromData1.symbol : itemFromData2.symbol}
              </Text>
            </View>
            <Image
              style={styles.icDown}
              source={require("../../assets/icons/png/ic-chevron-down-16.png")}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.resetButton]}>
        <Text type="label1" color="textBlack">Quote</Text>
        <Text
          type="body1" color="textBlack"
        >
          1 {!isChangeCoinDes ? itemFromData1.symbol : itemFromData2.symbol}{" "}
          {`\u2248`} 1{" "}
          {isChangeCoinDes ? itemFromData1.symbol : itemFromData2.symbol}
        </Text>
      </View>
      <TouchableOpacity
        disabled={isDisable}
        style={[
          styles.button,
          {
            backgroundColor:
              isDisable ? colors.PrimaryDisable : colors.Primary,
          },
        ]}
        onPress={handleSwap}
      >
        <Text type="label1">Swap</Text>
      </TouchableOpacity>
      </Pressable>
      <ModalSwap
        visible={modalVisible}
        closeModal={() => setModalVisible(false)}
        amount={inputValue}
        assetFrom={
          !isChangeCoinDes ? itemFromData1.symbol : itemFromData2.symbol
        }
        assetTo={isChangeCoinDes ? itemFromData1.symbol : itemFromData2.symbol}
        from={addressEvm}
        to={
          isChangeCoinDes
            ? itemFromData1.tokenAddress
            : itemFromData2.tokenAddress
        }
        network={isChangeCoinDes ? itemFromData1.name : itemFromData2.name}
        coinUsd={coin}
        isTransfer = {isChangeCoinDes}
      />
      
      <ModalCoinDes
        visible={modalVisibleCoinDes}
        closeModal={() => setModalVisibleCoinDes(false)}
        swapCoin={swapCoin}
      />
      <ModalCoinOrg
        visible={modalVisibleCoinOrg}
        closeModal={() => setModalVisibleCoinOrg(false)}
        swapCoin={swapCoin}
      />
      
    </View>
  );
};

export default SwapScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: colors.White,
    zIndex: 100,
    paddingHorizontal: 20,
  },
  icon: {
    width: 30,
    height: 30,
    tintColor: colors.Primary,
    resizeMode: "contain",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingVertical: 20,
    backgroundColor: colors.White,
  },
  imgCurrent: {
    width: 34,
    height: 34,
    resizeMode: "contain",
    borderRadius: 24,
    marginRight: 10,
  },
  box: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  icDown: {
    width: 16,
    height: 16,
    tintColor: colors.Black,
    resizeMode: "contain",
  },
  imgLogo: {
    width: 16,
    height: 16,
    borderRadius: 15,
    position: "absolute",
    top: -5,
    right: 10,
    borderWidth: 1,
    borderColor: "white",
  },
  price: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Poppins-Bold",
    color: colors.Gray,
    marginVertical: Platform.OS === "android" ? 10 : 5,
    height: Platform.OS === "android" ? 40 : 40,
    backgroundColor: "white",
  },
  btnChange: {
    width: 50,
    height: 50,
    borderRadius: 50,
    backgroundColor: colors.Primary,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    height: 50,
    backgroundColor: colors.Primary,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  resetButton: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#eeeeee",
    marginTop: 20,
  },
  input: {
    width: "100%",
    height: Platform.OS === "android" ? 60 : 50,
    backgroundColor: "white",
    fontSize: 30,
    fontWeight: "bold",
    color: colors.Primary,
  },
});
