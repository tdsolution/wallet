import React, { FC, useCallback, useState } from "react";
import { useDispatch } from "react-redux";

// import * as S from "../AccessConfirmation/AccessConfirmation.style";
import { NavBar } from "$uikit";
import { openSetupNotifications, openSetupWalletDone } from "$navigation";
import { walletActions } from "$store/wallet";
import { CreatePinForm } from "$shared/components";
import { tk } from "$wallet";
import { popToTop } from "$navigation/imperative";
import { useParams } from "@tonkeeper/router/src/imperative";
import { BlockingLoader } from "@tonkeeper/uikit";
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Modal,
} from "react-native";
import { useNavigation } from "@tonkeeper/router";
import { CreateWalletStackRouteNames } from "../../navigation/CreateWalletStack/types";
import ItemAccount from "./Item/ItemAccount";
import { WalletStackRouteNames } from "$navigation";

export const AddNewAccount: FC = () => {
  const params = useParams<{ isImport?: boolean }>();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const isImport = !!params.isImport;

  const handlePinCreated = useCallback(
    async (pin: string) => {
      BlockingLoader.show();
      dispatch(
        walletActions.createWallet({
          pin,
          onDone: (identifiers) => {
            if (isImport) {
              tk.saveLastBackupTimestampAll(identifiers);
            }
            if (tk.wallet.notifications.isAvailable) {
              openSetupNotifications(identifiers);
            } else {
              openSetupWalletDone(identifiers);
            }
            BlockingLoader.hide();
          },
          onFail: () => {
            BlockingLoader.hide();
          },
        })
      );
    },
    [dispatch, isImport]
  );

  const [isPopupVisible, setPopupVisible] = useState(false);

  const renderItem = ({ item }) => (
    <ItemAccount item={item} onPress={() => setPopupVisible(true)} />
  );
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate(WalletStackRouteNames.Wallet)}
        >
          <Image
            source={require("../../assets/icons/png/ic_cancel.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.textHeader}>Wallets</Text>
        <TouchableOpacity>
          <Image
            // source={require("../../assets/icons/png/ic-done-84@4x.png")}
            source={require("../../assets/icons/png/ic_baseline-plus.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 25 }}>
        <Text style={styles.textBody}>Multi-coin wallets</Text>

        <FlatList
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => item.privateKey.toString()}
          ListFooterComponent={<View style={{ height: 150 }} />}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isPopupVisible}
        onRequestClose={() => setPopupVisible(false)}
      >
        <View
          style={{
            position: "absolute",
            backgroundColor: "#ffffff",
            opacity: 0.5,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        ></View>
        <View
          style={{
            position: "absolute",
            backgroundColor: "#ffffff",
            height: 450,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
        >
          <View style={{ padding: 25 }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TouchableOpacity onPress={() => setPopupVisible(false)}>
                <Image
                  source={require("../../assets/icons/png/ic_cancel_connect.png")}
                  style={styles.icon}
                />
              </TouchableOpacity>
              <Text style={styles.textHeader}>Connect Wallet</Text>
              <Text></Text>
            </View>
            <View style={{ alignItems: "center", marginTop: 27 }}>
              <Image
                source={require("../../assets/logo/img_connect_wallet.png")}
                style={styles.image}
              />
            </View>
            <TouchableOpacity
              style={styles.box}
              // onPress={() => navigation.navigate(CreateWalletStackRouteNames.Backup)}
            >
              <Image
                source={require("../../assets/logo/img_create.png")}
                style={styles.iconPlus}
              />
              <View style={{ width: "80%" }}>
                <Text style={styles.title}>Create new wallet</Text>
                <Text style={styles.body}>Secret phrase or swift wallet</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.box}
              // onPress={() => navigation.navigate(CreateWalletStackRouteNames.Backup)}
            >
              <Image
                source={require("../../assets/logo/img_create.png")}
                style={styles.iconPlus}
              />
              <View style={{ width: "80%" }}>
                <Text style={styles.title}>Add existing wallet</Text>
                <Text style={styles.body}>Import, restore or view-only</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  textHeader: {
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
    textAlign: "left",
    fontFamily: "Poppins-Medium",
    marginBottom: 10,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  image: {
    width: 140,
    height: 136,
    resizeMode: "contain",
    marginBottom: 10,
  },
  box: {
    height: 75,
    backgroundColor: "#90909014",
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 16,
  },

  title: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4871EA",
    lineHeight: 26,
    textAlign: "left",
    fontFamily: "Poppins-Medium",
  },
  body: {
    fontSize: 12,
    fontWeight: "400",
    color: "#7C7C7C",
    lineHeight: 16,
    textAlign: "left",
    fontFamily: "Poppins-Light",
  },
  iconPlus: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "contain",
  },
});

const data = [
  {
    name: "Vi TTT",
    mnemonic: "Multi-coin wallet",
    privateKey:
      "b42b1967b4d8ff05d9a0c53a6e9f76cb3427f597d86b9e5ee18363d972b248fb",
  },
  {
    name: "Vi onebit owner",
    mnemonic: "Multi-coin wallet",
    privateKey:
      "b38fc6c93dd6512ee2a4e17cbf2dc368cd85bb7dcaab6b5c6c5fc0e41ee6a6d4",
  },
  {
    name: "new trendy",
    mnemonic: "Multi-coin wallet",
    privateKey:
      "2d3d665e78604b4703660d0f54b2ec3d5d5c87603c27ed8f53e9d498f900d95",
  },
  {
    name: "TTT cloud",
    mnemonic: "Multi-coin wallet",
    privateKey:
      "da1d4f07c8feef3fd5c1399e28c3b758e800df5b45aa8aa70ebe6a2d6e39eb3a",
  },
  {
    name: "Onebit after hack",
    mnemonic: "Multi-coin wallet",
    privateKey:
      "b75597c7c76e1f9b8355c98f6c732098f35409778f4142abf920cb97e6e0e1da",
  },
  {
    name: "Dev meme",
    mnemonic: "Multi-coin wallet",
    privateKey:
      "b75597c7c76e1f9b8355c98f6c732098f35409778f4142abf920cb97e6e0e1db",
  },
  {
    name: "Dev core stack",
    mnemonic: "Multi-coin wallet",
    privateKey:
      "b75597c7c76e1f9b8355c98f6c732098f35409778f4142abf920cb97e6e0e1dd",
  },
];
