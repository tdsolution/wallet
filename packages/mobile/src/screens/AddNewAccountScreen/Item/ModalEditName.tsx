import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Image,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import React, { useCallback, useState } from "react";
import { colors } from "../../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import { TextInput } from "react-native-gesture-handler";
import ModalNotification from "./ModalNotification";
import SaveListWallet from "$libs/EVM/SaveWallet";
import { navigation } from "@tonkeeper/router";
import { WalletStackRouteNames } from "$navigation";

interface Props {
  modalVisible: boolean;
  onClose: () => void;
  item?: any;
}
  
const ModalEditName = (props: Props) => {
  const { modalVisible, onClose, item} = props;
  const [textInput, setTextInput] = useState("");
  const [titleNoti, setTileNoti] = useState("");
  const [descriptionNoti, setDescriptionNoti] = useState("");
  const [modalNotification, setModalNotification] = useState(false);

  const onCleanTextInput = () => {
    setTextInput("");
  };

  const handleCloseNotification = () => {
    setModalNotification(false);
  };

  const handleEditName = useCallback(() =>  {
    if (textInput === '') {
      setModalNotification(true);
      setTileNoti('New wallet name is none!');
      setDescriptionNoti('Please enter new wallet name.');
    }
    else {
      setTileNoti('');
      setDescriptionNoti('The walet has been renamed!');
      SaveListWallet.editNameWallet(item, textInput);
      setModalNotification(true);
      }
  }, [textInput]);
    
  return (
    <Modal
      animationType="slide" // Loại animation khi mở/closed modal
      transparent={true} // Cho phép modal trở nên trong suốt
      visible={modalVisible} // Trạng thái của modal (true: hiển thị, false: ẩn)
      onRequestClose={onClose}
    >
      <Pressable
        onPress={Keyboard.dismiss}
        style={styles.modalContainer}
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
              style={[
                globalStyles.textHeader,
                { fontSize: 16},
              ]}
            >
              Edit wallet name
            </Text>
          <TouchableOpacity onPress={() => {onClose(); onCleanTextInput()}}>
            <Image
              style={[
                styles.iconCancel,
                { tintColor: colors.Black, width: 30, height: 30 },
              ]}
              source={require("../../../assets/icons/png/ic_cancel.png")}
            />
          </TouchableOpacity>
          </View>
          <View style={{ width: "100%", marginTop: 20 }}>
            <TextInput
              style={styles.input}
              value={textInput}
              onChangeText={(text) => setTextInput(text)}
              placeholder="New wallet name"
              placeholderTextColor={colors.Gray}
            />
            <TouchableOpacity
              style={{ position: "absolute", right: 10, top: 10 }}
              onPress={onCleanTextInput}
            >
              <Image
                style={[styles.iconInput]}
                source={require("../../../assets/icons/png/ic_cancel.png")}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.button} onPress={() => handleEditName()}>
            <Text style={styles.textButton}>Edit</Text>
          </TouchableOpacity>
        </View>
      </Pressable>
      <ModalNotification
        modalVisible={modalNotification}
        onClose={handleCloseNotification}
        title={titleNoti}
        description={descriptionNoti}
      />
    </Modal>
  );
};

export default ModalEditName;

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
    textAlign: "left",
    fontFamily: "Poppins-Medium",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.Gray_Light,
  },
  iconInput: {
    width: 25,
    height: 25,
    resizeMode: "contain",
    tintColor: colors.Primary,
  },
  button: {
    width: "100%",
    height: 40,
    backgroundColor: colors.Primary,
    borderRadius: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  textButton: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.White,
    fontFamily: "Poppins-Medium",
  },
});
  