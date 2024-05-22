import {
  StyleSheet,
  Text,
  View,
  Modal,
  Pressable,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import { colors } from "../../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import { setWalletEVM } from "$libs/EVM/createWallet";
import { useEvm } from "@tonkeeper/shared/hooks";
import { navigation } from "@tonkeeper/router";

interface Props {
modalVisible: boolean;
onClose: () => void;
item: any;
}

const ModalSetMainAccount = (props: Props) => {
  const {modalVisible, onClose, item} = props;
  const {evm, setEvm} = useEvm();
  console.log('>>>>>>>>>Item: ', item);

  const handleSetEVM = () => {
    setWalletEVM(item);
    setEvm(item);
    navigation.goBack();
  }

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
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text style={[globalStyles.textHeader, { fontSize: 20, marginTop: 10, marginLeft: 8 }]}>
              Connect Wallet
            </Text>
            <Image
                source={require("../../../assets/logo/img_connect_wallet.png")}
                style={styles.image}
              />
          </View>
          
          <View style={{flexDirection: "row", justifyContent: "space-around", alignItems: "center", width: "90%"}}>
          <TouchableOpacity style={[styles.button, {borderColor: "#f54949"}]} onPress={onClose}>
              <Text style={[styles.textButton, {color: "#f54949"}]}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, {borderColor: colors.Primary}]} onPress={handleSetEVM}>
              <Text style={[styles.textButton, {color: colors.Primary}]}>Agree</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
  };

  export default ModalSetMainAccount;

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
    backgroundColor: "rgba(0,0,0,0.6)", // Màu nền của modal
  },
  modalContent: {
    width: 350,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 25,
    alignItems: "center",
  },
  privateKey: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.Black,
    textAlign: "left",
    fontFamily: "Poppins-Medium",
  },
  textButton: {
    fontSize: 13,
    fontWeight: "500",
    //color: colors.White,
    fontFamily: "Poppins-Medium",
    marginTop: 1,
  },
  button: {
    width: "30%",
    height: 40,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    borderWidth: 1,
  },
  image: {
    width: 140,
    height: 136,
    resizeMode: "contain",
    marginVertical: 15,
  },
});
