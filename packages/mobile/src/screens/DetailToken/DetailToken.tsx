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
import { useNavigation } from "@tonkeeper/router";
import { colors } from "../../constants/colors";
import { openRequireWalletModal } from "$core/ModalContainer/RequireWallet/RequireWallet";
import { trackEvent } from "$utils/stats";
import { Events, SendAnalyticsFrom } from "$store/models";
import { useFlags } from "$utils/flags";
import { t } from "@tonkeeper/shared/i18n";
import { useChain, useEvm, useWallet } from "@tonkeeper/shared/hooks";
import { WalletStackRouteNames, openDAppBrowser } from "$navigation";
import { buildTransactionUrl } from "$libs/EVM/brower";


const DetailToken = ({ route }: any) => {
  const { id, symbol, image, address, addressToken, rpc } = route.params;
  const navigation = useNavigation();
  const chain = useChain()?.chain;
  const evm = useEvm()?.evm;
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
    navigation.navigate(WalletStackRouteNames.SendToken);
  }
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

        <Text style={styles.price}>0,01 MATIC</Text>
        <Text style={styles.priceDolla}>= 0.0016 $</Text>
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
