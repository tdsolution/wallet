import {
  View,
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
import { useRoute } from '@react-navigation/native';
import { Text } from "@tonkeeper/uikit";
import { WalletStackRouteNames } from "$navigation";
import { useChain, useEvm } from "@tonkeeper/shared/hooks";
const TransactionHistory = () => {
  const [transactions, setTransactions] = useState<TransactionModel[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const itemsPerPage = 20; // Số lượng phần tử hiển thị mỗi lần
  const evm = useEvm()?.evm;
  const chain = useChain()?.chain;
  const dataToShow = transactions.slice(0, itemsPerPage);
  const [visibleData, setVisibleData] = useState(dataToShow); // Danh sách dữ liệu đã hiển thị
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack();
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
     const data = await fetchTransactions(evm.addressWallet, chain.chainId);
      const transactionsData: TransactionModel[] = data.result.reverse().map(
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
        <Text type="body2" color="textGray" style={{marginTop:5}}>
          Summary of transactions in your wallet, click to see their details
          including fees,...
        </Text>
        <View style={{ alignItems: "flex-end" }}>
          <TouchableOpacity style={styles.button}>
            <Text type="body2">Download</Text>
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
            value={item.value}
            gasPrice={item.gasPrice}
            isError={item.isError}
            transactionIndex={item.transactionIndex}
            gasUsed={item.gasUsed}
            chainSymbol="BNB"
            isSend={item.from?.toLocaleLowerCase() ===
                    evm.addressWallet.toLocaleLowerCase()}
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
  button: {
    height: 34,
    backgroundColor: colors.Primary,
    borderRadius: 6,
    paddingHorizontal: 19,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 27,
  },
});

export default TransactionHistory;


