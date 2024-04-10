import React, { FC, useCallback, useEffect, useState } from "react";
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
  Pressable,
} from "react-native";
import { useNavigation } from "@tonkeeper/router";
import { CreateWalletStackRouteNames } from "../../navigation/CreateWalletStack/types";
import ItemAccount from "./Item/ItemAccount";
import { WalletStackRouteNames } from "$navigation";
import { colors } from "../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import { TextInput } from "react-native-gesture-handler";
import SaveListWallet from "$libs/EVM/SaveWallet";
import { createWalletFromPrivateKey } from "$libs/EVM/createWallet";

export const AddNewAccount: FC = () => {
  const [data2,setdata2] = useState(null);
  useEffect(() => {
    async function getdata() {
        const data = await SaveListWallet.getData();
        setdata2(data);
    }
    getdata();
 }, []);
  console.log(data2);
  const [text, onChangeText] = React.useState('');
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
  const [modalVisible, setModalVisible] = useState(false);
  const [modalAddAccount, setModalAddAccount] = useState(false);

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
      <View style={{ paddingHorizontal: 25 }}>
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
      <Modal
        animationType="slide"
        transparent={true}
        visible={isPopupVisible}
        onRequestClose={() => setPopupVisible(false)}
      >
        <Pressable
          // onPress={() => setPopupVisible(false)}
          style={{
            position: "absolute",
            backgroundColor: "#ffffff",
            opacity: 0.5,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        ></Pressable>
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
      {/* Modal Connect Wallet End */}

      {/* Modal Add A Secondary Wallet Start */}
      <Modal
        animationType="slide" // Loại animation khi mở/closed modal
        transparent={true} // Cho phép modal trở nên trong suốt
        visible={modalVisible} // Trạng thái của modal (true: hiển thị, false: ẩn)
        onRequestClose={() => {
          setModalVisible(false); // Xử lý khi người dùng ấn nút back hoặc click bên ngoài modal
        }}
      >
        <Pressable
          style={styles.modalContainer}
          // onPress={() => setModalVisible(false)}
        >
          <View style={styles.modaleHeader}>
            <View style={styles.rowHeader}>
              <View></View>
              <Text
                style={[
                  globalStyles.textHeader,
                  { color: colors.White, fontSize: 16 },
                ]}
              >
                Add a secondary wallet
              </Text>
              <TouchableOpacity
                style={styles.boxClose}
                onPress={() => setModalVisible(false)}
              >
                <Image
                  style={styles.iconCancel}
                  source={require("../../assets/icons/png/ic_cancel.png")}
                />
              </TouchableOpacity>
            </View>
            <View style={styles.modalContent}>
              <TouchableOpacity
                onPress={() => setModalAddAccount(true)}
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 10,
                }}
              >
                <View style={styles.boxImageModal}>
                  <Image
                    style={styles.iconAdd}
                    source={require("../../assets/icons/png/ic-key-28.png")}
                  />
                </View>
                <Text style={styles.textButton}>
                  Add wallet with private key
                </Text>
              </TouchableOpacity>
              <View
                style={{ borderBottomWidth: 0.5, borderColor: colors.Gray }}
              ></View>
              <TouchableOpacity
                style={{
                  width: "100%",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingVertical: 10,
                }}
              >
                <View
                  style={[styles.boxImageModal, { backgroundColor: "#0F6292" }]}
                >
                  <Image
                    style={styles.iconAdd}
                    source={require("../../assets/icons/png/ic-plus-28.png")}
                  />
                </View>
                <Text style={styles.textButton}>Add a new wallet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Modal>
      {/* Modal Add A Secondary Wallet End */}

      {/* Modal Add Accont Start */}
      <Modal
        animationType="slide" // Loại animation khi mở/closed modal
        transparent={true} // Cho phép modal trở nên trong suốt
        visible={modalAddAccount} // Trạng thái của modal (true: hiển thị, false: ẩn)
        onRequestClose={() => {
          setModalAddAccount(false); // Xử lý khi người dùng ấn nút back hoặc click bên ngoài modal
        }}
      >
        <Pressable
          style={styles.modalContainerAdd}
          // onPress={() => setModalAddAccount(false)}
        >
          <View style={styles.modalContentAdd}>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <View></View>
              <Text style={[globalStyles.textHeader, { fontSize: 16 }]}>
                Add account
              </Text>
              <TouchableOpacity onPress={() => setModalAddAccount(false)}>
                <Image
                  style={[
                    styles.iconCancel,
                    { tintColor: colors.Black, width: 30, height: 30 },
                  ]}
                  source={require("../../assets/icons/png/ic_cancel.png")}
                />
              </TouchableOpacity>
            </View>

            <Text style={styles.subtitle}>
              TD Wallet cannot recover your password. To validate your
              ownership, restore your wallet and set up a new password. First,
              enter the Private Key that you were given where you created your
              wallet.
            </Text>
            <View style={{ width: "100%" }}>
              <TextInput style={styles.input} placeholder="Your private key" onChangeText={onChangeText}
        value={text}/>
              <TouchableOpacity
                style={{ position: "absolute", right: 10, top: 10 }}
              >
                <Image
                  style={[styles.iconInput]}
                  source={require("../../assets/icons/png/ic_cancel.png")}
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.buttonAdd} onPress={() => createWalletFromPrivateKey(text)}>
              <Text style={styles.textButtonAdd}>Add</Text>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
      {/* Modal Add Accont Start */}
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
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Màu nền của modal
  },
  modalContent: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  modaleHeader: {
    width: "100%",
    height: "50%",
    marginHorizontal: 25,
    backgroundColor: colors.Primary,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    alignItems: "center",
  },
  boxClose: {
    width: 40,
    height: 40,
    borderRadius: 25,
    backgroundColor: colors.White,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  iconCancel: {
    width: 45,
    height: 45,
    resizeMode: "contain",
    tintColor: colors.Primary,
  },
  rowHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  textButton: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.Black,
    lineHeight: 26,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    marginLeft: 10,
  },
  boxImageModal: {
    width: 40,
    height: 40,
    backgroundColor: "#68B984",
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  iconAdd: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: colors.White,
  },
  modalContainerAdd: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Màu nền của modal
  },
  modalContentAdd: {
    width: 350,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 25,
    alignItems: "center",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.Black,
    textAlign: "left",
    fontFamily: "Poppins-Medium",
    marginVertical: 10,
  },
  input: {
    width: "100%",
    height: 50,
    backgroundColor: colors.White,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingRight: 45,
    fontSize: 14,
    fontWeight: "500",
    color: colors.Black,
    lineHeight: 26,
    textAlign: "left",
    fontFamily: "Poppins-Medium",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.Gray_Light,
  },
  iconInput: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    tintColor: colors.Primary,
  },
  buttonAdd: {
    width: "100%",
    height: 50,
    backgroundColor: colors.Primary,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  textButtonAdd: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.White,
    fontFamily: "Poppins-Medium",
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
