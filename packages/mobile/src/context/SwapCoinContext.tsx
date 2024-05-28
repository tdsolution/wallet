import React, { createContext, useEffect, useState } from 'react';
import { dataCoinDes } from '../screens/SwapScreen/dataSwap/dataCoinDes';
import { useChain, useEvm } from "@tonkeeper/shared/hooks";


// Define the context
interface ChainContextType {
  swapCoin: any;
  setSwapCoin: React.Dispatch<React.SetStateAction<any>>;
  swapCoinItem: any;
  setSwapCoinItem: React.Dispatch<React.SetStateAction<any>>;
  
}
export const SwapCoinContext = createContext<ChainContextType | undefined>(undefined);

// Define the provider
export const SwapCoinProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const chain = useChain()?.chain;
  // const chainId = chain.chainId;
  const [swapCoin, setSwapCoin] = useState<any>(dataCoinDes.length - 1);
  const [swapCoinItem, setSwapCoinItem] = useState<any>({});
  useEffect(() => {
    try {
      if(chain) {
        const dataItem = dataCoinDes.find((data) => {
          return data.chainId == chain.chainId
        })
        setSwapCoinItem(dataItem)
        console.log("Data Item chain: ", dataItem);
        const dataIndex = dataCoinDes.findIndex((data) => data.chainId == chain.chainId);
      const finalIndex = dataIndex !== -1 ? dataIndex : dataCoinDes.length - 1;
      setSwapCoin(finalIndex);
      // console.log("Chain ID nè: ", chain);
      }
    } catch (error) {
      console.log("Lỗi trong SwapCoinProvider: ", error);
    }
    
  }, [chain]);


  // Đảm bảo setSwapCoin không bị undefined
  const contextValue: ChainContextType = {
    swapCoin,
    setSwapCoin,
    swapCoinItem,
    setSwapCoinItem
  };
  return (
    <SwapCoinContext.Provider value={contextValue}>
      {children}
    </SwapCoinContext.Provider>
  );
};
