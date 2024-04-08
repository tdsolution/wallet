import { StyleSheet, Text, TextInput, View, Image } from "react-native";
import React from "react";
import { colors } from "../../../constants/colors";

interface Props {
  lable: string;
  placeholder: string;
  icon?: boolean;
  type?: string;
}

const InputItem = (props: Props) => {
  const { lable, placeholder, type, icon } = props;
  let keyboardType = type ? type : "default";
  return (
    <View style={styles.container}>
      <Text style={styles.lable}>{lable}</Text>
      <View>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          keyboardType={keyboardType}
        />
        {icon ? (
          <Image
            source={require("../../../assets/icons/png/ic-pencil-16.png")}
            style={styles.iconInput}
          />
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};

export default InputItem;

const styles = StyleSheet.create({
  container: {
    marginBottom: 35,
  },
  input: {
    height: 57,
    backgroundColor: colors.White,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    fontWeight: "500",
    color: colors.Black,
    lineHeight: 20,
    textAlign: "left",
    fontFamily: "Poppins-Light",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.Gray_Light,
    paddingRight: 50,
  },
  textInput: {},
  lable: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.Black,
    lineHeight: 20,
    textAlign: "left",
    fontFamily: "Poppins-Bold",
    marginBottom: 5,
  },
  iconInput: {
    width: 20,
    height: 20,
    tintColor: colors.Gray_Light,
    resizeMode: "contain",
    position: "absolute",
    right: 15,
    top: 20,
  },
});
