import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addressEVMString } from '$libs/EVM/createWallet';

// Define the context
interface EmvContextType {
  evm: any;
  setEvm: React.Dispatch<React.SetStateAction<any>>; // Define the type explicitly
}
export const EvmContext = createContext<EmvContextType | undefined>(undefined);

// Define the provider
export const EmvProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [evm, setEvm] = useState<any>(null);

  useEffect(() => {
    const fetchEvm = async () => {
      try {
        const address = await AsyncStorage.getItem("EVMAddress");
        const privateKey = await AsyncStorage.getItem("EVMPrivateKey");
        const mnemonic = await AsyncStorage.getItem("EVMMnemonic");
        const name = await AsyncStorage.getItem("EVMMname");
        const evmModal = {
          addressWallet: address,
          privateKey: privateKey,
          mnemonic: mnemonic,
          name: name,
        }
        setEvm(evmModal);
      } catch (error) {
        console.error('Error reading data from AsyncStorage:', error);
      }
    };
    fetchEvm();
  }, []);

  return (
    <EvmContext.Provider value={{ evm, setEvm }}>
      {children}
    </EvmContext.Provider>
  );
};