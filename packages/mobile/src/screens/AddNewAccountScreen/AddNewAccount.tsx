import React, { FC, useCallback, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

// import * as S from "../AccessConfirmation/AccessConfirmation.style";
import { openSetupNotifications, openSetupWalletDone } from "$navigation";
import { walletActions } from "$store/wallet";
import { tk } from "$wallet";
import { useParams } from "@tonkeeper/router/src/imperative";
import { BlockingLoader, Text, isIOS } from "@tonkeeper/uikit";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { useNavigation } from "@tonkeeper/router";
import { WalletStackRouteNames } from "$navigation";
import ModalChooseAddWallet from "./Item/ModalChooseAddWallet";
import ModalConnectWallet from "./Item/ModalConnectWallet";
import SaveListWallet from "$libs/EVM/SaveWallet";
import { ListWalletModel } from "$libs/EVM/SaveWallet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ModalAccount from "./Item/ModalAccount";
import { addressEVMString, setWalletEVM } from "$libs/EVM/createWallet";
import { useEvm } from "@tonkeeper/shared/hooks";
import ModalSetMainAccount from "./Item/ModalSetMainAccount";
import { Icon } from "$uikit";

export const AddNewAccount = () => {
  const params = useParams<{ isImport?: boolean }>();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isImport = !!params.isImport; 

  const [popupVisible, setPopupVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAccountVisible, setModalAccountVisible] = useState(false);
  const [modalSetMainAccount, setModalSetMainAccount] = useState(false);
  const [data2, setdata2] = useState<ListWalletModel[]>();
  const [addressEvm, setAddressEVM] = useState("");
  const [item, setItem] = useState({});

  const handleCloseChooseWallet = () => {
    setModalVisible(false);
  };

  const handleCloseConnectWallet = () => {
    setPopupVisible(false);
  };

  const handleCloseModalAccount = () => {
    setModalAccountVisible(false);
  };
  
  const handleCloseModalSetMainAccount = () => {
    setModalSetMainAccount(false);
  };

  const loadDataEVM = useCallback(async () => {
    try {
      const address = (await AsyncStorage.getItem("EVMAddress")) ?? "";
      return address;
    } catch (error) {
      console.error("Error loading EVM address:", error);
      throw error;
    }
  }, []);

  useEffect(() => {
    loadDataEVM().then((address) => setAddressEVM(address));
  }, [loadDataEVM]);

  useEffect(() => {
    async function getdata() {
        const data = await SaveListWallet.getData();
        setdata2(data);
    }
    getdata();
  }, [modalVisible, modalAccountVisible, setWalletEVM]);

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
    <View style={{ marginBottom: 20 }}>
      <View style={styles.headerItem}>
        <TouchableOpacity 
          onPress={() => {setModalSetMainAccount(true), setItem(item)}}
          style={{width: "80%"}}
        >
        <View style={{ flexDirection: "row", alignItems:"center" }}>
          <View>
            <Image
              source={require("../../assets/logo/img_td.png")}
              style={styles.image}
            />
            {item.addressWallet == addressEvm 
            ? <Image
              source={require("../../assets/logo/img_check_connect.png")}
              style={[styles.imageCheck]}
            />
            : <></>
            }
          </View>
          <View>
            <Text type="label1" color="textPrimaryAlternate" style={{marginBottom:2}} >{item.name}</Text>
            <Text type="body3" color="textSecondary">Multi-coin wallet</Text>
          </View>
        </View>
        </TouchableOpacity>
        <TouchableOpacity 
          onPress={() => {setModalAccountVisible(true), setItem(item)}}
        >
          <Image
            source={require("../../assets/icons/png/ic_menu_dot.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      {/* <TouchableOpacity onPress={() => setPopupVisible(true)}>
        <Text type="label3" color="primaryColor" textAlign="right" style={{marginTop:8}}>Backup to iCloud</Text>
      </TouchableOpacity> */}
      
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.navigate(WalletStackRouteNames.Wallet)}
          style={{width: '10%', alignItems: "flex-start"}}
        >
          <Icon name="ic-close-16" color="primaryColor" size={18} />
        </TouchableOpacity>
        <Text type="h3" color="primaryColor">Wallets</Text>
        <TouchableOpacity onPress={() => setModalVisible(true)} style={{width: '10%', alignItems: "flex-end"}}>
          <Image
            // source={require("../../assets/icons/png/ic-done-84@4x.png")}
            source={require("../../assets/icons/png/ic_baseline-plus.png")}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={{ paddingHorizontal: 25, marginTop: 37 }}>
        <Text
        fontSize={14}
        color="textSecondary"
       style={{marginBottom: 10}}
        >Multi-coin wallets</Text>
        <FlatList
          data={data2}
          renderItem={renderItem}
          keyExtractor={(item) => item.privateKey.toString()}
          ListFooterComponent={<View style={{ height: 150 }} />}
          showsVerticalScrollIndicator={false}
        />
      </View>

      <ModalConnectWallet 
        modalVisible={popupVisible} 
        onClose={handleCloseConnectWallet} 
      />
      <ModalChooseAddWallet 
        modalVisible={modalVisible} 
        onClose={handleCloseChooseWallet}
      />
      <ModalAccount 
        modalVisible={modalAccountVisible} 
        onClose={handleCloseModalAccount} 
        item={item}
      />
      <ModalSetMainAccount
        modalVisible={modalSetMainAccount} 
        onClose={handleCloseModalSetMainAccount} 
        item={item}
      />
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
    marginTop: isIOS ? 0 : 10,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
  },
  headerItem: {
    backgroundColor: "#4871EA14",
    height: 70,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  image: {
    width: 29,
    height: 29,
    borderRadius: 15,
    resizeMode: "cover",
    marginRight: 11,
  },
  icon2: {
    width: 21,
    height: 21,
    resizeMode: "contain",
  },
  imageCheck: {
    width: 13.13,
    height: 13.13,
    borderRadius: 15,
    resizeMode: "cover",
    position: "absolute",
    top: -5,
    right: 8,
  },
});