import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import ButtonToBack from "../../commponents/ButtonToBack/ButtonToBack";
import ExternalShadow from "../../commponents/BoxShadow/ExternalShadow";
import stylesImport from "./stylesImport";
import InternalShadow from "../../commponents/BoxShadow/InternalShadow";

export default function ImportScreen({ navigation }) {
  // Điều kiện đê Show PassWord
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  // Name Text METHOD
  const METHOD = {
    MNEM: "mnemonic",
    PRIVATE: "private key",
  };
  const [method, setMethod] = useState(METHOD.MNEM);

  return (
    <>
      <SafeAreaView style={{ margin: 10, marginBottom: 30 }}>
        <View>
          <ButtonToBack navigation={navigation} />

          <ExternalShadow style={{ marginTop: 50 }}>
            <Text style={[stylesImport.title, (style = { marginTop: 20 })]}>
              Import
            </Text>
            {/* Button Mnemonic and Button Private Key */}
            {/* ====================================== */}
            <View
              style={[
                stylesImport.buttonSwitchWrap,
                (style = { marginTop: 20 }),
              ]}
            >
              <ButtonAction
                isActive={METHOD.MNEM === method}
                name={METHOD.MNEM}
                onPress={() => setMethod(METHOD.MNEM)}
              />
              <ButtonAction
                isActive={METHOD.PRIVATE === method}
                name={METHOD.PRIVATE}
                onPress={() => setMethod(METHOD.PRIVATE)}
              />
            </View>
            {/* Import Text Secret Recovery Phrase */}
            {/* ====================================== */}
            <View style={{ marginTop: 50 }}>
              <Text
                style={{ ...stylesImport.labelWrap, ...stylesImport.label }}
              >
                {method === METHOD.MNEM
                  ? "Your recovery phrase"
                  : "Your private key"}
              </Text>
              <InternalShadow style={stylesImport.innerShadow}>
                <TextInput style={stylesImport.textInput} placeholder="..." />
              </InternalShadow>
            </View>
            {/* Import Text Secret Recovery Phrase */}
            {/* ====================================== */}
            <View style={{ marginTop: 50 }}>
              <Text
                style={{ ...stylesImport.labelWrap, ...stylesImport.label }}
              >
                {method === METHOD.MNEM
                  ? "Your recovery phrase"
                  : "Your private key"}
              </Text>
              <InternalShadow style={stylesImport.innerShadow}>
                <TextInput style={stylesImport.textInput} placeholder="..." />
              </InternalShadow>
            </View>
            {/* Import Confirm Password */}
            {/* ======================== */}
            <View style={{ marginTop: 50 }}>
              <View style={{flexDirection:'row',justifyContent: 'space-between'}}>
                <Text
                  style={{ ...stylesImport.labelWrap, ...stylesImport.label }}
                >
                  Confirm Password
                </Text>
                <Text onPress={() => setSecureTextEntry(!secureTextEntry)}>
                  {secureTextEntry ? "Show" : "Hide"}
                </Text>
              </View>
              <InternalShadow style={stylesImport.innerShadow}>
                <TextInput
                  secureTextEntry={secureTextEntry}
                  style={stylesImport.textInput}
                  placeholder="..."
                />
              </InternalShadow>
            </View>
          </ExternalShadow>
        </View>
      </SafeAreaView>
      <ExternalShadow>
        <Pressable>
          <Text style={stylesImport.button}>Import</Text>
        </Pressable>
      </ExternalShadow>
    </>
  );
}
const ButtonAction = ({ name, isActive, onPress }) => {
  if (isActive)
    return (
      <InternalShadow style={stylesImport.buttonSwitch}>
        <View>
          <Text style={[stylesImport.text, { textTransform: "capitalize" }]}>
            {name}
          </Text>
        </View>
      </InternalShadow>
    );
  return (
    <ExternalShadow style={stylesImport.buttonSwitch}>
      <Pressable onPress={onPress}>
        <Text style={[stylesImport.text, { textTransform: "capitalize" }]}>
          {name}
        </Text>
      </Pressable>
    </ExternalShadow>
  );
};
