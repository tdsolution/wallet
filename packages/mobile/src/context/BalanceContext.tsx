import React, { createContext, useEffect, useState } from 'react';

// Define the context
interface BalanceContextType {
  balance: any;
  setBalance: React.Dispatch<React.SetStateAction<any>>; // Define the type explicitly
}
export const BalaceContext = createContext<BalanceContextType | undefined>(undefined);

// Define the provider
export const BalanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [balance, setBalance] = useState<any>(null);
  return (
    <BalaceContext.Provider value={{ balance, setBalance }}>
      {children}
    </BalaceContext.Provider>
  );
};