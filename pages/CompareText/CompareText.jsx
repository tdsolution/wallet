import { View, Text, SafeAreaView, Pressable } from "react-native";
import React from "react";
import ButtonToBack from "../../commponents/ButtonToBack/ButtonToBack";
import StylesCom from "./StyleCompare";
import InternalShadow from "../../commponents/BoxShadow/InternalShadow";
import ExternalShadow from "../../commponents/BoxShadow/ExternalShadow";

const CompareText = ({ navigation }) => {
  return (
    <>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: "#e6e7ee",
        }}
      >
        {/* Button To Back */}
        {/* ============== */}
        <ButtonToBack navigation={navigation} />
        <View style={StylesCom.content}>
          <Text style={StylesCom.title}>Your wallet recovery phrase</Text>
          <Text
            style={[
              StylesCom.body,
              StylesCom.textShadow,
              {
                width: "80%",
              },
            ]}
          >
            Tap the words to put them side by side in the correct order
          </Text>
          {/* Hiển thị các kí tự đã được copy */}
          <View style={StylesCom.areaContainer}>
            <InternalShadow>
              <View
                style={[
                  StylesCom.area,
                  {
                    height: "100%",
                    width: "100%",
                    backgroundColor: "#f0f0f0",
                  },
                ]}
              >
                <ExternalShadow>
                  <Pressable>
                    <Text style={StylesCom.buttonCheck}>nfvjfnvjf</Text>
                  </Pressable>
                </ExternalShadow>
                <ExternalShadow>
                  <Pressable>
                    <Text style={StylesCom.buttonCheck}>nfvjfnvjf</Text>
                  </Pressable>
                </ExternalShadow>
                <ExternalShadow>
                  <Pressable>
                    <Text style={StylesCom.buttonCheck}>nfvjfnvjf</Text>
                  </Pressable>
                </ExternalShadow>
                <ExternalShadow>
                  <Pressable>
                    <Text style={StylesCom.buttonCheck}>nfvjfnvjf</Text>
                  </Pressable>
                </ExternalShadow>
                <ExternalShadow>
                  <Pressable>
                    <Text style={StylesCom.buttonCheck}>nfvjfnvjf</Text>
                  </Pressable>
                </ExternalShadow>
                <ExternalShadow>
                  <Pressable>
                    <Text style={StylesCom.buttonCheck}>nfvjfnvjf</Text>
                  </Pressable>
                </ExternalShadow>
              </View>
              {/* Hiển thị kí tự ngẫu nhiên */}
              <View style={StylesCom.area}>
                <ExternalShadow>
                  <Pressable>
                    <Text style={StylesCom.buttonCheck}>nfvjfnvjf</Text>
                  </Pressable>
                </ExternalShadow>
                <ExternalShadow>
                  <Pressable>
                    <Text style={StylesCom.buttonCheck}>nfvjfnvjf</Text>
                  </Pressable>
                </ExternalShadow>
                <ExternalShadow>
                  <Pressable>
                    <Text style={StylesCom.buttonCheck}>nfvjfnvjf</Text>
                  </Pressable>
                </ExternalShadow>
                <ExternalShadow>
                  <Pressable>
                    <Text style={StylesCom.buttonCheck}>nfvjfnvjf</Text>
                  </Pressable>
                </ExternalShadow>
                <ExternalShadow>
                  <Pressable>
                    <Text style={StylesCom.buttonCheck}>nfvjfnvjf</Text>
                  </Pressable>
                </ExternalShadow>
                <ExternalShadow>
                  <Pressable>
                    <Text style={StylesCom.buttonCheck}>nfvjfnvjf</Text>
                  </Pressable>
                </ExternalShadow>
              </View>
            </InternalShadow>
          </View>
        </View>
        {/* Button Next */}
        <View style={StylesCom.footer}>
          <ExternalShadow>
            <Pressable onPress={() => navigation.navigate("Compare")}>
              <Text style={StylesCom.button}>Next</Text>
            </Pressable>
          </ExternalShadow>
        </View>
      </SafeAreaView>
    </>
  );
};

export default CompareText;
