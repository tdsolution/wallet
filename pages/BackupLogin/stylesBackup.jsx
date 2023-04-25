import { StyleSheet } from "react-native";
import {trendyColor, height, width} from '../../assets/styles/common';

const styleBackup = StyleSheet.create({
  textShadow: {
    textShadowColor: "rgba(38, 43, 70, 0.32)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
  },

  container: {
    paddingTop: height(1),
    paddingHorizontal: width(3),
  },

  backBtn: {
    width: 41,
    height: 41,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },

  buttonBack: {
    padding: 4,
  },

  image: {
    resizeMode: "stretch",
  },

  content: {
    paddingTop: height(4),
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontWeight: "700",
    textAlign: "center",
    fontSize: 24,
    lineHeight: 29,
    color: trendyColor.blueColor,
    marginBottom: 8,
  },

  body: {
    color: trendyColor.textColor,
    fontWeight: 500,
    fontSize: 14,
    lineHeight: 20,
    width: width(70),
    textAlign: "center",
  },

  button: {
    width: "100%",
    paddingVertical: 5,
    fontSize: 18,
    fontWeight: 500,
    opacity: 0.95,
    textAlign: "center",
    color: trendyColor.textColor,
  },

  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 10,
  },

  footer: {
    paddingHorizontal: width(3),
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 35,
  },
});
export default styleBackup;
