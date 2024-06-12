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
import { Icon } from "$uikit";
import ModalViewPrivateKey from "./ModalViewPirivateKey";
import ModalDeleteAccount from "./ModalDeleteAccount";
import ModalEditName from "./ModalEditName";
import { navigation } from "@tonkeeper/router";
import { Text } from "@tonkeeper/uikit";
  
interface Props {
  modalVisible: boolean;
  onClose: () => void;
  item: any;
}
  
const ModalAccount = (props: Props) => {
  const { modalVisible, onClose, item } = props;
  const [modalViewPrivateKey, setModalViewPrivateKey] = useState(false);
  const [modalEditName, setModalEditName] = useState(false);
  const [modalDeleteAccount, setModalDeleteAccount] = useState(false);

  const handleCloseViewPrivateKey= () => {
    setModalViewPrivateKey(false);
  };

  const handleCloseEditName = () => {
    setModalEditName(false);
  };

  const handleCloseDeleteAccount = () => {
    setModalDeleteAccount(false);
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
              style={{marginLeft: 10}}
            >
              {item.name}
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
              onPress={() => setModalViewPrivateKey(true)}
              style={styles.menuContainer}
            >
              <View style={styles.menu}>
              <View style={[styles.boxImageModal, {backgroundColor: "#2b6099"}]}>
                <Image
                  style={styles.icon}
                  source={require("../../../assets/icons_v2/ic-view.png")}
                />
              </View>
              <Text type="label2" color="textPrimaryAlternate" style={{marginLeft: 10}}>View private key</Text>
              </View>
              <Icon name="ic-chevron-right-16" color="constantDark"/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalEditName(true)}
              style={styles.menuContainer}
            >
              <View style={styles.menu}>
              <View style={[styles.boxImageModal, {backgroundColor: "#ffe063"}]}>
                <Icon name="ic-pencil-16"/>
              </View>
              <Text type="label2" color="textPrimaryAlternate" style={{marginLeft: 10}}>Edit wallet name</Text>
              </View>
              <Icon name="ic-chevron-right-16" color="constantDark"/>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setModalDeleteAccount(true)}
              style={styles.menuContainer}
            >
              <View style={styles.menu}>
              <View style={[styles.boxImageModal, {backgroundColor: "#f54949"}]}>
                <Icon name="ic-trash-bin-28" size={18}/>
              </View>
              <Text type="label2" color="textPrimaryAlternate" style={{marginLeft: 10}}>Delete wallet</Text>
              </View>
              <Icon name="ic-chevron-right-16" color="constantDark"/>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ModalViewPrivateKey
        modalVisible={modalViewPrivateKey}
        onClose={handleCloseViewPrivateKey}
        item={item}
        callback={handleClose}
      />
      <ModalEditName
        modalVisible={modalEditName}
        onClose={handleCloseEditName}
        item={item}
        callback={handleClose}
      />
      <ModalDeleteAccount
        modalVisible={modalDeleteAccount}
        onClose={handleCloseDeleteAccount}
        item={item}
        callback={handleClose}
      />
    </Modal>
  );
};

export default ModalAccount;

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
    width: 18,
    height: 18,
    resizeMode: "contain",
    tintColor: colors.White,
  },
});
