import { Image, View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import styles from "../Style/Style";
import Checkbox from "expo-checkbox";

const BackupLogin = ({ navigation }) => {
  const [isChecked, setChecked] = useState(false);
  return (
    <View style={styles.Backuplogin}>
        <Text style={styles.BackupMagin}></Text>
        <TouchableOpacity
          style={styles.buttonBackTo}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backButton}>
            <Image style={styles.backButtonimg} source={require("../../assets/img/icon.png")}/>
          </Text>
        </TouchableOpacity>
      <View style={styles.container}>
        <Text style={styles.loginText}>Backup your wallet right now!</Text>
        <Text style={styles.loginText1}>
          In the next step, you will see 12 words allowing you to recover your
          wallet.
        </Text>
        <Image
          style={styles.backuplogin_img}
          source={require("../../assets/img/Frame21.png")}
        />
        <View style={styles.BackupText}>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "#4630EB" : undefined}
          />
          <Text>
            I understand that if I lose the recovery phrase, I won't be able to
            access my wallet.
          </Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate("RandumText")}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BackupLogin;
