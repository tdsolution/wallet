import { StyleSheet } from "react-native";
import { trendyColor, height, width } from "../../../assets/styles/common";

const StyleHearder = StyleSheet.create({
  container: {
    height: "auto",
    backgroundColor: trendyColor.primary,
    paddingHorizontal: width(3),
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: width(3),
    backgroundColor: "#e6e7ee",
    paddingVertical: height(1),
  },

  alertWrap: {
    backgroundColor: "#E6E7EE",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    lineHeight: 0,
  },

  alert: {
    resizeMode: "cover",
  },

  balanceNaddress: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },

  balance: {
    fontWeight: "700",
    fontSize: 24,
    color: "#8f9ff8",
  },
});
export default StyleHearder;
