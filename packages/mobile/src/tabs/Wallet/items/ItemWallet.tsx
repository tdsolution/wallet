import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  DeviceEventEmitter,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { colors } from "../../../constants/colors";
import { getBalanceToken } from "$libs/EVM/token/tokenEVM";
import { fetchBalaceEvm, formatCurrencyNoCrc } from "$libs/EVM/useBalanceEVM";
import SaveListCoinRate from "$libs/EVM/api/get_exchange_rate";
import { useNavigation } from "@tonkeeper/router";
import { WalletStackRouteNames } from "$navigation";

interface Props {
  id?: string;
  symbol: string;
  image?: string;
  address: string;
  addressToken: string;
  rpc: string;
}

const ItemWallet = (props: Props) => {
  const { id, symbol, image, address, addressToken, rpc } = props;
  const [price, setPrice] = useState("0");
  const [priceUsd, setPriceUsd] = useState(0);
  const [coinUsd, setCoinUsd] = useState(0);
  const [coinUsd24, setCoinUsd24] = useState(0);
  const [isCheckLevel, setIsCheckLevel] = useState(false);
  const navigation = useNavigation()
  const handlePress = useCallback(async () => {
    console.log(price);
    navigation.navigate(WalletStackRouteNames.DetailToken, { id: id, symbol: symbol, image: image, address: address, addressToken: address, rpc: rpc, price: price, priceUsd: priceUsd});
  }, []);
  const logo =
    "https://app.plearnclub.com/images/tokens/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c.png";
  async function fetchBalance() {
    if (addressToken != "coin") {
      const balance = await getBalanceToken(rpc, addressToken, address);
      const coinRate = await SaveListCoinRate.getCoinRateById(id ?? '');
      const rateUsd = coinRate?.usd ?? "0";
      const coinUsd24 = coinRate?.usdChange ?? "0";
      const checkLevel = parseFloat(coinUsd24);
      setIsCheckLevel(checkLevel >= 0 ? true : false);
      const balanceUsd = parseFloat(rateUsd) * parseFloat(balance);
      setPrice(balance);
      setPriceUsd(balanceUsd);
      setCoinUsd24(parseFloat(coinUsd24));
      setCoinUsd(parseFloat(rateUsd));
    } else if (addressToken == "coin") {
      const balance = await fetchBalaceEvm(address, rpc);
      const coinRate = await SaveListCoinRate.getCoinRateById(id ?? '');
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
  useEffect(() => {
    fetchBalance();
  }, [address]);
  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={styles.bgLogo}>
            {image ? (
              <Image style={styles.logo} source={{ uri: image }} />
            ) : (
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 20,
                  backgroundColor: colors.Primary,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontSize: 18,
                    color: colors.White,
                    fontWeight: "bold",
                  }}
                >
                  {symbol.charAt(0)}
                </Text>
              </View>
            )}
          </View>
          <View>
            <Text style={styles.title}>{symbol}</Text>
            <View style={styles.row}>
              <Text style={styles.body}>
                {"$" + formatCurrencyNoCrc(coinUsd)}
              </Text>
              <View
                style={{
                  width: 4,
                  height: 4,
                  backgroundColor: "#D9D9D9",
                  borderRadius: 20,
                  marginLeft: 2,
                }}
              ></View>
              <Text
                style={[
                  styles.body,
                  {
                    marginLeft: 8,
                    color: isCheckLevel ? colors.Green : colors.Red,
                  },
                ]}
              >
                {coinUsd24}%
              </Text>
            </View>
          </View>
        </View>
        <View>
          <Text style={[styles.title, { textAlign: "right" }]}>
            {formatCurrencyNoCrc(parseFloat(price))}
          </Text>
          <Text style={[styles.body, { textAlign: "right" }]}>
            ${formatCurrencyNoCrc(priceUsd)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ItemWallet;

const styles = StyleSheet.create({
  bgLogo: {
    borderRadius: 25,
    backgroundColor: "#ffffff",
    alignItems: "center",
    marginRight: 12,
  },
  logo: {
    width: 36,
    height: 36,
    borderRadius: 24,
    resizeMode: "contain",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "left",
    color: colors.Primary,
    lineHeight: 20,
  },
  body: {
    fontSize: 13,
    fontWeight: "400",
    textAlign: "left",
    color: "#B6B6B6",
    fontFamily: "Poppins-Light",
    lineHeight: 20,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 25,
    marginBottom: 32,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
