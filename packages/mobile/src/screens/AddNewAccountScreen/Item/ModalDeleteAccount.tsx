import {
    StyleSheet,
    View,
    Modal,
    Pressable,
    TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import { Icon } from "$uikit";
import ModalNotification from "./ModalNotification";
import SaveListWallet from "$libs/EVM/SaveWallet";
import { Text } from "@tonkeeper/uikit";

interface Props {
  modalVisible: boolean;
  onClose: () => void;
  item: any;
  callback: () => void;
}

const ModalDeleteAccount = (props: Props) => {
  const {modalVisible, onClose, item, callback} = props;
  const [descriptionNoti, setDescriptionNoti] = useState('');
  const [modalNotification, setModalNotification] = useState(false);

  const handleCloseNotification = () => {
    setModalNotification(false);
    onClose();
    callback();
  };

  const handleDeleteWallet = () => {
    SaveListWallet.deleteWallet(item.privateKey);
    setModalNotification(true);
    setDescriptionNoti('The walet has been deleted!');
  };

  return (
      <Modal
      // animationType="slide" // Loại animation khi mở/closed modal
      transparent={true} // Cho phép modal trở nên trong suốt
      visible={modalVisible} // Trạng thái của modal (true: hiển thị, false: ẩn)
      onRequestClose={onClose}
      >
      <Pressable
        style={styles.modalContainer}
        // onPress={() => setModalAddAccount(false)}
      >
        <View style={styles.modalContent}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View></View>
            <Text 
             type="h3"
             color="primaryColor"         
             style={{marginLeft:24}}>
              TD Wallet Notices
            </Text>
            <Icon name="ic-warning-28" color="accentRed"/>
          </View>
          <Text type="body2" color="textPrimaryAlternate" style={{marginVertical: 10}}>
            Are you sure to remove this wallet?
          </Text>
          <View style={{flexDirection: "row", justifyContent: "space-around", alignItems: "center", width: "90%"}}>
          <TouchableOpacity style={[styles.button, {backgroundColor: "#f54949"}]} onPress={onClose}>
              <Text type="label2">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {backgroundColor: colors.Primary}]} onPress={handleDeleteWallet}>
              <Text type="label2">Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
      <ModalNotification
        modalVisible={modalNotification}
        onClose={handleCloseNotification}
        description={descriptionNoti}
      />
    </Modal>
  );
};

export default ModalDeleteAccount;

const styles = StyleSheet.create({
  iconCancel: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: colors.Primary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)", // Màu nền của modal
  },
  modalContent: {
    width: 350,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 25,
    alignItems: "center",
  },
  button: {
    width: "30%",
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
});
  