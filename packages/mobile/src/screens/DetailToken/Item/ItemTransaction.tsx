import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import moment from "moment";
import ModalTrasactionHistory from "../../../screens/TransactionHistory/Item/ModalTransactionHistory";
import { useEvm } from "@tonkeeper/shared/hooks";
import ModalNotification from "../../NotificationScreen/Item/ModalNotification"

const ItemTransaction = (props) => {
  const {
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
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const onClose = () => {
    setModalVisible(false);
  };

  const formatDatestamp = (timestamp: number): string => {
    return moment.unix(timestamp / 1000).format("DD MMM");
  };

  const formatTimestamp = (timestamp: number): string => {
    return moment.unix(timestamp / 1000).format("HH:mm");
  };

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
    <TouchableOpacity
      style={[styles.container, globalStyles.row]}
      onPress={() => setModalVisible(true)}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={styles.image}
          source={require("../../../assets/logo/logo_app.png")}
        />
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={styles.title}>
            {fromAddress === evm.addressWallet
              ? name
              : (name === 'Send Coin' ? 'Receive Coin' : 'Receive Token')
            }  
          </Text>
            <View style={styles.dot}></View>
            <Text style={styles.success}>Successful</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={styles.icon}
              source={require("../../../assets/icons/png/ic_clock.png")}
            />
            <Text style={styles.date}>{formatTimestamp(time)}</Text>
            <View style={[styles.dot, {backgroundColor: colors.Gray}]}></View>
            <Text style={styles.date}>
              {fromAddress === evm.addressWallet
                ? TruncateString({ string: toAddress, maxLength: 8 })
                : TruncateString({ string: fromAddress, maxLength: 8 })
              }
              </Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.price}>{amount + " " + symbol}</Text>
        <Text style={[styles.date, { textAlign: "right" }]}>
          {formatDatestamp(time)}
        </Text>
      </View>
      <View style={styles.dotRed}></View>
      {/* <ModalTrasactionHistory modalVisible={modalVisible} onClose={onClose} timeStamp={time}
        blockHash={'0xA0C6843CCC4F4219e3e5751D4F93dE17C303D658'}
        from={fromAddress}
        to={toAddress}
        value={"value"}
        isError={"true"}
        transactionIndex={"transactionIndex"}
        gasUsed={"gasUsed"}
        chainSymbol={symbol} /> */}
      <ModalNotification
        modalVisible={modalVisible}
        onClose={onClose}
        unSwap={unSwap}
        fromAddress={fromAddress}
        toAddress={toAddress}
        idxChain={idxChain}
        isRead={isRead}
        name={name}
        symbol={symbol}
        time={time}
        amount={amount}
      />
    </TouchableOpacity>
  );
};

export default ItemTransaction;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.White,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderBottomWidth: 0.2,
    borderColor: colors.Gray,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: "contain",
    marginRight: 10,
  },
  icon: {
    width: 12,
    height: 12,
    resizeMode: "contain",
    tintColor: colors.Gray,
    marginRight: 4,
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.Gray,
    fontFamily: "Poppins-Medium",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.Black,
    fontFamily: "Poppins-Bold",
  },
  success: {
    fontSize: 12,
    fontWeight: "500",
    color: colors.Green,
    fontFamily: "Poppins-Medium",
  },
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: colors.Primary,
    marginHorizontal: 6,
    marginBottom: 3,
  },
  price: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.Black,
    fontFamily: "Poppins-Bold",
  },
  dotRed: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.Red,
    position: "absolute",
    top: 10,
    right: 10,
    display: "none",
  },
});
