import { Toast } from "@tonkeeper/uikit";
import { JsonRpcProvider, Contract,Wallet as WalletETH, parseEther, formatUnits } from "ethers";

export async function SendCoinEVM(addressTo, privateKey, rpc, amount) {
  const walletPrivateKey = new WalletETH(privateKey);
    const provider = new JsonRpcProvider(rpc);
  let wallet = walletPrivateKey.connect(provider);
  try {
    const tx = {
    to: addressTo,
    value: parseEther(amount),
    };
    const gasLimitPromise = wallet.estimateGas(tx);
    const gasLimit = await gasLimitPromise; // Chờ Promise hoàn thành
    const txHash = await wallet.sendTransaction({...tx, gasLimit:gasLimit});
    const gasPrice = txHash.gasPrice;
    console.log('Gas price:', gasPrice);
    Toast.success("Transaction success!!");
  } 
  catch (error) {
    Toast.fail('Transaction failed!!');
    console.error('Error:', error);
    return 0;
  }
}
export async function GasLimitPromise(addressTo, privateKey, rpc, amount) {
  const walletPrivateKey = new WalletETH(privateKey);
    const provider = new JsonRpcProvider(rpc);
  let wallet = walletPrivateKey.connect(provider);
  try {
    const tx = {
    to: addressTo,
    value: parseEther(amount),
    };
    const gasLimitPromise = wallet.estimateGas(tx);
    const gasLimit = await gasLimitPromise; // Chờ Prom
    return formatUnits(gasLimit, 9);
  }
  catch (error) {
    return '0';
  }
}

export async function SendTokenEVM(addressTo, privateKey, rpc, addressToken, amount){
  const abi = [
   "function transfer(address to, uint amount)"
   ]
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