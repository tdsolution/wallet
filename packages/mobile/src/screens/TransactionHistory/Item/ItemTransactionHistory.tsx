import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { colors } from "../../../constants/colors";

interface Props {
  isUp: boolean;
  title?: string;
  time?: string;
  date?: string;
  amount?: string;
  privateKey?: string;
}

const ItemTransactionHistory = (props: Props) => {
  const { isUp, title, time, date, amount, privateKey } = props;
  const image = "../../../assets/icons/png/";
  let colorsAmount = !isUp ? colors.Green : colors.Red;
  let imagePath = isUp
    ? require(`../../../assets/icons/png/ic_prime_arrow_up.png`)
    : require(`../../../assets/icons/png/ic_prime_arrow_down.png`);
  let backgroundColor = !isUp ? colors.White : colors.Primary;
  return (
    <View
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
            <Text style={styles.title}>{title ? title : "Receive"}</Text>
            <View style={styles.dot}></View>
            <Text style={styles.body}>{date ? date : "23 Dec"}</Text>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              style={styles.iconClock}
              source={require(`${image}/ic_clock.png`)}
            />
            <Text style={[styles.body, { color: colors.Gray_Light }]}>
              {time ? time : "17:37"}
            </Text>
            <View
              style={[styles.dot, { backgroundColor: colors.Gray_Light }]}
            ></View>
            <Text style={styles.body}>
              {privateKey ? privateKey : "0x342...75643"}
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Text style={[styles.bodyRight, { color: colorsAmount }]}>
          {amount ? amount : "+0.000400 BNB"}
        </Text>
        <Text style={[styles.bodyRight]}>Successful</Text>
      </View>
    </View>
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
    fontSize: 17,
    fontWeight: "600",
    textAlign: "left",
    lineHeight: 25,
    color: colors.Black,
    fontFamily: "Poppins-Bold",
  },
  body: {
    fontSize: 14,
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
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
    marginRight: 12,
  },
  bodyRight: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "right",
    lineHeight: 21,
    color: colors.Green,
    fontFamily: "Poppins-Medium",
  },
});
