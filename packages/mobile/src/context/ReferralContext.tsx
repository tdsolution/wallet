import React, { createContext, useEffect, useState } from 'react';
import { dataCoinDes } from '../screens/SwapScreen/dataSwap/dataCoinDes';
import { useChain, useEvm } from "@tonkeeper/shared/hooks";
import { ethers } from 'ethers'

// Define the context
interface ReferrerContextType {
  isReferrer: any;
  setIsReferrer: React.Dispatch<React.SetStateAction<any>>;
}
export const ReferralContext = createContext<ReferrerContextType | undefined>(undefined);

// Define the provider
export const ReferrerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [isReferrer, setIsReferrer] = useState<boolean>(false);

  // Đảm bảo setSwapCoin không bị undefined
  const contextValue: ReferrerContextType = {
    isReferrer,
    setIsReferrer
  };
  return (
    <ReferralContext.Provider value={contextValue}>
      {children}
    </ReferralContext.Provider>
  );
};
