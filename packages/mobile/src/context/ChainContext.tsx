import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { chainActive } from '@tonkeeper/shared/utils/KEY_STORAGE';
import { DataChains } from '@tonkeeper/shared/utils/network';

// Define the context
interface ChainContextType {
  chain: any;
  setChain: React.Dispatch<React.SetStateAction<any>>; // Define the type explicitly
}

export const ChainContext = createContext<ChainContextType | undefined>(undefined);

// Define the provider
export const ChainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chain, setChain] = useState<any>(null);

  useEffect(() => {
    const fetchChainActive = async () => {
      try {
        const storedChainActive = await AsyncStorage.getItem(chainActive);
        if (storedChainActive) {
          setChain(JSON.parse(storedChainActive));
        } else {
          await AsyncStorage.setItem(chainActive, JSON.stringify(DataChains[0]));
          setChain(DataChains[0]);
        }
      } catch (error) {
        console.error('Error reading data from AsyncStorage:', error);
      }
    };

    fetchChainActive();
  }, []);

  return (
    <ChainContext.Provider value={{ chain, setChain }}>
      {children}
    </ChainContext.Provider>
  );
};
