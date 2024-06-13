import { StyleSheet, View, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { colors } from "../../../constants/colors";
import ModalTrasactionHistory from "./ModalTransactionHistory";
import { TransactionModel } from "$libs/EVM/HistoryEVM/DataHistory";
import { format } from "date-fns";
import { formatCurrency, formatCurrencyNoCrc } from "$libs/EVM/useBalanceEVM";
import moment from "moment";
import { Text } from "@tonkeeper/uikit";

interface Props {
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
  isSend: boolean;
}

const TruncateString = ({ string, maxLength }) => {
  if (string.length <= maxLength) {
    return <Text type="body2" color="textGray">{string}</Text>;
  }
  return (
    <Text type="body2" color="textGray">{`${string.substring(0, maxLength)}...${string.substring(
      string.length - 5
    )}`}</Text>
  );
};

const ItemTransactionHistory = (props: Props) => {
  const {
    timeStamp,
    blockHash,
    from,
    to,
    value,
    isError,
    transactionIndex,
    gasUsed,
    chainSymbol,
    isSend,
  } = props;
  const image = "../../../assets/icons/png/";
  let colorsAmount = isSend  ? colors.Red : colors.Green;
  let colorsStatus = isError === "0" ? colors.Green : colors.Red;
  let imagePath =
   isSend
      ? require(`../../../assets/icons/png/ic_prime_arrow_up.png`)
      : require(`../../../assets/icons/png/ic_prime_arrow_down.png`);
  let backgroundColor = isSend ? colors.Primary : colors.White;
  const truncatedString = TruncateString({ string: isSend  ? from : to, maxLength: 5 });
  const status = isError === "0" ? "Successful" : "Failed";
  const divided = Number(value) / Math.pow(10, 18);
  const decimalNumber = Number(divided).toFixed(4); // Làm tròn đến 4 chữ số thập phân
  const formatDatestamp = (timestamp: string): string => {
    return moment.unix(parseInt(timestamp)).format("DD MMM");
};

const formatTimestamp = (timestamp: string): string => {
    return moment.unix(parseInt(timestamp)).format("HH:mm");
};
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const onClose = () => {
    setModalVisible(false);
  };

  return (
    <Pressable
      onPress={() => setModalVisible(true)}
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingBottom: 15,
        paddingHorizontal: 25,
        marginBottom: 15,
        borderBottomWidth: 0.2,
        borderColor: "#D0D0D0"
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={[styles.cicle, { backgroundColor: backgroundColor }]}>
          <Image style={styles.iconUpDown} source={imagePath} />
        </View>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text type="label1" color="textPrimaryAlternate">{isSend ? 'Send' : 'Receive'}</Text>
            <View style={styles.dot}></View>
            <Text type="body3" color="textPrimaryAlternate">{formatDatestamp(timeStamp ?? '')}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop:4}}>
            <Image
              style={styles.iconClock}
              source={require(`${image}/ic_clock.png`)}
            />
            <Text type="body3" style={{ color: colors.Gray_Light }}>
              {formatTimestamp(timeStamp ?? '')}
            </Text>
            <View
              style={[styles.dot, { backgroundColor: colors.Gray_Light }]}
            ></View>
         {truncatedString}
          </View>
        </View>
      </View>
      <View style={{marginTop: -3}}>
        <Text type="body2" textAlign="right" style={{ color: colorsAmount }}>
          {isSend ? '-' :'+'} {decimalNumber} {chainSymbol}
        </Text>
        <Text type="body3" textAlign="right" style={{ color: colorsStatus, marginTop:5}}>
          {status}
        </Text>
      </View>
      <ModalTrasactionHistory
        modalVisible={modalVisible}
        onClose={onClose}
        timeStamp={timeStamp}
        blockHash={blockHash}
        from={from}
        to={to}
        value={value}
        isError={isError}
        transactionIndex={transactionIndex}
        gasUsed={gasUsed}
        chainSymbol={chainSymbol}
      />
    </Pressable>
  );
};

export default ItemTransactionHistory;

const styles = StyleSheet.create({
  dot: {
    width: 5,
    height: 5,
    borderRadius: 2.5,
    backgroundColor: colors.Primary,
    marginHorizontal: 10,
  },
  iconClock: {
    width: 14,
    height: 14,
    borderRadius: 7,
    resizeMode: "contain",
    marginRight: 4,
  },
  iconUpDown: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },
  cicle: {
    width: 50,
    height: 50,
    borderRadius: 26,
    backgroundColor: colors.Primary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    marginRight: 12,
  },
});
