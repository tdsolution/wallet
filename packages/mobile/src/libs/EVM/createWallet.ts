const bip39 = require('bip39');
import { Wallet as WalletETH } from 'ethers';
import SaveListWallet, { ListWalletModel } from './SaveWallet';
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
export async function createWalletFromPrivateKey(privateKey: string){
  // Tạo lần đầu tiên
  // const list = await SaveListWallet.getData();
  // if(list.length > 0){
  //  SaveListWallet.clearData();
  // }
  const wallet = new WalletETH(privateKey);
  const address : string = wallet.address;
  const walletModel: ListWalletModel = {
  name: 'Account2',
  addressWallet: address, // Thêm giá trị của addressWallet tại đây
  privateKey: privateKey, // Thêm giá trị của privateKey tại đây
  mnemonic: '', // Thêm giá trị của mnemonic tại đây
  };
  await AsyncStorage.setItem('EVMPrivateKey',JSON.stringify(privateKey));
  await AsyncStorage.setItem('EVMAddress',JSON.stringify(address));
  await AsyncStorage.setItem('EVMMnemonic',JSON.stringify(''));
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




