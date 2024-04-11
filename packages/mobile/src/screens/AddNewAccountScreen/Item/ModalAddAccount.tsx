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
} from "react-native";
import React, { useState } from "react";
import { WalletStackRouteNames } from "$navigation";
import { colors } from "../../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import { TextInput } from "react-native-gesture-handler";
import { on } from "process";
const { width, height } = Dimensions.get("window");

interface Props {
  modalVisible: boolean;
  onClose: () => void;
}

const ModalAddAccount = (props: Props) => {
  const { modalVisible, onClose } = props;
  const [textInput, setTextInput] = useState("");
  const heigthModal = Platform.OS === "ios" ? 300 : 320;

  const onCleanTextInput = () => {
    setTextInput("");
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
        style={[
          styles.modalContainerAdd,
          { left: (width - 350) / 2, top: (height - heigthModal) / 2 },
        ]}
      >
        <View style={[styles.modalContentAdd, { height: heigthModal }]}>
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
                { fontSize: 16, fontWeight: "bold" },
              ]}
            >
              Add account
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
          <TouchableOpacity style={styles.buttonAdd}>
            <Text style={styles.textButtonAdd}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalAddAccount;

const styles = StyleSheet.create({
  iconCancel: {
    width: 45,
    height: 45,
    resizeMode: "contain",
    tintColor: colors.Primary,
  },
  modalContainerAdd: {
    width: 350,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    borderRadius: 25,

  },
  modalContentAdd: {
    width: 350,
    height: 320,
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
