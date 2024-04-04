import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React from "react";
import Container from "../../components/Container";
import HeaderBar from "../../components/HeaderBar";
import { colors } from "../../constants/colors";
import ItemTransactionHistory from "./Item/ItemTransactionHistory";

const TransactionHistory = () => {
  return (
    <Container>
      <HeaderBar title={"Transactions"} />
      <View style={{ paddingHorizontal: 25 }}>
        <Text style={styles.title}>
          Summary of transactions in your wallet, click to see their details
          including fees,...
        </Text>
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>Download</Text>
          </TouchableOpacity>
        </View>

        {/* <ItemTransactionHistory isUp={false} />
        <ItemTransactionHistory
          isUp={false}
          title="Send"
          date="18 Dec"
          time="11:27"
          privateKey="0x832...45667"
          amount="-0.000200 BNB"
        />
        <ItemTransactionHistory
          isUp={true}
          title="Send"
          date="18 Dec"
          time="11:27"
          privateKey="0x012...8b667"
          amount="-0.000200 BNB"
        />
        <ItemTransactionHistory
          isUp={true}
          title="Send"
          date="18 Dec"
          time="11:27"
          privateKey="0x342...75643"
          amount="-0.000200 BNB"
        />
        <ItemTransactionHistory isUp={false} />
        <ItemTransactionHistory
          isUp={true}
          title="Send"
          date="18 Dec"
          time="11:27"
          privateKey="0x832...45667"
          amount="-0.000200 BNB"
        />
        <ItemTransactionHistory
          isUp={true}
          title="Send"
          date="18 Dec"
          time="11:27"
          privateKey="0x832...45667"
          amount="-0.000200 BNB"
        /> */}
      </View>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <ItemTransactionHistory
            title={item.title}
            time={item.time}
            amount={item.amount}
            privateKey={item.privateKey}
            date={item.date}
            isUp={item.isUp}
          />
        )}
        keyExtractor={(item) => item.privateKey.toString()}
        // ListFooterComponent={<View style={{ height: 150 }} />}
        ListHeaderComponent={<View style={{ height: 5 }} />}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "left",
    lineHeight: 22,
    color: colors.Gray,
    marginTop: 5,
  },
  button: {
    width: 110,
    height: 34,
    backgroundColor: colors.Primary,
    borderRadius: 6,
    paddingHorizontal: 19,
    // paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 7,
    marginBottom: 27,
  },
  textButton: {
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 22,
    color: colors.White,
  },
});

export default TransactionHistory;

const data = [
  {
    title: "Receive",
    date: "18 Dec",
    time: "17:37",
    privateKey: "0x832...45667",
    amount: "+0.000400 BNB",
    isUp: false,
  },
  {
    title: "Receive",
    date: "18 Dec",
    time: "11:27",
    privateKey: "0x342...75643",
    amount: "+0.000400 BNB",
    isUp: false,
  },
  {
    title: "Receive",
    date: "18 Dec",
    time: "11:27",
    privateKey: "0x012...8b667",
    amount: "-0.000500 BNB",
    isUp: true,
  },
  {
    title: "Receive",
    date: "18 Dec",
    time: "11:27",
    privateKey: "0x342...75644",
    amount: "+0.000400 BNB",
    isUp: false,
  },
  {
    title: "Receive",
    date: "18 Dec",
    time: "11:27",
    privateKey: "0x342...75647",
    amount: "+0.000400 BNB",
    isUp: false,
  },
  {
    title: "Receive",
    date: "18 Dec",
    time: "11:27",
    privateKey: "0x012...8b367",
    amount: "-0.000500 BNB",
    isUp: true,
  },
];
