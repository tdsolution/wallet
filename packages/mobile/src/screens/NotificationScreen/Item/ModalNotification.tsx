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
import { AnyActionPayload } from "$wallet/models/ActivityModel";
import { useEvm } from "@tonkeeper/shared/hooks";
const { width, height } = Dimensions.get("window");

interface Props {
  modalVisible: boolean;
  onClose: () => void;
  unSwap?: string;
  amount?: string;
  fromAddress?: string;
  toAddress?: string;
  idxChain?: string;
  isRead?: string;
  name?: string;
  symbol?: string;
  time?: string;
}

const ModalNotification = (props: Props) => {
  const {
    modalVisible,
    onClose,
    unSwap,
    amount,
    fromAddress,
    toAddress,
    idxChain,
    isRead,
    name,
    symbol,
    time,
  } = props;
  
  const evm = useEvm()?.evm;
  const [textInput, setTextInput] = useState("");
  // const heigthModal = Platform.OS === "ios" ? 470 : 530;
  const token = "0x0221144D770De4ca55D0a9B7306cA8BF7FB8B805";
  let date = new Date(Number(time));
  let options = { hour12: false, timeZone: "Asia/Ho_Chi_Minh" };
  let formatted_time = date
    .toLocaleString("en-GB", options)
    .replace(/\s?[ap]m/i, "");

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
              {fromAddress === evm.addressWallet
              ? <Image
                style={[
                  styles.iconCancel,
                  {
                    width: 30,
                    height: 30,
                    transform: [{ rotate: "45deg" }],
                  },
                ]}
                source={require("../../../assets/icons/png/ic-arrow-up-16.png")}
              />
              : <Image
                style={[
                styles.iconCancel,
                {
                  width: 30,
                  height: 30,
                  transform: [{ rotate: "45deg" }],
                },
              ]}
              source={require("../../../assets/icons/png/ic-arrow-down-16.png")}
            />
            }
            </TouchableOpacity>
            <Text
              style={[
                globalStyles.textHeader,
                { fontSize: 20, fontWeight: "bold", color: colors.Black },
              ]}
            >
              {fromAddress === evm.addressWallet
             ? name
             : (name === 'Send Coin' ? 'Receive Coin' : 'Receive Token')
             }
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
            <View>
              <Text style={styles.title}>Status</Text>
              <View style={styles.buttonStatus}>
                <Text style={styles.textStatus}>Successful</Text>
              </View>
            </View>
            <View>
              <Text style={[styles.title, { textAlign: "right" }]}>Time</Text>
              <Text
                style={[
                  styles.subtitle,
                  { fontSize: 12, flex: 1, marginTop: 10 },
                ]}
              >
                {/* 10/03/2024 9:30:03 */}
                {formatted_time}
              </Text>
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
              <Text style={styles.subtitle}>
                {TruncateString({ string: fromAddress, maxLength: 7 })}
              </Text>
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
              <Text style={styles.subtitle}>
                {TruncateString({ string: toAddress, maxLength: 7 })}
              </Text>
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={{ width: "100%" }}>
            <Text
              style={[
                styles.title,
                { textAlign: "center", marginTop: 10, marginBottom: 15 },
              ]}
            >
              Money amount
            </Text>
            <Text style={styles.amount}>
              {amount} <Text style={styles.currency}>{symbol}</Text>
            </Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ModalNotification;

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
    opacity: 0.5,
  },
  buttonStatus: {
    width: 150,
    backgroundColor: "#90D26D",
    padding: 5,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
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
  amount: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.Black,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
  },
  currency: {
    fontSize: 20,
    fontWeight: "500",
    color: colors.Black,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
  },
});
