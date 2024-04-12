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

const TruncateString = ({ string, maxLength }) => {
  if (string.length <= maxLength) {
    return <Text>{string}</Text>;
  }
  return (
    <Text>{`${string.substring(0, maxLength)}...${string.substring(
      string.length - 5
    )}`}</Text>
  );
};

const ModalTrasactionHistory = (props: Props) => {
  const { modalVisible, onClose } = props;
  const [textInput, setTextInput] = useState("");
  // const heigthModal = Platform.OS === "ios" ? 470 : 530;
  const token = "0x0221144D770De4ca55D0a9B7306cA8BF7FB8B805";
  const truncatedString = TruncateString({ string: token, maxLength: 7 });

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
          // { left: (width - 350) / 2, top: (height - heigthModal) / 2 },
        ]}
      >
        <View style={[styles.modalContentAdd]}>
          <View
            style={{
              width: "100%",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <TouchableOpacity onPress={onClose}>
              <Image
                style={[
                  styles.iconCancel,
                  {
                    tintColor: colors.Primary,
                    width: 30,
                    height: 30,
                    transform: [{ rotate: "45deg" }],
                  },
                ]}
                source={require("../../../assets/icons/png/ic-arrow-up-16.png")}
              />
            </TouchableOpacity>
            <Text
              style={[
                globalStyles.textHeader,
                { fontSize: 20, fontWeight: "bold", color: colors.Black },
              ]}
            >
              Send Coin
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

          <View style={[styles.row, { marginTop: 20 }]}>
            <Text style={styles.title}>Status</Text>
            <View style={styles.buttonStatus}>
              <Text style={styles.textStatus}>Successful</Text>
            </View>
          </View>
          <View style={styles.line}></View>

          <View style={styles.row}>
            <Text style={styles.title}>From</Text>
            <Text style={styles.title}>To</Text>
          </View>
          <View style={styles.row}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={[
                  styles.iconCancel,
                  { tintColor: colors.Black, width: 30, height: 30 },
                ]}
                source={require("../../../assets/icons/png/ic-globe-56.png")}
              />
              <Text style={styles.subtitle}>{truncatedString}</Text>
            </View>
            <Image
              style={[
                styles.iconCancel,
                {
                  tintColor: colors.Gray_Light,
                  width: 30,
                  height: 30,
                  transform: [{ rotate: "90deg" }],
                },
              ]}
              source={require("../../../assets/icons/png/ic-arrow-up-28.png")}
            />
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={[
                  styles.iconCancel,
                  { tintColor: colors.Black, width: 30, height: 30 },
                ]}
                source={require("../../../assets/icons/png/ic-globe-56.png")}
              />
              <Text style={styles.subtitle}>{truncatedString}</Text>
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={{ width: "100%" }}>
            <Text style={styles.title}>NONCE</Text>
            <Text style={styles.subtitle}>#98</Text>
          </View>
          <View style={styles.line}></View>
          <View style={{ width: "100%" }}>
            <Text style={styles.title}>Payment</Text>
            <View style={styles.payment}>
              <View style={[styles.row]}>
                <Text style={styles.title}>Money amount</Text>
                <Text style={styles.subtitle}>0.71234 MATIC</Text>
              </View>
              <View style={[styles.row, { marginTop: 5 }]}>
                <Text style={styles.title}>Estiated gas fees</Text>
                <Text numberOfLines={2} style={styles.subtitle}>
                  0.712344366724356
                </Text>
              </View>
              <View
                style={[
                  styles.line,
                  { backgroundColor: colors.Primary, marginVertical: 20 },
                ]}
              ></View>
              <View style={styles.row}>
                <Text style={styles.title}>Total amount</Text>
                <Text numberOfLines={2} style={styles.subtitle}>
                  0.71234639469396334523
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalTrasactionHistory;

const styles = StyleSheet.create({
  iconCancel: {
    width: 45,
    height: 45,
    resizeMode: "contain",
    tintColor: colors.Primary,
  },
  modalContainerAdd: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContentAdd: {
    width: 380,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 25,
    alignItems: "center",
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
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.Black,
    textAlign: "left",
    fontFamily: "Poppins-Bold",
  },
  subtitle: {
    maxWidth: 120,
    fontSize: 14,
    fontWeight: "500",
    color: colors.Black,
    textAlign: "left",
    fontFamily: "Poppins-Medium",
  },
  line: {
    width: "100%",
    height: 1,
    borderColor: colors.Gray,
    borderBottomWidth: 0.2,
    marginVertical: 10,
    opacity: 0.5
  },
  buttonStatus: {
    width: 150,
    backgroundColor: "#90D26D",
    padding: 5,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  textStatus: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.White,
    textAlign: "left",
    fontFamily: "Poppins-Medium",
  },
  payment: {
    backgroundColor: colors.White,
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.Primary,
    marginTop: 10,
  },
});
