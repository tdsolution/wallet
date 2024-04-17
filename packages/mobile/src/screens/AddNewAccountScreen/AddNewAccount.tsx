import React, { FC, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// import * as S from "../AccessConfirmation/AccessConfirmation.style";
import { openSetupNotifications, openSetupWalletDone } from "$navigation";
import { walletActions } from "$store/wallet";
import { tk } from "$wallet";
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
  Pressable,
} from "react-native";
import { useNavigation } from "@tonkeeper/router";
import ItemAccount from "./Item/ItemAccount";
import { WalletStackRouteNames } from "$navigation";
import ModalChooseAddWallet from "./Item/ModalChooseAddWallet";
import ModalConnectWallet from "./Item/ModalConnectWallet";
import SaveListWallet from "$libs/EVM/SaveWallet";
import { ListWalletModel } from "$libs/EVM/SaveWallet";

export const AddNewAccount: FC = () => {
  const params = useParams<{ isImport?: boolean }>();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isImport = !!params.isImport; 

  const [popupVisible, setPopupVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [data2, setdata2] = useState<ListWalletModel[]>();

  const handleCloseChooseWallet = () => {
    setModalVisible(false);
  };

  const handleCloseConnectWallet = () => {
    setPopupVisible(false);
  };

  useEffect(() => {
    async function getdata() {
        const data = await SaveListWallet.getData();
        setdata2(data);
    }
    getdata();
  }, [data2]);

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
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Image
            // source={require("../../assets/icons/png/ic-done-84@4x.png")}
            source={require("../../assets/icons/png/ic_baseline-plus.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 25, marginTop: 37 }}>
        <Text style={styles.textBody}>Multi-coin wallets</Text>

        <FlatList
          data={data2}
          renderItem={renderItem}
          keyExtractor={(item) => item.privateKey.toString()}
          ListFooterComponent={<View style={{ height: 150 }} />}
          showsVerticalScrollIndicator={false}
        />
      </View>
      {/* Modal Connect Wallet Start */}
      <ModalConnectWallet modalVisible={popupVisible} onClose={handleCloseConnectWallet} />
      {/* Modal Connect Wallet End */}

      {/* Modal Add A Secondary Wallet Start */}
      <ModalChooseAddWallet modalVisible={modalVisible} onClose={handleCloseChooseWallet}/>
      {/* Modal Add A Secondary Wallet End */}

      {/* Modal Add Accont Start */}
      {/* <ModalAddAccount modalVisible={modalAddAccount} onClose={handleCloseAddAccount} /> */}
     
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
});