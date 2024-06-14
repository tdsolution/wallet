import {
  StyleSheet,
  View,
  Modal,
  Pressable,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../../constants/colors";
import { useEvm } from "@tonkeeper/shared/hooks";
import { Text } from "@tonkeeper/uikit";

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
        return <Text type="body2" color="textPrimaryAlternate">{string}</Text>;
      }
      return (
        <Text type="body2" color="textPrimaryAlternate">{`${string.substring(0, maxLength)}...${string.substring(
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
              type="h3"
              color="textPrimaryAlternate"
              style={{marginLeft:10}}
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
              <Text type="label1" color="textPrimaryAlternate">Status</Text>
              <View style={styles.buttonStatus}>
                <Text type="body2">Successful</Text>
              </View>
            </View>
            <View>
              <Text type="label1" color="textPrimaryAlternate" textAlign="right">Time</Text>
              <Text
              type="body3"
              color="textPrimaryAlternate"
                style={[
                  { flex: 1, marginTop: 10 },
                ]}
              >
                {/* 10/03/2024 9:30:03 */}
                {formatted_time}
              </Text>
            </View>
          </View>
          <View style={styles.line}></View>

          <View style={styles.row}>
            <Text type="label1" color="textPrimaryAlternate">From</Text>
            <Text type="label1" color="textPrimaryAlternate">To</Text>
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
                {TruncateString({ string: fromAddress, maxLength: 7 })}
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
                {TruncateString({ string: toAddress, maxLength: 7 })}
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={{ width: "100%" }}>
            <Text
            type="label1" color="textPrimaryAlternate"
            textAlign="center"
            >
              Money amount
            </Text>
            <Text type="h2" color="textPrimaryAlternate" textAlign="center">
              {amount} <Text type="label2" color="textPrimaryAlternate" fontSize={20}>{symbol}</Text>
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
  row: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
});
