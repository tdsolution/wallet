import { globalStyles } from "$styles/globalStyles";
import { useNavigation } from "@tonkeeper/router";
import { colors } from "../../constants/colors";
import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
} from "react-native";

interface SimpleModalProps {
  visible: boolean;
  closeModal: () => void;
}

const ModalSwap: React.FC<SimpleModalProps> = ({ visible, closeModal }) => {
  function formatHexString(hexString: string) {
    const prefix = hexString.slice(0, 10); // Lấy các ký tự đầu tiên (bao gồm cả "0x" và 6 ký tự tiếp theo)
    const suffix = hexString.slice(-6); // Lấy 6 ký tự cuối cùng
    return prefix + "..." + suffix;
  }
const nav = useNavigation();

  const handleConfirm = () => {
    nav.navigate("SwapComplete");
    closeModal();
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}
    >
      <Pressable style={styles.modalContainer} onPress={closeModal}></Pressable>
      <View style={styles.innerContainer}>
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Text style={[globalStyles.textHeader, { fontWeight: "bold" }]}>
            Confirm your Transaction
          </Text>
          <Text style={styles.price}>-0.0 tBNB</Text>
          <Text style={styles.priceDolla}>= 0.0 $</Text>
        </View>
        <View style={styles.box}>
          <View style={styles.row}>
            <Text style={styles.text}>Asset</Text>
            <Text style={styles.text}>BNB Testnet (tBNB)</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>From</Text>
            <Text style={styles.text}>
              {formatHexString("0x033092817c6528AF62659a09A2AfBC0411a5Be65")}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>To</Text>
            <Text style={styles.text}>
              {formatHexString("0x033092817c6528AF62659a09A2AfBC0411a5Be65")}
            </Text>
          </View>
        </View>
        <View style={styles.box}>
          <View style={styles.row}>
            <Text style={styles.text}>Network fee</Text>
            <Text style={[styles.text]}>0.0005 tBNB</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.text}>Max total</Text>
            <Text style={styles.text}>0.0005 tBNB</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: 40,
          }}
        >
          <TouchableOpacity style={[styles.btnReject]} onPress={closeModal}>
            <Text style={styles.textReject}>Reject</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button]} onPress={handleConfirm}>
            <Text style={styles.textButton}>Confirm</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
    position: "relative",
  },
  innerContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#ccc",
    borderRadius: 5,
    alignSelf: "flex-end",
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  iconClose: {
    width: 24,
    height: 24,
    resizeMode: "contain",
    tintColor: colors.Primary,
    transform: [{ rotate: "-90deg" }],
  },
  price: {
    fontSize: 35,
    fontWeight: "bold",
    color: colors.Black,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
    marginTop: 20,
  },
  priceDolla: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.Gray_Light,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    marginTop: 5,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
    resizeMode: "contain",
    marginTop: 10,
  },
  caption: {
    fontSize: 14,
    fontWeight: "normal",
    color: colors.Gray_Light,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
  textCheckExplorer: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.Primary,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
  button: {
    width: "45%",
    height: 50,
    backgroundColor: "#4871EA",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.White,
    fontFamily: "Poppins-Medium",
  },
  textToken: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.Black,
    textAlign: "left",
    fontFamily: "Poppins-Medium",
  },
  textTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.Black,
    textAlign: "left",
    fontFamily: "Poppins-Bold",
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  box: {
    backgroundColor: "#eeeeee",
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    gap: 20,
    marginTop: 30,
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.Gray,
    fontFamily: "Poppins-Medium",
  },
  btnReject: {
    width: "45%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.Primary,
  },
  textReject: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.Primary,
    fontFamily: "Poppins-Medium",
  },
});

export default ModalSwap;
