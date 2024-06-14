// import { SwapCoinContext } from '@tonkeeper/mobile/src/context';
import { ReferralContext } from '@tonkeeper/mobile/src/context/ReferralContext';
import { useContext } from 'react';

export const useReferral = () => {
  return useContext(ReferralContext);
};
