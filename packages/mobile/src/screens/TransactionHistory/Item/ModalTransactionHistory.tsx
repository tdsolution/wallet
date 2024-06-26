import {
  StyleSheet,
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
import { Text } from "@tonkeeper/uikit";
import { useEvm } from "@tonkeeper/shared/hooks";
import { formatUnits} from "ethers";
const { width, height } = Dimensions.get("window");

interface Props {
  modalVisible: boolean;
  onClose: () => void;
  blockNumber?: string;
  timeStamp?: string;
  hash?: string;
  nonce?: string;
  blockHash?: string;
  transactionIndex?: string;
  from?: string;
  to?: string;
  value?: string;
  gas?: string;
  gasPrice?: string;
  isError?: string;
  txReceiptStatus?: string;
  input?: string;
  contractAddress?: string;
  cumulativeGasUsed?: string;
  gasUsed?: string;
  confirmations?: string;
  methodId?: string;
  functionName?: string;
  chainSymbol: string;
}

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

const ModalTrasactionHistory = (props: Props) => {
  const {
    modalVisible,
    onClose,
    timeStamp,
    blockHash,
    from,
    to,
    value,
    gasPrice,
    isError,
    transactionIndex,
    gasUsed,
    chainSymbol,
  } = props;
  const evm = useEvm()?.evm;
  const truncatedFromString = TruncateString({ string: from, maxLength: 7 });
  const truncatedToString = TruncateString({ string: to, maxLength: 7 });
  const status = isError === "0" ? "Successful" : "Failed";
  const backgroundColorStatus = isError === "0" ? "#90D26D" : "#E72929";
  const divided = Number(value) / Math.pow(10, 18);
  const decimalNumber = Math.round(Number(divided)*1000000)/1000000;
  const dividedGasfee = formatUnits( gasUsed && gasPrice ? (Number(gasUsed) *  Number(gasPrice)) : 0, 18);
  const decimalNumberGasFee = Math.round(Number(dividedGasfee)*1000000)/1000000;
  // console.log(formatUnits( gasUsed && gasPrice ? (Number(gasUsed) *  Number(gasPrice)) : 0, 18));
  const totalAmount = Number(decimalNumber) + Number(decimalNumberGasFee);
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
                    transform:  from?.toLocaleLowerCase() === evm.addressWallet.toLocaleLowerCase() ? [{ rotate: "45deg" }] : [{ rotate: "225deg" }],
                  },
                ]}
                source={require("../../../assets/icons/png/ic-arrow-up-16.png")}
              />
            </TouchableOpacity>
            <Text
              type="h3"
              color="textPrimaryAlternate"
              style={{marginLeft:10}}
            >
              {from?.toLocaleLowerCase() === evm.addressWallet.toLocaleLowerCase() ?  'Send' : 'Receive'}
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
            <Text type="label1" color="textPrimaryAlternate">Status</Text>
            <View
              style={[
                styles.buttonStatus,
                { backgroundColor: backgroundColorStatus },
              ]}
            >
              <Text type="body2">{status}</Text>
            </View>
          </View>
          <View style={styles.line}></View>

          <View style={[styles.row, {marginBottom: 5}]}>
            <Text type="label1" color="textPrimaryAlternate">From</Text>
            <Text type="label1" color="textPrimaryAlternate"textAlign="right" >To</Text>
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
              {truncatedFromString}
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
              {truncatedToString}
            </View>
          </View>
          <View style={styles.line}></View>
          <View style={{ width: "100%" }}>
            <Text type="label1" color="textPrimaryAlternate" style={{marginBottom:5}}>NONCE</Text>
            <Text type="body2" color="textPrimaryAlternate">#{transactionIndex}</Text>
          </View>
          <View style={styles.line}></View>
          <View style={{ width: "100%" }}>
            <Text type="label1" color="textPrimaryAlternate">Payment</Text>
            <View style={styles.payment}>
              <View style={[styles.row]}>
                <Text type="label1" color="textPrimaryAlternate">Money amount</Text>
                <Text type="body2" color="textPrimaryAlternate">{decimalNumber} {chainSymbol}</Text>
              </View>
              <View style={[styles.row, { marginTop: 5 }]}>
                <Text type="label1" color="textPrimaryAlternate">Estiated gas fees</Text>
                <Text numberOfLines={2} type="body2" color="textPrimaryAlternate">
                  {decimalNumberGasFee} {chainSymbol}
                </Text>
              </View>
              <View
                style={[
                  styles.line,
                  { backgroundColor: colors.Primary, marginVertical: 20 },
                ]}
              ></View>
              <View style={styles.row}>
                <Text type="label1" color="textPrimaryAlternate">Total amount</Text>
                <Text numberOfLines={2} type="body2" color="textPrimaryAlternate">
                  {totalAmount} {chainSymbol}
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
    // width: 150,
    backgroundColor: "#90D26D",
    paddingHorizontal: 50,
    paddingVertical: 5,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
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
