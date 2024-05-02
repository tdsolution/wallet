import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import ModalNotification from "./ModalNotification";
import moment from "moment";
import SaveTransaction from "$libs/EVM/HistoryEVM/SaveTransaction";

const ItemNotification = (props) => {
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
    id
  } = props;

  const handlePressMarkAsRead = async () => {
    // Call the onPressMarkAsRead function when needed
    if (!isRead) {
      try {
        await SaveTransaction.markAsReadById(id);
      } catch (error) {
        console.error('Error marking transaction as read:', error);
      }
    }
    setModalVisible(true);
    console.log("TransactionID: " + id);
  };
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
  return (
    <TouchableOpacity
      style={[styles.container, globalStyles.row]}
      onPress={handlePressMarkAsRead}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Image
          style={styles.image}
          source={require("../../../assets/logo/logo_app.png")}
        />
        <View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.dot}></View>
            <Text style={styles.success}>Successful</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={styles.icon}
              source={require("../../../assets/icons/png/ic_clock.png")}
            />
            <Text style={styles.date}>{formatTimestamp(time)}</Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={styles.price}>{amount + " " + symbol}</Text>
        <Text style={[styles.date, { textAlign: "right" }]}>
          {formatDatestamp(time)}
        </Text>
      </View>
      <View
        style={[
          styles.dotRed,
          { backgroundColor: isRead ? colors.Gray_Light : colors.Primary },
        ]}
      ></View>
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

export default ItemNotification;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.White,
    paddingHorizontal: 10,
    paddingVertical: 20,
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
    marginHorizontal: 4,
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
    backgroundColor: colors.Primary,
    position: "absolute",
    top: 10,
    right: 10,
  },
});
