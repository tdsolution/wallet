import { Image, StyleSheet,TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import ModalNotification from "./ModalNotification";
import moment from "moment";
import SaveTransaction from "$libs/EVM/HistoryEVM/SaveTransaction";
import { useEvm } from "@tonkeeper/shared/hooks";
import { Text } from "@tonkeeper/uikit";

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
  
  const evm = useEvm()?.evm;
  
  const TruncateString = ({ string, maxLength }) => {
    if (string.length <= maxLength) {
      return <Text type="body3" style={{color: colors.Gray}}>{string}</Text>;
    }
    return (
      <Text type="body3" style={{color: colors.Gray}}>{`${string.substring(0, maxLength)}...${string.substring(
        string.length - 5
      )}`}</Text>
    );
  };

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
          <Text type="label1" color="textPrimaryAlternate" style={{marginTop: -3}}>
            {fromAddress === evm.addressWallet
              ? name
              : (name === 'Send Coin' ? 'Receive Coin' : 'Receive Token')
            }  
          </Text>
            <View style={styles.dot}></View>
            <Text type="body3" style={{color: colors.Green}}>Successful</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", marginTop: 5}}>
            <Image
              style={styles.icon}
              source={require("../../../assets/icons/png/ic_clock.png")}
            />
            <Text type="body3" style={{color: colors.Gray}}>{formatTimestamp(time)}</Text>
            <View style={[styles.dot, {backgroundColor: colors.Gray}]}></View>
              {fromAddress === evm.addressWallet
                ? TruncateString({ string: toAddress, maxLength: 8 })
                : TruncateString({ string: fromAddress, maxLength: 8 })
              }
          </View>
        </View>
      </View>
      <View>
        <Text type="body3" color="textPrimaryAlternate">{amount + " " + symbol}</Text>
        <Text type="body3" textAlign= "right" style={ {color: colors.Gray_Light, marginTop:5}}>
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
    borderBottomWidth: 0.3,
    borderColor: "#DDDDDD",
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
  dot: {
    width: 5,
    height: 5,
    borderRadius: 5,
    backgroundColor: colors.Primary,
    marginHorizontal: 6,
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
