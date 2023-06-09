import React from "react";
import {
  Text,
  TouchableOpacity,
  View
} from "react-native";
import ExternalShadow from "../../commponents/BoxShadow/ExternalShadow";
import MyCarousel from "../Mycarousel/Mycarousel";
import styles from "./styles";

const Login = ({ navigation }) => {
  return (
    <>
      <View style={styles.container}>
        <MyCarousel />
        <View style={styles.footer}>
          <ExternalShadow>
            <TouchableOpacity onPress={() => navigation.navigate("Backup")}>
                <Text style={styles.button}>Create a new wallet</Text>
            </TouchableOpacity>
          </ExternalShadow>
          <TouchableOpacity
            onPress={() => navigation.navigate("Import")}
            style={{
              marginTop: 25,
            }}
          >
            <Text style={styles.button}>I have wallet</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default Login;
