import { IconButton, IconButtonList } from "@tonkeeper/uikit";

import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import { globalStyles } from "$styles/globalStyles";
import { useFocusEffect, useNavigation } from "@tonkeeper/router";
import { colors } from "../../constants/colors";
import { openRequireWalletModal } from "$core/ModalContainer/RequireWallet/RequireWallet";
import { trackEvent } from "$utils/stats";
import { Events, SendAnalyticsFrom } from "$store/models";
import { useFlags } from "$utils/flags";
import { t } from "@tonkeeper/shared/i18n";
import { useChain, useEvm, useWallet } from "@tonkeeper/shared/hooks";
import { fetchBalaceEvm, formatCurrencyNoCrc } from "$libs/EVM/useBalanceEVM";
import { WalletStackRouteNames, openDAppBrowser } from "$navigation";
import { getBalanceToken } from "$libs/EVM/token/tokenEVM";
import SaveListCoinRate from "$libs/EVM/api/get_exchange_rate";
const DetailToken = ({ route }: any) => {
  const { id, symbol, image, address, addressToken, rpc } = route.params;
  const [price, setPrice] = useState("0");
  const [priceUsd, setPriceUsd] = useState(0);
  const navigation = useNavigation();
  const chain = useChain()?.chain;
  const evm = useEvm()?.evm;
  const addressEvm = evm.addressWallet;
  const handleBack = () => {
    navigation.goBack();
  };
  const flags = useFlags(["disable_swap"]);
  const wallet = useWallet();
  const isWatchOnly = wallet && wallet.isWatchOnly;
  const handlePressSwap = useCallback(() => {
    if (wallet) {
      navigation.openModal("Swap");
    } else {
      openRequireWalletModal();
    }
  }, [navigation, wallet]);

  const handlePressBuy = useCallback(() => {
    if (wallet) {
      navigation.openModal("Exchange");
    } else {
      openRequireWalletModal();
    }
  }, [navigation, wallet]);

  const handlePressSend = () => {
     navigation.navigate(WalletStackRouteNames.SendToken, { 
      id: id, symbol: symbol,
      image: image,
      address: address,
      addressToken: addressToken,
      rpc: rpc,
      price: price,
      });
  };
  //   const handlePressSend = useCallback(async () => {
  //     if (wallet) {
  //       trackEvent(Events.SendOpen, { from: SendAnalyticsFrom.WalletScreen });
  //       navigation.go("Send", { from: SendAnalyticsFrom.WalletScreen });
  //     } else {
  //       openRequireWalletModal();
  //     }
  //   }, [navigation, wallet]);

  const handlePressRecevie = useCallback(() => {
    if (wallet) {
      navigation.go("ReceiveModal");
    } else {
      openRequireWalletModal();
    }
  }, [navigation, wallet]);

   async function fetchBalance() {
    if (addressToken != "coin") {
      const balance = await getBalanceToken(rpc, addressToken, address);
      const coinRate = await SaveListCoinRate.getCoinRateById(id ?? '');
      const rateUsd = coinRate?.usd ?? "0";
      const coinUsd24 = coinRate?.usdChange ?? "0";
      const balanceUsd = parseFloat(rateUsd) * parseFloat(balance);
      setPrice(balance);
      setPriceUsd(balanceUsd);
    } else if (addressToken == "coin") {
      const balance = await fetchBalaceEvm(address, rpc);
      const coinRate = await SaveListCoinRate.getCoinRateById(id ?? '');
      const rateUsd = coinRate?.usd ?? "0";
      const coinUsd24 = coinRate?.usdChange ?? "0";
      const balanceUsd = parseFloat(rateUsd) * parseFloat(balance);
      setPrice(balance);
      setPriceUsd(balanceUsd);
    }
  };
   useEffect(() => {
    fetchBalance();
    console.log('dau cho'+addressToken);
  }, []);

  const buildTransactionUrl = (address: string, blockchainType: string): string => {
    switch (blockchainType) {
      case '1':
        return `https://etherscan.io/address/${address}`;
      case '324':
        return `https://explorer.zksync.io/address/${address}`;
      case '56':
        return `https://bscscan.com/address/${address}`;
      case '1116':
        return `https://scan.coredao.org/address/${address}`;
      case '97':
        return `https://polygonscan.com/address/${address}`;
      case '10':
        return `https://optimistic.etherscan.io/address/${address}`;
      case '137':
        return `https://polygonscan.com/address/${address}`;
      // case '1000':
      //   return `https://tronscan.org/#/address/${AppDataGlobal.ADDRESS_TRON}`;
      // case '1100':
      //   return `https://tonscan.org/address/${AppDataGlobal.ADDRESS_TON}`;
      case '43114':
        return `https://avascan.info/blockchain/dfk/address/${address}/transactions`;
      case '42161':
        return `https://arbiscan.io/address/${address}`;
      case '250':
        return `https://ftmscan.com/address/${address}`;
      case '1088':
        return `https://explorer.metis.io/address/${address}`;
      case '42220':
        return `https://celoscan.io/address/${address}`;
      case '25':
        return `https://cronoscan.com/address/${address}`;
      default:
        throw new Error('Invalid blockchain type');
    }
  };

  return (
    <SafeAreaView>
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
        <Text style={[globalStyles.textHeader, {marginLeft: -45}]}>{chain.name}</Text>
        </View>
      </View>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        {image ? (
          <Image style={styles.image} source={{ uri: image }} />
        ) : (
          <View
            style={{
              width: 80,
              height: 80,
              borderRadius: 40,
              backgroundColor: colors.Primary,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 40,
                color: colors.White,
                fontWeight: "bold",
              }}
            >
              {symbol.charAt(0)}
            </Text>
          </View>
        )}

        <Text style={styles.price}>
        {formatCurrencyNoCrc(parseFloat(price))} {symbol}
        </Text>
        <Text style={styles.priceDolla}>{formatCurrencyNoCrc(priceUsd)} $</Text>
      </View>
      <View style={{ marginTop: 10 }}>
        <IconButtonList style={{ height: 100 }}>
          {!isWatchOnly ? (
            <IconButton
              onPress={
                handlePressSend
                // async ()=>{
                //  let coinRates = await getTokenCST();
                //  console.log(coinRates);
                // }
              }
              iconName="ic-arrow-up-28"
              title={t("wallet.send_btn")}
            />
          ) : null}
          <IconButton
            onPress={handlePressRecevie}
            iconName="ic-arrow-down-28"
            title={t("wallet.receive_btn")}
          />
          {!isWatchOnly ? (
            <IconButton
              onPress={handlePressBuy}
              iconName="ic-usd-28"
              title={t("wallet.buy_btn")}
            />
          ) : null}
          {!flags.disable_swap && !isWatchOnly && (
            <IconButton
              onPress={handlePressSwap}
              iconName="ic-swap-horizontal-28"
              title={t("wallet.swap_btn")}
            />
          )}
        </IconButtonList>
      </View>
      <View style={{ height: 6, backgroundColor: "#EEEEEE" }}></View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginTop: 20,
        }}
      >
        <Text style={styles.caption}>Can't find your transaction? </Text>
        <TouchableOpacity onPress={() => openDAppBrowser(buildTransactionUrl(evm.addressWallet, chain.chainId))}>
          <Text style={styles.textCheckExplorer}>Check explorer</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DetailToken;

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
});
