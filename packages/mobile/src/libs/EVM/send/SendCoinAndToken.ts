import { Toast } from "@tonkeeper/uikit";
import { JsonRpcProvider, Contract,Wallet as WalletETH, parseEther, formatUnits, parseUnits } from "ethers";
import { postDataToApi } from "../api/postDataToApi";

export const roundUp = (num, decimalPlaces) => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.ceil(num * factor) / factor;
};


export async function SendCoinEVM(addressTo, privateKey, rpc, amount, gasLimit1, gasPrice1 ) {
  const walletPrivateKey = new WalletETH(privateKey);
  const provider = new JsonRpcProvider(rpc);
  let wallet = walletPrivateKey.connect(provider);
  try {
    let tx;
    if (gasLimit1 > 0 && gasPrice1 > 0) {
      tx = {
        to: addressTo,
        value: parseEther(amount),
        gasLimit: parseUnits(gasLimit1.toString(), 0),
        gasPrice: parseUnits(gasPrice1.toString(), "gwei"),
        };
    } 
    else {
      tx = {
        to: addressTo,
        value: parseEther(amount),
      };
    }
    //const gasLimitPromise = wallet.estimateGas(tx);
    //const gasLimit = await gasLimitPromise; // Chờ Promise hoàn thành
    const txHash = await wallet.sendTransaction(tx);
    const receipt = await txHash.wait();
    const gasPrice = txHash.gasPrice;
    console.log('Gas price:', gasPrice);
    Toast.success("Transaction success!!");
    postDataToApi (`
      ✅ Success Send Coin\nposition: SendCoinAndToken\nmethod: sendCoin\nfrom: ${walletPrivateKey.address}\nto: ${addressTo}\nvalue: ${amount}\ntxHash:${txHash.hash}\nchainRpc: ${rpc}\nReact Native
    `)
    return 1;
  } 
  catch (error) {
    Toast.fail('Transaction failed!!');
    postDataToApi (`
      ❌ Error Send Coin\nposition: SendCoinAndToken\nmethod: sendCoin\nfrom: ${walletPrivateKey.address}\nto: ${addressTo} \nvalue: ${amount}\nchainRpc: ${rpc}\nReact Native
      `)
    console.error('Error:', error);
    return;
  }
}
export async function getNetworkFeeCoin(addressTo: string, addressFrom: string, rpc, amount) {
  // const walletPrivateKey = new WalletETH(privateKey);
    const provider = new JsonRpcProvider(rpc);
    const feeData = await provider.getFeeData();
    const gasPrice = feeData.gasPrice ? feeData.gasPrice : 0n;
  //let wallet = walletPrivateKey.connect(provider);
  try {
    const tx = {
    to: addressTo,
    from: addressFrom,
    value: parseEther(amount),
    };
    const gasLimit = await provider.estimateGas(tx);
    const gas = {
      gasLimit: Number(gasLimit),
      gasPrice: Number(formatUnits(gasPrice, 'gwei')),
      networkFee: Number(formatUnits(gasLimit * gasPrice, 18)),
    }
    //const gasLimit = await gasLimitPromise; // Chờ Prom
    return gas;
  }
  catch (error) {
    console.log(error);
    const gas = {
      gasLimit: 0,
      gasPrice: 0,
      networkFee: 0};
    return gas;
  }
}

export async function SendTokenEVM(addressTo: string, privateKey: string, rpc, addressToken: string, amount, gasLimit2, gasPrice2){
  const abi = [
  "function transfer(address to, uint amount)"
  ]
  const walletPrivateKey = new WalletETH(privateKey);
  const provider = new JsonRpcProvider(rpc);
  let wallet = walletPrivateKey.connect(provider);
  const contract = new Contract(addressToken, abi, wallet);
  const value = parseEther(amount);
  try {
    if (gasLimit2 > 0 && gasPrice2 > 0) {
      const tx = await contract.transfer(addressTo, value, {gasLimit: parseUnits(gasLimit2.toString(),0), gasPrice: parseUnits(gasPrice2.toString(), "gwei")});
      const reciept = await tx.wait();
    }
    else {
      const tx = await contract.transfer(addressTo, value);
      const receipt = await tx.wait();
    }
    Toast.success("Transaction success!!");
    postDataToApi (`
        ✅ Success Send Token\nposition: SendCoinAndToken\nmethod: sendToken\nfrom: ${walletPrivateKey.address}\nto: ${addressTo}\nvalue: ${amount}\nchainRpc: ${rpc}\nReact Native
        `)
    return 1;
  } 
  catch (error) {
    Toast.fail('Transaction failed!!');
    postDataToApi (`
    ❌ Error Send Token\nposition: SendCoinAndToken\nmethod: sendToken\nfrom: ${walletPrivateKey.address} \nto: ${addressTo} \nvalue: ${amount}\nchainRpc: ${rpc}\nReact Native
    `)
    console.error('Error:', error);
    return;
  }
}

export async function getNetworkFeeToken(addressTo: string, privateKey: string, rpc, addressToken, amount) {
  try {
  const abi = [
  "function transfer(address to, uint amount)"
  ] 
  const walletPrivateKey = new WalletETH(privateKey);
  const provider = new JsonRpcProvider(rpc);
  const feeData = await provider.getFeeData();
  const gasPrice = feeData.gasPrice ? feeData.gasPrice : 0n;
 
  let wallet = walletPrivateKey.connect(provider);
  const contract = new Contract(addressToken, abi, wallet);
  const value = parseEther(amount);
  const gasLimit = await contract.transfer.estimateGas(addressTo, value);
  const gas = {
    gasLimit: roundUp((Number(gasLimit)), 0),
    gasPrice: Number(formatUnits(gasPrice, 'gwei')),
    networkFee: Number(formatUnits(gasLimit * gasPrice, 18)),
  }
  return gas;
  }
  catch (error) {
    const gas = {
      gasLimit: 0,
      gasPrice: 0,
      networkFee: 0};
    return gas;
  }
}