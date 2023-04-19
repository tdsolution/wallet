import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import styles from "../Style/Style";

const Account = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.buttonBackTo}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButton}>
          <Image
            style={styles.backButtonimg}
            source={require("../../assets/img/icon.png")}
          />
        </Text>
      </TouchableOpacity>
      <Text style={styles.loginText}>Cụm Từ phục hồi ví của bạn.</Text>
      <Text style={styles.loginText1}>
        Nhấn vào các từ để đặt chúng cạnh nhau theo đúng thứ tự.
      </Text>
      <Text>Account</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Account;
