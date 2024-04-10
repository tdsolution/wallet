const bip39 = require('bip39');
import {  Wallet as WalletETH } from 'ethers';
import SaveListWallet, { ListWalletModel } from './SaveWallet';
import { JsonRpcProvider, Contract } from 'ethers';
import AsyncStorage from '@react-native-async-storage/async-storage';
 export async function generateMnemonic(): Promise<string> {
  try {
    // Generate the mnemonic phrase
    const mnemonic = await bip39.generateMnemonic();
    return mnemonic;
  } catch (error) {
    // Handle any errors that occur during mnemonic generation
    console.error('Error generating mnemonic:', error);
    throw error;
  }
}
export async function createWalletFromMnemonic(mnemonic: string){
  // Tạo lần đầu tiên
  const list = await SaveListWallet.getData();
  if(list.length > 0){
   SaveListWallet.clearData();
  }
  const wallet = WalletETH.fromPhrase(mnemonic);
  const address : string = wallet.address;
  const privateKey : string = wallet.privateKey;
  const walletModel: ListWalletModel = {
  name: 'Account1',
  addressWallet: address, // Thêm giá trị của addressWallet tại đây
  privateKey: privateKey, // Thêm giá trị của privateKey tại đây
  mnemonic: mnemonic, // Thêm giá trị của mnemonic tại đây
  };
  await AsyncStorage.setItem('EVMPrivateKey',JSON.stringify(privateKey));
  await AsyncStorage.setItem('EVMAddress',JSON.stringify(address));
  await AsyncStorage.setItem('EVMMnemonic',JSON.stringify(mnemonic));
  SaveListWallet.fullFlowSaveData({wallet:walletModel});
  console.log('Save Wallet');
}
export function shortenWalletAddress(walletAddress: string, prefixLength: number = 8, suffixLength: number = 5): string {
  walletAddress = walletAddress.replace(/"/g, '');
  if (walletAddress.length <= prefixLength + suffixLength) {
    return walletAddress;
  }
  const prefix = walletAddress.slice(0, prefixLength);
  const suffix = walletAddress.slice(-suffixLength);
  return `${prefix}...${suffix}`;
}
export function addressEVMString(walletAddress: string): string {
  walletAddress = walletAddress.replace(/"/g, '');
  return walletAddress;
}
  const networkUrl = 'https://bsc-testnet.publicnode.com';
  const abi =  [
   "function balanceOf(address owner) view returns (uint256)",
    "function decimals() view returns (uint8)",
    "function symbol() view returns (string)",
];
export async function getInfoToken  ()  {
    try {
      const provider = new JsonRpcProvider('https://bsc-testnet.publicnode.com');
      const tokenContractAddress = '0x0221144D770De4ca55D0a9B7306cA8BF7FB8B805'; // Thay YOUR_TOKEN_CONTRACT_ADDRESS bằng địa chỉ smart contract của token
      const tokenContract =  new Contract(tokenContractAddress, abi, provider);
      const balance =  await tokenContract.balanceOf('0xEa5007831646fa01C7079B15cFa4c62748905b04');
      const decimal = await tokenContract.decimals();
      const symbol = await tokenContract.symbol();
      console.log(balance);
      console.log(decimal);
      console.log(symbol);
    } catch (error) {
      console.error('Error fetching token info:', error);
    }
  };






