import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState } from "react";
import { colors } from "../../../constants/colors";
import ModalTrasactionHistory from "./ModalTransactionHistory";
import { TransactionModel } from "$libs/EVM/HistoryEVM/DataHistory";
import { format } from "date-fns";
import { formatCurrency, formatCurrencyNoCrc } from "$libs/EVM/useBalanceEVM";
import moment from "moment";

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
    return <Text>{string}</Text>;
  }
  return (
    <Text>{`${string.substring(0, maxLength)}...${string.substring(
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
  const decimalNumber = Number(divided).toFixed(9); // Làm tròn đến 3 chữ số thập phân
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
        marginBottom: 38,
        paddingHorizontal: 25,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={[styles.cicle, { backgroundColor: backgroundColor }]}>
          <Image style={styles.iconUpDown} source={imagePath} />
        </View>
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.title}>{isSend ? 'Send' : 'Receive'}</Text>
            <View style={styles.dot}></View>
            <Text style={styles.body}>{formatDatestamp(timeStamp ?? '')}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={styles.iconClock}
              source={require(`${image}/ic_clock.png`)}
            />
            <Text style={[styles.body, { color: colors.Gray_Light }]}>
              {formatTimestamp(timeStamp ?? '')}
            </Text>
            <View
              style={[styles.dot, { backgroundColor: colors.Gray_Light }]}
            ></View>
            <Text style={styles.body}>{truncatedString}</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={[styles.bodyRight, { color: colorsAmount }]}>
          {isSend ? '-' :'+'} {decimalNumber} {chainSymbol}
        </Text>
        <Text style={[styles.bodyRight, { color: colorsStatus }]}>
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
  title: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "left",
    lineHeight: 25,
    color: colors.Black,
    fontFamily: "Poppins-Bold",
  },
  body: {
    fontSize: 13,
    fontWeight: "500",
    textAlign: "left",
    lineHeight: 21,
    color: colors.Black,
    fontFamily: "Poppins-Medium",
  },
  iconClock: {
    width: 14,
    height: 14,
    borderRadius: 7,
    resizeMode: "contain",
    marginRight: 4,
  },
  iconUpDown: {
    width: 50,
    height: 50,
    resizeMode: "contain",
  },
  cicle: {
    width: 52,
    height: 52,
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
  bodyRight: {
    fontSize: 13,
    fontWeight: "500",
    textAlign: "right",
    lineHeight: 21,
    color: colors.Green,
    fontFamily: "Poppins-Medium",
  },
});
