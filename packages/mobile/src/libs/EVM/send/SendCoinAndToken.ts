import { Toast } from "@tonkeeper/uikit";
import { JsonRpcProvider, Contract,Wallet as WalletETH, parseEther } from "ethers";
export async function SendCoinEVM(addressTo, privateKey, rpc, amount) {
  // const addressTo = '0x6dF9F81F6Ecf52aAeF4C018523A85472d9A72D48';
  // const priavteKey = '0xaf2c05d68a462db06595e2e1d210c68d6d9a961b2f7ad601be3f66c915608314';
  const walletPrivateKey = new WalletETH(privateKey);
    const provider = new JsonRpcProvider(rpc);
  let wallet = walletPrivateKey.connect(provider);
  try {
    const tx = {
    to: addressTo,
    value: parseEther(amount),
    };
    const txHash = await wallet.sendTransaction(tx);
    console.log(txHash);
    Toast.success("Transaction success!!");
    // return 1;
  } 
  catch (error) {
    Toast.fail('Transaction failed!!');
    console.error('Error:', error);
    return 0;
  }
}

export async function SendTokenEVM(addressTo, privateKey, rpc, addressToken, amount){
  const abi = [
   "function transfer(address to, uint amount)"
   ]
  //  const addressTo = '0x6dF9F81F6Ecf52aAeF4C018523A85472d9A72D48';
  //  const priavteKey = '0xaf2c05d68a462db06595e2e1d210c68d6d9a961b2f7ad601be3f66c915608314';
   const walletPrivateKey = new WalletETH(privateKey);
   const provider = new JsonRpcProvider(rpc);
   let wallet = walletPrivateKey.connect(provider);
   const contract = new Contract(addressToken, abi, wallet)
   const value = parseEther(amount);
   try {
        const tx = await contract.transfer(addressTo, value);
        Toast.success("Transaction success!!");
    } catch (error) {
        Toast.fail('Transaction failed!!');
        console.error('Error:', error);
    }
}