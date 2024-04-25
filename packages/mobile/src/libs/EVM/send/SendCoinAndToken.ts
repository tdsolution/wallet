import { Toast } from "@tonkeeper/uikit";
import { JsonRpcProvider, Contract,Wallet as WalletETH, parseEther } from "ethers";
export async function SendCoinEVM() {
   const addressTo = '0x6dF9F81F6Ecf52aAeF4C018523A85472d9A72D48';
   const priavteKey = '0xaf2c05d68a462db06595e2e1d210c68d6d9a961b2f7ad601be3f66c915608314';
   const walletPriavteKey = new WalletETH(priavteKey);
      const provider = new JsonRpcProvider('https://bsc-testnet.publicnode.com');
   let wallet = walletPriavteKey.connect(provider);
   const tx = {
    to: addressTo,
    value: parseEther('0'),
   };
   const txHash = await wallet.sendTransaction(tx);
   console.log(txHash);
}
export async function SendTokenEVM(){
  const abi = [
   "function transfer(address to, uint amount)"
   ]
   const addressTo = '0x6dF9F81F6Ecf52aAeF4C018523A85472d9A72D48';
   const priavteKey = '0xaf2c05d68a462db06595e2e1d210c68d6d9a961b2f7ad601be3f66c915608314';
   const walletPriavteKey = new WalletETH(priavteKey);
   const provider = new JsonRpcProvider('https://bsc-testnet.publicnode.com');
   let wallet = walletPriavteKey.connect(provider);
   const contract = new Contract("0x0221144D770De4ca55D0a9B7306cA8BF7FB8B805", abi, wallet)
   const amount = parseEther('0.0001');
   try {
        const tx = await contract.transfer(addressTo, amount);
        Toast.success("Transaction success!!");
    } catch (error) {
        Toast.fail('Transaction failed!!');
        console.error('Error:', error);
    }
}