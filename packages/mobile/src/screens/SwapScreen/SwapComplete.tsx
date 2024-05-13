import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, {useCallback} from "react";
import { colors } from "../../constants/colors";
import { useNavigation } from "@tonkeeper/router";
import { MainStackRouteNames, WalletStackRouteNames } from "$navigation";
import { useWallet } from "@tonkeeper/shared/hooks";
import { openRequireWalletModal } from "$core/ModalContainer/RequireWallet/RequireWallet";

const SwapComplete = ({ route } : any) => {
  const { address, amount, assetFrom, assetTo } = route.params;
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
      <Text style={[styles.title]}>Swap has been completed</Text>
      <View style={{ justifyContent: "center", alignItems: "center" }}>
        <Text style={[styles.caption]}>
          You just swapped{" "}
          <Text style={[styles.title, { color: colors.Primary }]}>
            {amount} {assetFrom}
          </Text>{" "}
          to get{" "}
          <Text style={[styles.title, { color: colors.Primary }]}>
            {amount} {assetTo}
          </Text>{" "}
          successfully
        </Text>
      </View>

      <View style={[styles.box]}>
        <Text style={[styles.textBox]}>
          Check your transaction when scanning with encrypted transaction as:{" "}
          <Text style={[styles.textBox, { color: colors.Primary }]}>
            {address}
          </Text>
        </Text>
      </View>
      <TouchableOpacity style={[styles.button]} onPress={handlePressSwap}>
        <Text style={[styles.textButton]}>Swap again</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.buttonOutline]} onPress={handleHome}>
        <Text style={[styles.textButton, { color: colors.Primary }]}>
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 20,
    color: colors.Black,
    fontFamily: "Poppins-Bold",
  },
  caption: {
    width: 250,
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginTop: 20,
    color: colors.Gray_Light,
  },
  box: {
    width: "100%",
    backgroundColor: "#eeeeee",
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
  },
  textBox: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "left",
    color: colors.Gray_Light,
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
  textButton: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.White,
    fontFamily: "Poppins-Medium",
  },
  buttonOutline: {
    width: "100%",
    height: 50,
    backgroundColor: "#eeeeee",
    borderRadius: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
