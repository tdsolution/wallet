import { useContext } from 'react';
import { BalanceEvmContext } from './BalanceEvmContext';

export const useBalanceEVM = () => {
    return useContext(BalanceEvmContext);
};
