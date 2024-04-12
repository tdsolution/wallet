import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { WalletStackRouteNames } from "$navigation";
import { colors } from "../../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import { TextInput } from "react-native-gesture-handler";
import ModalAddAccount from "./ModalAddAccount";

interface Props {
  modalVisible: boolean;
  onClose: () => void;
}

const ModalChooseAddWallet = (props: Props) => {
  const { modalVisible, onClose } = props;
  const [modalAddAccount, setModalAddAccount] = useState(false);
  const handleCloseAddAccount = () => {
    setModalAddAccount(false);
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
          style={{
            flex: 1,
            position: "absolute",
            backgroundColor: "rgba(0,0,0,0.5)", // Màu nền của modal
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        ></Pressable>
      <View
        style={styles.modalContainer}
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
                  source={require("../../../assets/icons/png/ic-key-28.png")}
                />
              </View>
              <Text style={styles.textButton}>Add wallet with private key</Text>
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
                  source={require("../../../assets/icons/png/ic-plus-28.png")}
                />
              </View>
              <Text style={styles.textButton}>Add a new wallet</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* Modal Add Accont Start */}
      <ModalAddAccount
        modalVisible={modalAddAccount}
        onClose={handleCloseAddAccount}
      />
      {/* Modal Add Accont Start */}
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
  modaleHeader: {
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
});
