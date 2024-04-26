import { TransactionContext } from '@tonkeeper/mobile/src/context';
import { useContext } from 'react';

export const useTransaction = () => {
  return useContext(TransactionContext);
};
