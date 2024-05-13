// import { SwapCoinContext } from '@tonkeeper/mobile/src/context';
import { SwapCoinContext } from '@tonkeeper/mobile/src/context/SwapCoinContext';
import { useContext } from 'react';

export const useSwapCoin = () => {
  return useContext(SwapCoinContext);
};
