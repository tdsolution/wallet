import { EvmContext } from '@tonkeeper/mobile/src/context';
import { useContext } from 'react';

export const useEvm = () => {
  return useContext(EvmContext);
};
