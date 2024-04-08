import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { JsonRpcProvider, formatUnits } from 'ethers';
import { chainActive } from '@tonkeeper/shared/utils/KEY_STORAGE';
import { addressEVMString } from './createWallet';

export const useBalanceEVM = () => {
  const [balanceEVM, setbalanceEVM] = useState<string>('0');
  const [loading, setLoading] = useState<boolean>(true);
const fetchBalance = async () => {
      try {
        const storedChainActive = await AsyncStorage.getItem(chainActive) ?? '';
        const addressWallet = await AsyncStorage.getItem('EVMAddress') ?? '';
        const storedChain = JSON.parse(storedChainActive);
        console.log(storedChain.rpc);
        const rpc = storedChain.rpc;
        const provider = new JsonRpcProvider(rpc);
        const balanceResponse = await provider.getBalance(addressEVMString(addressWallet));
        const balanceInGwei = formatUnits(balanceResponse, 'gwei');
        const balanceInGweiAsNumber = parseFloat(balanceInGwei);
        const balanceInEther = balanceInGweiAsNumber / Math.pow(10, 9);
        console.log(balanceInEther);
        setbalanceEVM(balanceInEther.toString());
      } catch (error) {
        console.error('Error fetching Ethereum balance:', error);
        setbalanceEVM('0');
      } finally {
        setLoading(false);
      }
    };
  useEffect(() => {
    fetchBalance();
  }, []);
const reset = () => {
    fetchBalance();
  };
  return { balanceEVM, loading ,reset};
};
