import { colors } from "../constants/colors";
import { StyleSheet } from "react-native";

export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.White,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 25,
    paddingVertical: 10,
  },
  textHeader: {
    fontSize: 21,
    fontWeight: "600",
    color: colors.Primary,
    lineHeight: 30,
    textAlign: "left",
    fontFamily: "Poppins-Bold",
    marginLeft: 24,
  },
  iconHeader: {
    width: 30,
    height: 30,
    resizeMode: "contain",
    display: "none",
  },
  iconBack: {
    width: 14,
    height: 14,
    resizeMode: "contain",
  },
});
