import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { colors } from "../constants/colors";

interface Props {
  title: string;
  onPress?: void;
}

const Title = (props: Props) => {
  const { title, onPress } = props;
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 25,
      }}
    >
      <Text style={styles.title}>{title}</Text>
      <TouchableOpacity
        onPress={() => (onPress ? onPress : console.log("See All"))}
      >
        <Text style={styles.textSeeAll}>See All</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.Primary,
    fontFamily: "Poppins-Medium",
  },
  textSeeAll: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.Green,
    lineHeight: 16,
    textAlign: "right",
    fontFamily: "Poppins-Medium",
    borderBottomWidth: 1,
    borderBottomColor: colors.Green,
  },
});
