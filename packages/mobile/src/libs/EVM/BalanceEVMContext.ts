// import React, { createContext, useEffect, useState } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { JsonRpcProvider, formatUnits } from 'ethers';
// import { chainActive } from '@tonkeeper/shared/utils/KEY_STORAGE';

// // Define the context
// interface BalanceEVMContextType {
//   balanceEVM: number;
//   setBalanceEVM: React.Dispatch<React.SetStateAction<number>>;
// }

// export const BalanceEVMContext = createContext<BalanceEVMContextType | undefined>(undefined);

// // Define the provider
// export const BalanceEVMProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [balanceEVM, setBalanceEVM] = useState<number>(0);

//   useEffect(() => {
//     const fetchBalance = async () => {
//       try {
//         const address: string | null = await AsyncStorage.getItem('EVMAddress');
//         const storedChainActive: string | null = await AsyncStorage.getItem(chainActive);

//         if (address && storedChainActive) {
//           const addressWallet: string = address.replace(/"/g, '');
//           const provider = new JsonRpcProvider(JSON.parse(storedChainActive).rpc);
//           const balance = await provider.getBalance(addressWallet);
//           const balanceInGwei = formatUnits(balance, 'gwei');
//           const balanceInGweiAsNumber = parseFloat(balanceInGwei);

//           if (!isNaN(balanceInGweiAsNumber)) {
//             const balanceInEther = balanceInGweiAsNumber / Math.pow(10, 9);
//             setBalanceEVM(balanceInEther);
//           } else {
//             console.error('Invalid balance value');
//           }
//         }
//       } catch (error) {
//         console.error('Error fetching Ethereum balance:', error);
//       }
//     };

//     fetchBalance();
//   }, []);

//   // Ensure that BalanceEVMProvider returns a valid JSX element
//   return (
//     <BalanceEVMContext.Provider value={{ balanceEVM, setBalanceEVM }}>
//       {children}
//     </BalanceEVMContext.Provider>
//   );
// };
