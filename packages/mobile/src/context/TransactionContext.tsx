import SaveTransaction from "$libs/EVM/HistoryEVM/SaveTransaction";
import { useChain } from "@tonkeeper/shared/hooks";
import React, { createContext, useContext, useState, useEffect } from "react";


// Define the context
interface ChainContextType {
  transactionData: any;
  setTransactionData: React.Dispatch<React.SetStateAction<any>>; // Define the type explicitly
}
// 1. Tạo Context
export const TransactionContext = createContext<ChainContextType | undefined>(undefined);;

// 2. Tạo Provider
export const TransactionProvider = ({ children }) => {
  const chain = useChain()?.chain;
  const [transactionData, setTransactionData] = useState<any[]>([]);

  

  // Gọi fetchData khi component mount
  useEffect(() => {
    // Hàm gọi API
  const fetchData = async () => {
    try {
      // Gọi hàm fullFlowSaveData từ lớp SaveTransaction để lưu transaction mẫu
      const result = await SaveTransaction.getData();
      const dataChainId = result.filter(
        (data) => data.idxChain === chain.chainId
      );
      setTransactionData(dataChainId);
    } catch (error) {
      console.error("Error saving sample transaction:", error);
    }
  };
    fetchData();
  }, []);

  // Context value
  const contextValue = {
    transactionData,
    setTransactionData,
  };

  return (
    <TransactionContext.Provider value={{transactionData,
      setTransactionData,
      }}>{children}</TransactionContext.Provider>
  );
};
