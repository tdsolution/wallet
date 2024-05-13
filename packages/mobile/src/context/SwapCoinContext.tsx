import React, { createContext, useEffect, useState } from 'react';
import { dataCoinDes } from '../screens/SwapScreen/dataSwap/dataCoinDes';

// Define the context
interface ChainContextType {
    swapCoin: any;
    setSwapCoin: React.Dispatch<React.SetStateAction<any>>; // Define the type explicitly
}
export const SwapCoinContext = createContext<ChainContextType | undefined>(undefined);

// Define the provider
export const SwapCoinProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [swapCoin, setSwapCoin] = useState<any>(dataCoinDes.length-1);

  // Đảm bảo setSwapCoin không bị undefined
  const contextValue: ChainContextType = {
    swapCoin,
    setSwapCoin // hoặc có thể viết tắt chỉ cần setSwapCoin
  };
  return (
    <SwapCoinContext.Provider value={contextValue}>
      {children}
    </SwapCoinContext.Provider>
  );
};
