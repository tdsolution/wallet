import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { colors } from "../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import { ScrollView } from "react-native-gesture-handler";
import ItemNotification from "./Item/ItemNotification";

const NotificationScreen = () => {
  const [data, setdData] = useState([
    { id: '1', title: "Send coins" },
    { id: '2', title: "Send Coins" },
  ]);
  return (
    <SafeAreaView style={styles.container}>
      <View
        style={[
          globalStyles.row,
          {
            paddingHorizontal: 5,
            paddingVertical: 10,
            backgroundColor: colors.Primary,
          },
        ]}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Image
            source={require("../../assets/icons/png/ic-chevron-left-16.png")}
            style={styles.iconBack}
          />
          <Text style={styles.textBack}>Back</Text>
        </TouchableOpacity>
        <Text
          style={[
            globalStyles.textHeader,
            { color: colors.White, fontSize: 18, fontWeight: "bold" },
          ]}
        >
          NOTIFICATION
        </Text>
        <Text style={{ opacity: 0 }}>ascasac </Text>
      </View>

      <View style={styles.content}>
        <View style ={{marginVertical: 25}}>
          <Text style={styles.textTitle}>Notifications & Alertfor</Text>
          <Text style={styles.textTitle}>Your acticities</Text>
        </View>
        <FlatList
          data={data}
          renderItem={({ item: any }) => <ItemNotification />}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={{height: 100}}></View>}
        />
      </View>
    </SafeAreaView>
  );
};

export default NotificationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.Primary,
  },
  textBack: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.White,
    fontFamily: "Poppins-Medium",
    marginLeft: 12,
  },
  iconBack: {
    width: 16,
    height: 16,
    tintColor: colors.White,
    resizeMode: "contain",
  },
  content: {
    flex: 1,
    backgroundColor: colors.White,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
    marginTop: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.White,
    fontFamily: "Poppins-Medium",
    marginBottom: 10,
  },

  textTitle: {
    fontSize: 21,
    fontWeight: "bold",
    color: "#4871EA",
    lineHeight: 26,
    textAlign: "center",
    fontFamily: "Poppins-Bold",
  },
  textBody: {
    fontSize: 14,
    fontWeight: "500",
    color: "#909090",
    lineHeight: 20,
    textAlign: "center",
    fontFamily: "Poppins-Medium",
    marginTop: 10,
  },
  textXChoose: {
    fontSize: 14,
    fontWeight: "500",
    color: "#4871EA",
    lineHeight: 26,
    textAlign: "left",
    fontFamily: "Poppins-Bold",
  },
  button: {
    width: "100%",
    height: 50,
    backgroundColor: "#4871EA",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 100,
  },
  textButton: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.White,
    fontFamily: "Poppins-Medium",
  },
});
