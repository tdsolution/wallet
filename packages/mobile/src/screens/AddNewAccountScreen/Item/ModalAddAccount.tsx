import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  Image,
  TouchableOpacity,
  Dimensions,
  Platform,
  Keyboard,
} from "react-native";
import React, { useCallback, useState } from "react";
import { WalletStackRouteNames } from "$navigation";
import { colors } from "../../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import { TextInput } from "react-native-gesture-handler";
import { on } from "process";
import ModalNotification from "./ModalNotification";
import { createWalletFromPrivateKey } from "$libs/EVM/createWallet";
const { width, height } = Dimensions.get("window");

interface Props {
  modalVisible: boolean;
  onClose: () => void;
}

const ModalAddAccount = (props: Props) => {
  const { modalVisible, onClose } = props;
  const [textInput, setTextInput] = useState("");
  const heigthModal = Platform.OS === "ios" ? 300 : 320;
  const [titleNoti, setTileNoti] = useState('');
  const[descriptionNoti, setDescriptionNoti] = useState('');
  const [modalNotification, setModdalNotification] = useState(false);

  const onCleanTextInput = () => {
    setTextInput("");
  };

  const handleCloseNotification = () => {
    setModdalNotification(false);
  };

  const handleCreateWallet = useCallback(() => {
    if (textInput === '') {
      setModdalNotification(true);
      setTileNoti('Private key is none!');
      setDescriptionNoti('Please enter the private key.');
    }
    else {
      async function noti() {
        const a = await createWalletFromPrivateKey(textInput);
        if (a) {
          if (a==1) {
            setModdalNotification(true);
            setTileNoti('');
            setDescriptionNoti('Wallet added successfully!');
          }
          else {
            setModdalNotification(true);
            setTileNoti('Wallet already exists!');
            setDescriptionNoti('Please enter another private key.');
          }
        } 
        else {
          setModdalNotification(true);
            setTileNoti('Wallet does not exist!');
            setDescriptionNoti('You may have entered the wrong private key, please check again.');
        }
      }
      noti();
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
        style={styles.modalContainerAdd}
      >
        <View style={[styles.modalContentAdd, 
          // { height: heigthModal }
          ]}>
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
              Add account
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

          <Text style={styles.subtitle}>
            TD Wallet cannot recover your password. To validate your ownership,
            restore your wallet and set up a new password. First, enter the
            Private Key that you were given where you created your wallet.
          </Text>
          <View style={{ width: "100%" }}>
            <TextInput
              style={styles.input}
              value={textInput}
              onChangeText={(text) => setTextInput(text)}
              placeholder="Your private key"
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
          <TouchableOpacity style={styles.buttonAdd} onPress={() => handleCreateWallet()}>
            <Text style={styles.textButtonAdd}>Add</Text>
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

export default ModalAddAccount;

const styles = StyleSheet.create({
  iconCancel: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: colors.Primary,
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
