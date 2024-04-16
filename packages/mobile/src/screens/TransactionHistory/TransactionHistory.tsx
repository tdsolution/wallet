import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Button,
} from "react-native";
import React, { useState, useEffect } from "react";
import Container from "../../components/Container";
import HeaderBar from "../../components/HeaderBar";
import { colors } from "../../constants/colors";
import ItemTransactionHistory from "./Item/ItemTransactionHistory";
import { useNavigation } from "@tonkeeper/router";
import {
  fetchDataTokens,
  createBSTransactionFromJson,
  TransactionModel,
  fetchTransactions,
} from "$libs/EVM/HistoryEVM/DataHistory";

const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const itemsPerPage = 20; // Số lượng phần tử hiển thị mỗi lần

  const dataToShow = transactions.slice(0, itemsPerPage);
  const [visibleData, setVisibleData] = useState(dataToShow); // Danh sách dữ liệu đã hiển thị
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack();
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchTransactions(
        "0xEa5007831646fa01C7079B15cFa4c62748905b04",
        "97"
      );
      const transactionsData: TransactionModel[] = data.result.map(
        (item: any) => createBSTransactionFromJson(item)
      );
      // // Cập nhật transactions
      // setTransactions((prevTransactions) => [
      //   ...prevTransactions,
      //   ...transactionsData,
      // ]);
      setTransactions(transactionsData);
      setVisibleData(transactionsData.slice(0, itemsPerPage));
      // // Kiểm tra xem đã đạt cuối danh sách chưa
      // if (transactionsData.length === 0) {
      //   setIsEndReached(true);
      // }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // // Hàm để xử lý khi nhấn nút "Load More"
  // const handleLoadMore = () => {
  //   const newData = transactions.slice(visibleData.length, visibleData.length + itemsPerPage);
  //   setVisibleData(prevData => [...prevData, ...newData]);
  // };

  // Hàm xử lý khi nhấn nút "Load More"
  const handleLoadMore = () => {
    setIsLoading(true); // Đánh dấu bắt đầu tải dữ liệu

    const nextIndex = visibleData.length;
    // Lấy 20 phần tử tiếp theo từ danh sách transactions
    const nextData = transactions.slice(nextIndex, nextIndex + itemsPerPage);
    // Cập nhật danh sách hiển thị bằng cách nối 20 phần tử tiếp theo với danh sách đã hiển thị trước đó
    setVisibleData((prevData) => [...prevData, ...nextData]);
    const transactionslength = transactions.length;
    const visibleDataLength = visibleData.length;
    if (transactionslength === visibleDataLength) {
      setIsLoading(false);
    }
  };

  const FooterComponent = ({ isLoading }) => (
    <View
      style={{
        height: 50,
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 50,
      }}
    >
      {isLoading && <ActivityIndicator animating size="small" />}
    </View>
  );

  return (
    <Container>
      <HeaderBar title={"Transactions"} onBack={handleBack} />
      <View style={{ paddingHorizontal: 25 }}>
        <Text style={styles.title}>
          Summary of transactions in your wallet, click to see their details
          including fees,...
        </Text>
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.textButton}>Download</Text>
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        style={{ height: 100 }}
        data={visibleData}
        renderItem={({ item }) => (
          <ItemTransactionHistory
            timeStamp={item.timeStamp}
            blockHash={item.blockHash}
            from={item.from}
            to={item.to}
            gasPrice={item.gasPrice}
            isError={item.isError}
            transactionIndex={item.transactionIndex}
            gasUsed={item.gasUsed}
          />
        )}
        keyExtractor={(item, index) => index.toString()}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={<FooterComponent isLoading={isLoading} />}
        ListHeaderComponent={<View style={{ height: 5 }} />}
        showsVerticalScrollIndicator={false}
      />
    </Container>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: "500",
    textAlign: "left",
    lineHeight: 22,
    color: colors.Gray,
    marginTop: 5,
  },
  button: {
    width: 110,
    height: 34,
    backgroundColor: colors.Primary,
    borderRadius: 6,
    paddingHorizontal: 19,
    // paddingVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 7,
    marginBottom: 27,
  },
  textButton: {
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 22,
    color: colors.White,
  },
});

export default TransactionHistory;
