import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";
import { globalStyles } from "$styles/globalStyles";
import { useNavigation } from "@tonkeeper/router";

interface Props {
  title: string;
  onBack?:() => void;
}

const HeaderBar = (props: Props) => {
  const { title, onBack } = props;
  const navigation = useNavigation();
  return (
    <View style={globalStyles.header}>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          onPress={onBack ? onBack : () => console.log("Go back")}
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
