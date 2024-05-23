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
import { globalStyles } from "$styles/globalStyles";
import { Icon } from "$uikit";
import { navigation } from "@tonkeeper/router";
import { colors } from "../../../constants/colors";

interface Props {
modalVisible: boolean;
onClose: () => void;
}

const ModalConnect = (props: Props) => {
  const { modalVisible, onClose } = props;

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
        style={styles.modal}
      >
        <View style={styles.header}>
          <View></View>
          <Text
            style={[
              globalStyles.textHeader,
              {fontSize: 16 },
            ]}
          >
          Connect Wallet
          </Text>
          <TouchableOpacity style={styles.boxClose} onPress={onClose}>
            <Image
              style={styles.iconCancel}
              source={require("../../../assets/icons/png/ic_cancel.png")}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.modalContent}>
            
        </View>
      </View>
    </Modal>
  );
};

export default ModalConnect;

const styles = StyleSheet.create({
  pressable: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.5)", // Màu nền của modal
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  modal: {
    height: "50%",
    alignItems: "center",
    position: 'absolute',
    backgroundColor: "#fff",
    left: 0,
    right: 0,
    bottom: 0,
  },

  modalContent: {
    width: "100%",
    height: "100%",
    padding: 20,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 5,
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
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
});
