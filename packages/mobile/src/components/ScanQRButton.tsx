import React, { memo, useMemo, useState } from "react";
import { Icon, TouchableOpacity } from "$uikit";
import { Steezy } from "$styles";
import { store } from "$store";
import {
  Alert,
  Image,
  View,
  Modal,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  ToastAndroid,
} from "react-native";
import { openScanQR, openSend } from "$navigation";
import { CryptoCurrencies } from "$shared/constants";
import { DeeplinkOrigin, useDeeplinking } from "$libs/deeplinking";
import { openRequireWalletModal } from "$core/ModalContainer/RequireWallet/RequireWallet";
import { Address } from "@tonkeeper/core";
import { navigation, useNavigation } from "@tonkeeper/router";
import { copyText } from "@tonkeeper/uikit";
import { colors } from "../constants/colors";
import { Toast } from "$store";
import { useEvm, useChain } from "@tonkeeper/shared/hooks";

export const ScanQRButton = memo(() => {
  const chain = useChain()?.chain;
  const deeplinking = useDeeplinking();
  const nav = useNavigation();
  const [visible, setVisible] = useState<boolean>(false);
  const [addressWallet, setAddressWallet] = useState<string>("");
  const hitSlop = useMemo(
    () => ({
      top: 26,
      bottom: 26,
      left: 26,
      right: 26,
    }),
    []
  );

  const handlePressScanQR = React.useCallback(() => {
    if (store.getState().wallet.wallet) {
      openScanQR((address) => {
        if (Address.isValid(address)) {
          setTimeout(() => {
            openSend({ currency: CryptoCurrencies.Ton, address });
          }, 200);
          console.log("Quet ma thanh cong: ", address.toString());
          return true;
        }
        // if (address) {
        //   let index = address.indexOf(":");
        //   if (index !== -1) {
        //     address = address.substring(index + 1); // Lấy phần sau dấu :
        //   }
        //   setVisible(true);
        //   setAddressWallet(address.toString());
        //   return true;
        // }
       
        const resolver = deeplinking.getResolver(address, {
          delay: 200,
          origin: DeeplinkOrigin.QR_CODE,
        });

        if (resolver) {
          resolver();
          return true;
        }else {
          let index = address.indexOf(":");
          if (index !== -1) {
            address = address.substring(index + 1); // Lấy phần sau dấu :
          }
          setVisible(true);
          setAddressWallet(address.toString());
          return true;
        }

        return false;
      });
    } else {
      openRequireWalletModal();
    }
  }, []);
  return (
    <View>
      <TouchableOpacity
        onPress={handlePressScanQR}
        style={[style.container]}
        activeOpacity={0.6}
        hitSlop={hitSlop}
      >
        <Image
          source={require("../assets/icons_v1/icon_qr.png")}
          resizeMode="contain"
          style={{ width: 25, height: 25 }}
        />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          onPress={() => setVisible(false)}
          style={styles.modalContainer}
        ></Pressable>
        <View style={styles.innerContainer}>
          <View>
            <Text style={{ marginBottom: 4 }}>Result</Text>
            <View style={[styles.row]}>
              <Text style={[styles.text]}>{addressWallet}</Text>
              <TouchableOpacity onPress={copyText(addressWallet)}>
                <Image
                  style={[styles.icon]}
                  source={require("../assets/icons_v1/icon_copy.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
});

const styles = StyleSheet.create({
  modalContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  innerContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 300,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
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
  icon: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    tintColor: colors.Gray,
  },
  row: {
    width: "100%",
    height: 100,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#eeeeee",
    borderRadius: 10,
    paddingHorizontal: 20,
  },
  text: {
    width: "85%",
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});
const style = Steezy.create({
  container: {
    zIndex: 3,
    padding: 5
  },
});
