import { JsonRpcProvider, Contract,Wallet as WalletETH, formatEther, ethers } from "ethers";
export async function SendCoinEVM() {
   const addressTo = '0x6dF9F81F6Ecf52aAeF4C018523A85472d9A72D48';
   const priavteKey = '0xaf2c05d68a462db06595e2e1d210c68d6d9a961b2f7ad601be3f66c915608314';
   const walletPriavteKey = new WalletETH(priavteKey);
   const provider = new JsonRpcProvider('https://bsc-testnet.publicnode.com');
   let wallet = walletPriavteKey.connect(provider);
   const tx = {
    to: addressTo,
    value: 0,
   };
   await wallet.sendTransaction(tx);
   console.log('demo');
}