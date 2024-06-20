import {
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, {useCallback} from "react";
import { colors } from "../../constants/colors";
import { useNavigation } from "@tonkeeper/router";
import { MainStackRouteNames, WalletStackRouteNames, openDAppBrowser } from "$navigation";
import { useChain, useWallet } from "@tonkeeper/shared/hooks";
import { openRequireWalletModal } from "$core/ModalContainer/RequireWallet/RequireWallet";
import { Text } from "@tonkeeper/uikit";
import { buildTransactionUrl } from "$libs/EVM/brower";

const SwapComplete = ({ route } : any) => {
  const { address, amount, assetFrom, assetTo, hash } = route.params;
  const chain = useChain()?.chain;
    const nav = useNavigation();
    const wallet = useWallet();
    const handleHome= () => {
        nav.navigate(MainStackRouteNames.Wallet);
    }
    const handlePressSwap = useCallback(() => {
        if (wallet) {
            handleHome();
          nav.openModal("Swap");
        } else {
          openRequireWalletModal();
        }
      }, [nav, wallet]);
  return (
    <View style={[styles.container]}>
      <View style={{ alignItems: "center" }}>
        <Image
          style={[styles.logo]}
          source={require("../../assets/logo/logo_app.png")}
        />
      </View>
      <Text type="h2" color="textBlack" textAlign="center" style={{ marginTop: 20}}>Swap has been completed!</Text>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text type="body1" color="textGrayLight" textAlign="center" style={{ width: 250, marginTop: 20,}}>
          You just swapped{" "}
          <Text type="label1" color="primaryColor">
            {amount} {assetFrom}
          </Text>{" "}
          to get{" "}
          <Text type="label1" color="primaryColor">
            {amount} {assetTo}
          </Text>{" "}
          successfully
        </Text>
      </View>

      <View style={[styles.box]}>
        <Text type="body1" color="textGray">
          Check your transaction when scanning with encrypted transaction as:{" "} 
          <Text type="body1" color="primaryColor" style={{textDecorationLine: "underline", fontStyle: "italic"}} 
          onPress={() =>
            openDAppBrowser(
              buildTransactionUrl(hash, chain.chainId)
            )
          }> 
            {hash}
          </Text>
        </Text>
      </View>
      <TouchableOpacity style={[styles.button]} onPress={handlePressSwap}>
        <Text type="label1">Swap again</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.buttonOutline]} onPress={handleHome}>
        <Text type="label1" color="primaryColor">
          Continue to home
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SwapComplete;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
    marginTop: 40,
  },
  box: {
    width: "100%",
    backgroundColor: "#eeeeee",
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: colors.Primary,
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonOutline: {
    width: "100%",
    height: 50,
    backgroundColor: "#eeeeee",
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    marginBottom: 60,
    justifyContent: "center",
    alignItems: "center",
  },
});
