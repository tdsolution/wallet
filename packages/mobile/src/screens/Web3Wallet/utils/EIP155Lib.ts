import { Wallet as WalletE, JsonRpcProvider, TransactionRequest,} from 'ethers';

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
  wallet: WalletE;

  constructor(wallet: WalletE) {
    this.wallet = wallet;
  }

  static init({mnemonic}: IInitArgs) {
    const wallet = mnemonic
      ? WalletE.fromPhrase(mnemonic)
      : WalletE.createRandom();

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
    return this.wallet._signTypedData(domain, types, data);
  }

  connect(provider: JsonRpcProvider) {
    return this.wallet.connect(provider);
  }

  signTransaction(transaction: TransactionRequest) {
    return this.wallet.signTransaction(transaction);
  }
}