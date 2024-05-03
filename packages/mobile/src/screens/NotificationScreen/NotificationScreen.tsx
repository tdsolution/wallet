import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useState,  } from "react";
import { colors } from "../../constants/colors";
import { globalStyles } from "$styles/globalStyles";
import { ScrollView } from "react-native-gesture-handler";
import ItemNotification from "./Item/ItemNotification";
import { useFocusEffect, useNavigation } from "@tonkeeper/router";
import SaveTransaction from "$libs/EVM/HistoryEVM/SaveTransaction";
import { useChain, useEvm, useWallet } from "@tonkeeper/shared/hooks";
import { useTransaction } from "@tonkeeper/shared/hooks/useTransaction";
import { WalletStackRouteNames } from "$navigation";

const NotificationScreen = () => {
  const navigation = useNavigation();
  const chain = useChain()?.chain;
  const transactionData = useTransaction()?.transactionData;
  const [dataTransaction, setDataTransaction] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isData, setIsData] = useState<boolean>(false);
  const [isRead, setIsRead] = useState<boolean>(false);
  const evm = useEvm()?.evm;

  const handleGetTransaction = async () => {
    try {
      setIsLoading(true);
      // Gọi hàm fullFlowSaveData từ lớp SaveTransaction để lưu transaction mẫu
      const result = await SaveTransaction.getData();
      console.log("Data transaction: ", transactionData);
      const dataChainId = result.filter(
        (data) => data.idxChain === chain.chainId && (data.fromAddress === evm.addressWallet || data.toAddress === evm.addressWallet)
      );
      setDataTransaction(dataChainId);
      if (dataChainId.length != 0) {
        setIsData(true);
      }
    } catch (error) {
      console.error("Error saving sample transaction:", error);
    } finally {
      setIsLoading(false);
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      handleGetTransaction();
    }, [chain.chainId])
  );
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
          onPress={() => navigation.goBack()}
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
        <View style={{ marginVertical: 25 }}>
          <Text style={styles.textTitle}>Notifications & Alertfor</Text>
          <Text style={styles.textTitle}>Your acticities</Text>
        </View>
        {isLoading ? (
          <View
            style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
          >
            <ActivityIndicator size="large" color={colors.Primary} />
          </View>
        ) : !isData ? (
          <View style={{ padding: 25 }}>
            <View
              style={[
                styles.boxNotFound,
                { marginBottom: Platform.OS === "android" ? 50 : 0 },
              ]}
            >
              <Image
                style={styles.imageNotFound}
                source={require("../../assets/logo/logo_app.png")}
              />
              <Text
                style={[styles.title, { color: colors.Primary, fontSize: 20 }]}
              >
                No Notifications
              </Text>
              <Text style={styles.subtitle}>
                There are currently no announcements
              </Text>
              <TouchableOpacity
                style={[styles.buttonGoHead]}
                onPress={() =>
                  navigation.navigate(WalletStackRouteNames.Wallet)
                }
              >
                <Text style={[styles.textButton, { color: colors.White }]}>
                  Go Home
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <FlatList
            data={dataTransaction}
            renderItem={({ item, index }) => (
              <ItemNotification
                id={item.id}
                unSwap={item.unSwap}
                amount={item.amount}
                fromAddress={item.fromAddress}
                toAddress={item.toAddress}
                idxChain={item.idxChain}
                isRead={item.isRead}
                name={item.name}
                symbol={item.symbol}
                time={item.time}
                index={index}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            ListFooterComponent={<View style={{ height: 100 }}></View>}
          />
        )}
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
  imageNotFound: {
    width: 100,
    height: 100,
    resizeMode: "contain",
    borderRadius: 50,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.Gray,
    fontFamily: "Poppins-Medium",
  },
  buttonGoHead: {
    width: "100%",
    height: 50,
    padding: 10,
    backgroundColor: colors.Primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 25,
  },
  boxNotFound: {
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
});
