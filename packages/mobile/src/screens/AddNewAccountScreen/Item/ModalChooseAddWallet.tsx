import {
  StyleSheet,
  View,
  Modal,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import ModalAddAccount from "./ModalAddAccount";
import { Icon } from "$uikit";
import ModalAddMnemonic from "./ModalAddMnemonic";
import ModalCreateWallet from "./ModalCreateWallet";
import { Text } from "@tonkeeper/uikit";

interface Props {
  modalVisible: boolean;
  onClose: () => void;
}

const ModalChooseAddWallet = (props: Props) => {
  const { modalVisible, onClose } = props;
  const [modalAddAccount, setModalAddAccount] = useState(false);
  const [modalAddMnemonic, setModalAddMnemonic] = useState(false);
  const [modalCreateWallet, setModalCreateWallet] = useState(false);

  const handleCloseAddAccount = () => {
    setModalAddAccount(false);
    // onClose();
  };

  const handleCloseAddMnemonic = () => {
    setModalAddMnemonic(false);
  };

  const handleCloseCreateWallet = () => {
    setModalCreateWallet(false);
  };

  const handleClose = () => {
    onClose();
   };
 
  return (
    <Modal
      animationType="slide" // Loại animation khi mở/closed modal
      transparent={true} // Cho phép modal trở nên trong suốt
      visible={modalVisible} // Trạng thái của modal (true: hiển thị, false: ẩn)
      onRequestClose={onClose}
    >
      <Pressable
          onPress={onClose}
          style={styles.pressable}
        ></Pressable>
      <View
        style={styles.modalContainer}
      >
        <View style={styles.modalHeader}>
          <View style={styles.rowHeader}>
            <View></View>
            <Text
             type="label1"
            >
             Add a secondary wallet
            </Text>
            <TouchableOpacity style={styles.boxClose} onPress={onClose}>
              <Image
                style={styles.iconCancel}
                source={require("../../../assets/icons/png/ic_cancel.png")}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <TouchableOpacity
              onPress={() => setModalAddAccount(true)}
              style={styles.menuContainer}
            >
              <View style={styles.menu}>
              <View style={[styles.boxImageModal, {backgroundColor: "#68B984"}]}>
                <Icon name="ic-key-28" size={20}/>
              </View>
              <Text type="label2" color="textPrimaryAlternate" style={{marginLeft: 10}}>Add wallet with private key</Text>
              </View>
              <Icon name="ic-chevron-right-16" color="constantDark"/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalAddMnemonic(true)}
              style={styles.menuContainer}
            >
              <View style={styles.menu}>
              <View style={[styles.boxImageModal, {backgroundColor: "#f54949"}]}>
                <Icon name="ic-wallet-28" size={20}/>
              </View>
              <Text type="label2" color="textPrimaryAlternate" style={{marginLeft: 10}}>Add wallet with mnemonic</Text>
              </View>
              <Icon name="ic-chevron-right-16" color="constantDark"/>
            </TouchableOpacity>
            <TouchableOpacity
               onPress={() => setModalCreateWallet(true)}
              style={styles.menuContainer}
            >
              <View style={styles.menu}>
              <View style={[styles.boxImageModal, {backgroundColor: "#0F6292"}]}>
                <Image
                  style={styles.icon}
                  source={require("../../../assets/icons/png/ic-plus-28.png")}
                />
              </View>
              <Text type="label2" color="textPrimaryAlternate" style={{marginLeft: 10}}>Create a new wallet</Text>
              </View>
              <Icon name="ic-chevron-right-16" color="constantDark"/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ModalAddAccount
        modalVisible={modalAddAccount}
        onClose={handleCloseAddAccount}
        callback={handleClose}
      />
      <ModalAddMnemonic
        modalVisible={modalAddMnemonic}
        onClose={handleCloseAddMnemonic}
        callback={handleClose}
      />
      <ModalCreateWallet
        modalVisible={modalCreateWallet} 
        onClose={handleCloseCreateWallet}
        callback={handleClose}
      />
    </Modal>
  );
};

export default ModalChooseAddWallet;

const styles = StyleSheet.create({
  iconPlus: {
    width: 40,
    height: 40,
    borderRadius: 20,
    resizeMode: "contain",
  },
  modalContainer: {
    height: "50%",
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Màu nền của modal
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalContent: {
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    padding: 20,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  pressable: {
    flex: 1,
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)", // Màu nền của modal
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modalHeader: {
    width: "100%",
    marginHorizontal: 25,
    backgroundColor: colors.Primary,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    alignItems: "center",
  },
  boxClose: {
    width: 26,
    height: 26,
    borderRadius: 25,
    backgroundColor: colors.White,
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
  },
  iconCancel: {
    width: 24,
    height: 24,
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
  menuContainer:{
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  menu: {
    flexDirection: "row",
    alignItems: "center",
  },
  boxImageModal: {
    width: 40,
    height: 40,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: colors.White,
  },
});
