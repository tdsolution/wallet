import React, { createContext, useContext, useState, useEffect } from "react";

// 1. Tạo Context
const TransactionContext = createContext();

// 2. Tạo Provider
export const ApiProvider = ({ children }) => {
  const [transactionData, setTransactionData] = useState([]);

  // Hàm gọi API
  const fetchData = async () => {
    try {
      const response = await fetch("https://api.example.com/data");
      const data = await response.json();
      setTransactionData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Gọi fetchData khi component mount
  useEffect(() => {
    fetchData();
  }, []);

  // Context value
  const contextValue = {
    transactionData,
    fetchData,
  };

  return (
    <TransactionContext.Provider value={contextValue}>{children}</TransactionContext.Provider>
  );
};
