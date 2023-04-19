import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Button,
  TextInput,
} from "react-native";
import React from "react";
import styles from "../Style/Style";

const Import = ({ navigation }) => {
  // const [number, onChangeNumber] = React.useState("");

  return (
    <View>
      <TouchableOpacity style={styles.importGoBack} onPress={() => navigation.goBack()}>
        <Text style={styles.backButton}>
          <Image
            style={styles.backButtonimg}
            source={require("../../assets/img/icon.png")}
          />
        </Text>
      </TouchableOpacity>
      <View style={[styles.container, styles.containerImport]}>
        <View>
          <View style={[styles.Import, styles.importShawdow1]}>
            <Text style={styles.loginText}>Import</Text>
            <View style={styles.importbutton}>
              <TouchableOpacity style={{ marginRight: 30 }}>
                <Text style={styles.importTextButton}>Mnemonic </Text>
              </TouchableOpacity>
              <TouchableOpacity style={{ marginLeft: 30 }}>
                <Text style={styles.importTextButton}>Private Key</Text>
              </TouchableOpacity>
            </View>
            {/* Secret Recovery Phrase */}
            <View>
              <View style={styles.importText}>
                <Text style={styles.loginText1}>Secret Recovery Phrase</Text>
                <Text>Show</Text>
              </View>

              <TextInput
                style={[styles.importInput, styles.importShawdow]}
                placeholder="..."
              />
            </View>
            {/* Secret Recovery Phrase */}
            <View>
              <View style={styles.importText}>
                <Text style={styles.loginText1}>Secret Recovery Phrase</Text>
                <Text>Show</Text>
              </View>

              <TextInput
                style={[styles.importInput, styles.importShawdow]}
                // onChangeText={onChangeNumber}
                // value={number}
                placeholder="..."
                // keyboardType="numeric"
              />
            </View>
            {/*  Comfirm Password */}
            <View>
              <View style={styles.importText}>
                <Text style={styles.loginText1}>Comfirm Password</Text>
              </View>

              <TextInput
                style={[styles.importInput, styles.importShawdow]}
                // onChangeText={onChangeNumber}
                // value={number}
                placeholder="..."
                // keyboardType="numeric"
              />
            </View>
            <View>
              <Text style={styles.importTextBottom}>
                Must be at least 12 characters
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={[styles.importBottom, styles.importShawdow1]}>
          <Text style={styles.importBottomText}>Import</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Import;
