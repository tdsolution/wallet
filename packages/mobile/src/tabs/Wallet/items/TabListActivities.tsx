import {
  StyleSheet,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect } from "react";
import ItemWallet from "./ItemWallet";
import { DATA_ACTIVITIES } from "./Data";
import ItemTransactionHistory from "../../../screens/TransactionHistory/Item/ItemTransactionHistory";
import { colors } from "../../../constants/colors";
import { useNavigation } from "@tonkeeper/router";
import {
  fetchDataTokens,
  createBSTransactionFromJson,
  TransactionModel,
  fetchTransactions,
} from "$libs/EVM/HistoryEVM/DataHistory";
import moment from "moment";
import { openDAppBrowser } from "$navigation";
import { useChain, useEvm } from "@tonkeeper/shared/hooks";
import { Text } from "@tonkeeper/uikit";
import { buildAddressUrl } from "$libs/EVM/brower";
const TabListActivities = ({ chainActive, address }) => {
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  const dataToShow = transactions.slice(-3);
  const navigation = useNavigation();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // console.log(address);
    // console.log(chainActive.chainId);
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const data = await fetchTransactions(address, chainActive.chainId);
        const transactionsData: TransactionModel[] = data.result.map(
          (item: any) => createBSTransactionFromJson(item)
        );
        setTransactions(transactionsData);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [chainActive]);
  function convertToTimestampString(timeString: string): string {
    const timestamp: number = moment(
      timeString,
      "ddd MMM DD HH:mm:ss [UTC] YYYY"
    ).valueOf();
    return timestamp.toString();
  }
  const FooterComponent = ({ isLoading }) => (
    <View
      style={{
        height: 30,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading && <ActivityIndicator animating size="small" />}
    </View>
  );
  return (
    <View
      style={{
        width: "100%",
      }}
    >
      <View>
        <View style={{ alignItems: "flex-end", marginEnd: 12, marginTop: 10 }}>
          <TouchableOpacity
            style={styles.buttonBrower}
            onPress={() =>
              openDAppBrowser(
                buildAddressUrl(address, chainActive.chainId)
              )
            }
          >
            <Image
              style={styles.image}
              source={require("../../../assets/icons/png/ic-globe-56.png")}
            />
            <Text type="label3" color="primaryColor">Visit Brower</Text>
            <Image
              style={styles.icon}
              source={require("../../../assets/icons/png/ic-chevron-right-16.png")}
            />
          </TouchableOpacity>
        </View>
        {dataToShow.length > 0 ? (
          <View>
            <FlatList
              data={dataToShow}
              renderItem={({ item }) => (
                <ItemTransactionHistory
                  timeStamp={
                    chainActive.chainId != "1116"
                      ? item.timeStamp
                      : convertToTimestampString(item.timeStamp ?? "")
                  }
                  blockHash={item.blockHash}
                  from={item.from}
                  to={item.to}
                  value={item.value}
                  isError={item.isError}
                  transactionIndex={item.transactionIndex}
                  gasUsed={item.gasUsed}
                  chainSymbol={chainActive.currency}
                  isSend={
                    item.from?.toLocaleLowerCase() ===
                    address.toLocaleLowerCase()
                  }
                />
              )}
              keyExtractor={(item, index) => index.toString()}
              ListHeaderComponent={<View style={{ height: 5 }} />}
              showsVerticalScrollIndicator={false}
              scrollEnabled={false}
              ListFooterComponent={<FooterComponent isLoading={isLoading} />}
            />
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginBottom: 80,
              }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate("TransactionHistory", {
                    chainActive,
                    address,
                  })
                }
              >
                <Text type="label1" color="primaryColor">See all transactions</Text>
                <Image
                  style={styles.icon}
                  source={require("../../../assets/icons/png/ic-chevron-right-16.png")}
                />
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ padding: 25 }}>
            <View
              style={[
                styles.container,
                { marginBottom: Platform.OS === "android" ? 50 : 0 },
              ]}
            >
              <Image
                style={styles.imageNotFound}
                source={require("../../../assets/logo/logo_app.png")}
              />
              <Text type="h3" color="textPrimaryAlternate">You have no activities</Text>
              <Text type="body2" color="textTertiary" style={{marginVertical: 5}}>Make your transactions</Text>
              <TouchableOpacity style={[styles.buttonGoHead]}>
                <Text type="label1">
                  Go Ahead
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
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
  icon: {
    width: 16,
    height: 16,
    tintColor: colors.Primary,
    resizeMode: "contain",
  },
  buttonBrower: {
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: colors.White,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 100,
    borderWidth: 1,
    borderColor: colors.Primary,
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
  buttonGoHead: {
    width: "100%",
    height: 50,
    padding: 10,
    backgroundColor: colors.Primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 100,
    marginTop: 10,
  },
});
