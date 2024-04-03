import { ChainContext } from '@tonkeeper/mobile/src/context';
import { useContext } from 'react';

export const useChain = () => {
  return useContext(ChainContext);
};
