import { View, Text, Pressable, Image } from "react-native";
import React from "react";
import styles from "./style";
import images from "../../assets/images";
import ExternalShadow from "../BoxShadow/ExternalShadow";

const ButtonToBack = ({ navigation }) => {
  return (
    <View style={styles.backBtn}>
      <ExternalShadow>
        <Pressable
          style={styles.buttonBack}
          onPress={() => navigation.goBack()}
        >
          <Image
            style={{
              width: 20,
              height: 20,
              resizeMode: "contain",
            }}
            source={images.iconBack}
          />
        </Pressable>
      </ExternalShadow>
    </View>
  );
};

export default ButtonToBack;
