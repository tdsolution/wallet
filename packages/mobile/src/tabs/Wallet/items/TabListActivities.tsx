import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
} from "react-native";
import React, { useState } from "react";
import ItemWallet from "./ItemWallet";
import { DATA_ACTIVITIES } from "./Data";
import ItemTransactionHistory from "../../../screens/TransactionHistory/Item/ItemTransactionHistory";
import { colors } from "../../../constants/colors";
import { useNavigation } from "@tonkeeper/router";

const TabListActivities = () => {
  const dataToShow = DATA_ACTIVITIES.slice(-3);
  const navigation = useNavigation();
  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <View>
        <View style={{ alignItems: "flex-end", marginEnd: 12, marginTop:10 }}>
          <TouchableOpacity style={styles.buttonBrower}>
            <Image
              style={styles.image}
              source={require("../../../assets/icons/png/ic-globe-56.png")}
            />
            <Text style={styles.textButtonBrower}>Visit Brower</Text>
            <Image
              style={styles.icon}
              source={require("../../../assets/icons/png/ic-chevron-right-16.png")}
            />
          </TouchableOpacity>
        </View>
        {
          DATA_ACTIVITIES.length !== 0 ? (<View>
            <FlatList
              data={dataToShow}
              renderItem={({ item }) => (
                <ItemTransactionHistory
                  title={item.title}
                  time={item.time}
                  amount={item.amount}
                  privateKey={item.privateKey}
                  date={item.date}
                  isUp={item.isUp}
                />
              )}
              keyExtractor={(item) => item.privateKey.toString()}
              ListHeaderComponent={<View style={{ height: 25 }} />}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
            />
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginBottom: Platform.OS === "android" ? 80 : 0,
              }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate("TransactionHistory")}
              >
                <Text style={styles.textButton}>See all transactions</Text>
                <Image
                  style={styles.icon}
                  source={require("../../../assets/icons/png/ic-chevron-right-16.png")}
                />
              </TouchableOpacity>
            </View>
          </View> ): (
            <View style={{ padding: 25 }}>
          <View style={[styles.container, {marginBottom: Platform.OS === "android" ? 50 : 0}]}>
            <Image
              style={styles.imageNotFound}
              source={require("../../../assets/logo/logo_app.png")}
            />
            <Text style={styles.title}>You have no activities</Text>
            <Text style={styles.subtitle}>Make your transactions</Text>
            <TouchableOpacity style={[styles.buttonGoHead]}>
              <Text style={[styles.textButton,{color: colors.White}]}>Go Ahead</Text>
            </TouchableOpacity>
          </View>
        </View>
          )
        }
        
        
      </View>
    </View>
  );
};

export default TabListActivities;

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.White,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: colors.Primary,
  },
  textButton: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.Primary,
    fontFamily: "Poppins-Medium",
  },
  icon: {
    width: 16,
    height: 16,
    tintColor: colors.Primary,
    resizeMode: "contain",
  },
  buttonBrower: {
    paddingHorizontal:10,
    paddingVertical:8,
    backgroundColor: colors.White,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.Primary,
  },
  textButtonBrower: {
    fontSize: 12,
    fontWeight: "600",
    color: colors.Primary,
    fontFamily: "Poppins-Medium",
  },
  image: {
    width: 24,
    height: 24,
    borderRadius: 28,
    resizeMode: "contain",
    tintColor: colors.Primary,
  },
  container: {
    width: "100%",
    backgroundColor: "#ffffff",
    alignItems: "center",
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
    padding: 25,
  },
  imageNotFound: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderRadius: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: colors.Black,
    fontFamily: "Poppins-Medium",
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.Gray,
    fontFamily: "Poppins-Medium",
  },
  buttonGoHead: {
    width: '100%',
    height: 50,
    padding: 10,
    backgroundColor: colors.Primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginTop: 10
  }
});
