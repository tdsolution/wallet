import React from "react";
import { Image, Pressable, SafeAreaView, Text, TouchableOpacity, View } from "react-native";
import ButtonToBack from "../../commponents/ButtonToBack/ButtonToBack";
import StyleRes from "./StylesRestore";
import InternalShadow from "../../commponents/BoxShadow/InternalShadow";
import images from "../../assets/images";
import ExternalShadow from "../../commponents/BoxShadow/ExternalShadow";


const RestoreLogin = ({ navigation }) => {
  
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
        {/* Text */}
        {/* ==== */}
        <Text style={StyleRes.title}>Your wallet recovery phrase</Text>
        <Text style={StyleRes.text}>
          Write down or copy these words in the correct order and save them in a
          safe place.
        </Text>
        {/* Random Text */}
        {/* ========== */}
        <View style={StyleRes.allPhrases}>
          <InternalShadow style={StyleRes.innerShadow}>
            <View>
              <Text style={StyleRes.text}>Àvhfnvjhfnvj</Text>
            </View>
          </InternalShadow>
          <InternalShadow style={StyleRes.innerShadow}>
            <View>
              <Text style={StyleRes.text}>hfbvhbfhvb</Text>
            </View>
          </InternalShadow>
          <InternalShadow style={StyleRes.innerShadow}>
            <View>
              <Text style={StyleRes.text}>jvnfvfvh</Text>
            </View>
          </InternalShadow>
          <InternalShadow style={StyleRes.innerShadow}>
            <View>
              <Text style={StyleRes.text}>fvhbfh</Text>
            </View>
          </InternalShadow>
          <InternalShadow style={StyleRes.innerShadow}>
            <View>
              <Text style={StyleRes.text}>hvbfhvbf</Text>
            </View>
          </InternalShadow>
          <InternalShadow style={StyleRes.innerShadow}>
            <View>
              <Text style={StyleRes.text}>hvbhfbvhf</Text>
            </View>
          </InternalShadow>
        </View>
        {/* Copy và Save kí tự */}
        {/* =================== */}
        <TouchableOpacity style={StyleRes.buttonCopy}>
          <Text style={{ ...StyleRes.text, fontSize: 18 }}>Copy</Text>
        </TouchableOpacity>
        {/* Text cảnh báo người dùng */}
        {/* ======================== */}
        <View style={StyleRes.warningWrap}>
          <Image source={images.iconWarning} />
          <Text style={StyleRes.warningText}>
            Never share recovery phrases with anyone, keep them safe and
            confidential!
          </Text>
        </View>
        {/* Chuyển trang mới */}
        <View style={StyleRes.footer}>
          <ExternalShadow>
            <Pressable onPress={() => navigation.navigate("Compare")}>
              <Text style={StyleRes.text}>Next</Text>
            </Pressable>
          </ExternalShadow>
        </View>
        
      </SafeAreaView>
    </>
  );
};

export default RestoreLogin;
