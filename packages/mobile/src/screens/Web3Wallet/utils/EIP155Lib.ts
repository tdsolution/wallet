import { JsonRpcProvider, Wallet, TransactionRequest } from 'ethers';

/**
 * Types
 */
interface IInitArgs {
  mnemonic?: string;
}

/**
 * Library
 */
export default class EIP155Lib {
  wallet: Wallet;

  constructor(wallet: Wallet) {
    this.wallet = wallet;
  }

  static init({ mnemonic }: IInitArgs) {
    const wallet = mnemonic
      ? Wallet.fromPhrase(mnemonic)  // Updated method name
      : Wallet.createRandom();

    return new EIP155Lib(wallet);
  }

  getMnemonic() {
    return this.wallet.mnemonic.phrase;
  }

  getAddress() {
    return this.wallet.address;
  }

  signMessage(message: string) {
    return this.wallet.signMessage(message);
  }

  _signTypedData(domain: any, types: any, data: any) {
    return this.wallet.signTypedData(domain, types, data); // Updated method name
  }

  connect(provider: JsonRpcProvider) {
    return this.wallet.connect(provider);
  }

  signTransaction(transaction: TransactionRequest) {
    return this.wallet.signTransaction(transaction);
  }
}