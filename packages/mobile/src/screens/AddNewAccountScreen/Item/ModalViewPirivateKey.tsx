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
import { colors } from "../../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import { Icon } from "$uikit";
import Clipboard from "@react-native-community/clipboard";
import ModalNotification from "./ModalNotification";
interface Props {
  modalVisible: boolean;
  onClose: () => void;
  item: any;
}

const ModalViewPrivateKey = (props: Props) => {
  const { modalVisible, onClose, item} = props;
  const [descriptionNoti, setDescriptionNoti] = useState('');
  const [modalNotification, setModdalNotification] = useState(false);

  const handleCopy = () => {
    Clipboard.setString(item.privateKey)
    setModdalNotification(true);
    setDescriptionNoti('The private key has been copied!');
  };

  const handleCloseNotification = () => {
    setModdalNotification(false);
    onClose();
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
            <Text style={[globalStyles.textHeader, { fontSize: 16 }]}>
              View Private Key
            </Text>
            <TouchableOpacity onPress={onClose}>
              <Image
                style={[
                  styles.iconCancel,
                  { tintColor: colors.Black, width: 30, height: 30 },
                ]}
                source={require("../../../assets/icons/png/ic_cancel.png")}
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.subtitle}>
            Never share your private key with anyone and securely store your seed phrase!
          </Text>
          <View style={{flexDirection: "row", justifyContent: "space-around", alignItems: "center", width: "90%"}}>
            <View style={{ 
              width: "80%", 
              borderWidth: 0.5,
              borderRadius: 10,
              padding: 10,
              backgroundColor: "#fdfcfc"
              }}>
            <Text style={styles.privateKey}>{item.privateKey} </Text>
            </View>
            <TouchableOpacity onPress={handleCopy}>
              <Icon name="ic-copy-16" color="primaryColor" size={24}/>
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

export default ModalViewPrivateKey;

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
    subtitle: {
      fontSize: 14,
      fontWeight: "500",
      color: colors.Black,
      textAlign: "center",
      fontFamily: "Poppins-Medium",
      marginVertical: 10,
      width: "90%",
    },
    privateKey: {
      fontSize: 14,
      fontWeight: "800",
      color: colors.Black,
      textAlign: "left",
      fontFamily: "Poppins-Medium",
    },
});
