import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";
import { globalStyles } from "$styles/globalStyles";

interface Props {
  title: string;
  onPress?: void;
}

const HeaderBar = (props: Props) => {
  const { title, onPress } = props;
  return (
    <View style={globalStyles.header}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={() => (onPress ? onPress : console.log("Back Screen"))}
        >
          <Image
            style={[globalStyles.iconBack]}
            source={require("../assets/icons/png/ic_back.png")}
            // source={require("../assets/icons/png/ic_cancle.png")}
            // source={require("../assets/icons/png/ic-chevron-left-16@4x.png")}
          />
        </TouchableOpacity>
        <Text style={[globalStyles.textHeader]}>{title}</Text>
      </View>
      <Image
        // source={require("../assets/icons/png/ic-settings-28@4x.png")}
        source={require("../assets/icons/png/ic_prime_arrow_down.png")}
        style={globalStyles.iconHeader}
      />
    </View>
  );
};

export default HeaderBar;
