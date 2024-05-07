import React, { memo, useMemo, useState } from "react";
import { Icon, TouchableOpacity } from "$uikit";
import { Steezy } from "$styles";
import { store } from "$store";
import { Alert, Image, View, Modal, Text } from "react-native";
import { openScanQR, openSend } from "$navigation";
import { CryptoCurrencies } from "$shared/constants";
import { DeeplinkOrigin, useDeeplinking } from "$libs/deeplinking";
import { openRequireWalletModal } from "$core/ModalContainer/RequireWallet/RequireWallet";
import { Address } from "@tonkeeper/core";
import { navigation, useNavigation } from "@tonkeeper/router";
import { copyText } from "@tonkeeper/uikit";

export const ScanQRButton = memo(() => {
  const deeplinking = useDeeplinking();
  const nav = useNavigation();
  const [visible, setVisible] = useState<boolean>(false);
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

        const resolver = deeplinking.getResolver(address, {
          delay: 200,
          origin: DeeplinkOrigin.QR_CODE,
        });

        if (resolver) {
          resolver();
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
        style={styles.container}
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
        // onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <View style={styles.topSection}>
              <Text>This is the top section</Text>
              {/* <Image
                source={require("./your-image-icon.png")}
                style={styles.icon}
              /> */}
            </View>
            <View style={styles.bottomSection}>
              <Text>This is the bottom section</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
});

const styles = Steezy.create({
  container: {
    zIndex: 3,
    padding: 10,
  },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  innerContainer: {
    backgroundColor: "#fff",
    width: "80%", // adjust as needed
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#000",
    padding: 20,
  },
  topSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  bottomSection: {
    paddingVertical: 20,
  },
  icon: {
    width: 20,
    height: 20,
  },
});
