import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JsonRpcProvider, formatUnits } from 'ethers';
import { chainActive } from '@tonkeeper/shared/utils/KEY_STORAGE';

// Define the context
interface BalanceEVMContextType {
  balanceEVM: number;
  setBalanceEVM: React.Dispatch<React.SetStateAction<number>>;
}
export const BalanceEVMContext = createContext<BalanceEVMContextType | undefined>(undefined);

export const BalanceEVMProvider = ({ children }: { children: React.ReactNode }) => {
  const [balanceEVM, setBalanceEVM] = useState<number>(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
         const storedChainActive = await AsyncStorage.getItem(chainActive) ?? '';
         const storedChain  = JSON.parse(storedChainActive).rpc;
          const provider = new JsonRpcProvider(JSON.parse(storedChainActive).rpc);
          const balance = await provider.getBalance('addressWallet');
          const balanceInGwei = formatUnits(balance, 'gwei');
          const balanceInGweiAsNumber = parseFloat(balanceInGwei);
          const balanceInEther = balanceInGweiAsNumber / Math.pow(10, 9);
          setBalanceEVM(balanceInEther);
      } catch (error) {
        console.error('Error fetching Ethereum balance:', error);
      }
    };

    fetchBalance();
  }, []);

  // Ensure that BalanceEVMProvider returns a valid JSX element
  return (
    <BalanceEVMContext.Provider value={{ balanceEVM, setBalanceEVM }}>
      {children}
    </BalanceEVMContext.Provider>
  );
};
