import { BalaceContext } from '@tonkeeper/mobile/src/context';
import { useContext } from 'react';

export const useBalanceTD = () => {
  return useContext(BalaceContext);
};
