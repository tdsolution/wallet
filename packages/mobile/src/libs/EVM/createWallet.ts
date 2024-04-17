const bip39 = require('bip39');
import {  Wallet as WalletETH } from 'ethers';
import SaveListWallet, { ListWalletModel } from './SaveWallet';
import { JsonRpcProvider, Contract } from 'ethers';
import AsyncStorage from '@react-native-async-storage/async-storage';
 export async function generateMnemonic(): Promise<string> {
  try {
    const mnemonic = await bip39.generateMnemonic();
    return mnemonic;
  } catch (error) {
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
  const name = 'Account1';
  const walletModel: ListWalletModel = {
  name: name,
  addressWallet: address, // Thêm giá trị của addressWallet tại đây
  privateKey: privateKey, // Thêm giá trị của privateKey tại đây
  mnemonic: mnemonic, // Thêm giá trị của mnemonic tại đây
  };
  await AsyncStorage.setItem('EVMPrivateKey',privateKey);
  await AsyncStorage.setItem('EVMAddress',address);
  await AsyncStorage.setItem('EVMMnemonic',mnemonic);
  await AsyncStorage.setItem('EVMName',name);
  SaveListWallet.fullFlowSaveData({wallet:walletModel});
  console.log('Save Wallet');
}
export async function createWalletFromPrivateKey(privateKey: string){
  //Tạo lần đầu tiên
  try {
    let n = 1;
    const list = await SaveListWallet.getData();
    let isDuplicate = false;
    if (list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].privateKey === privateKey) {
          isDuplicate = true;
        }
      }
    }
    if (!isDuplicate) {
      n = n + list.length;
      const wallet = new WalletETH(privateKey);
      const address: string = wallet.address;
      const walletModel: ListWalletModel = {
      name: 'Account' + n,
      addressWallet: address, // Thêm giá trị của addressWallet tại đây
      privateKey: privateKey, // Thêm giá trị của privateKey tại đây
      mnemonic: '', // Thêm giá trị của mnemonic tại đây
      };
      SaveListWallet.fullFlowSaveData({wallet:walletModel});
      console.log('Save Wallet');
      return 1;
    }
    else {
      console.log('Wallet is exit');
      return 2;
    }
  }
  catch (error) {
    return;
  }
}
export async function addWalletFromMnemonic(mnemonic: string){
  try {
    let n = 1;
    const wallet = WalletETH.fromPhrase(mnemonic);
    const address : string = wallet.address;
    const privateKey : string = wallet.privateKey;
    const list = await SaveListWallet.getData();
    let isDuplicate = false;
    if (list.length > 0) {
      for (let i = 0; i < list.length; i++) {
        if (list[i].privateKey === privateKey) {
          isDuplicate = true;
        }
      }
    }
    if (!isDuplicate) {
      n = n + list.length;
      const walletModel: ListWalletModel = {
      name: 'Account' + n,
      addressWallet: address, // Thêm giá trị của addressWallet tại đây
      privateKey: privateKey, // Thêm giá trị của privateKey tại đây
      mnemonic: mnemonic, // Thêm giá trị của mnemonic tại đây
      };
      SaveListWallet.fullFlowSaveData({wallet:walletModel});
      console.log('Save Wallet');
      return 1;
    }
    else {
      console.log('Wallet is exit');
      return 2;
    }
  }
  catch (error) {
    // console.error('Error saving data:', error);
    // throw error;
    return;
  }
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
    } catch (error) {
      console.error('Error fetching token info:', error);
    }
  };







