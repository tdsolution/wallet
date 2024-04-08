import { useContext } from 'react';
import { BalanceEVMContext } from './BalanceEVMContext';

export const useBalanceEVM = () => {
  return useContext(BalanceEVMContext);
};