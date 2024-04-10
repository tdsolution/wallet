import { JsonRpcProvider, formatUnits } from 'ethers';
import  {useState, useEffect} from 'react';

interface BalanceEVMData {
  balanceEVM : number;
}
async function fetchBalaceEvm(walletAddress : string, rpc: string) {
  try {
    const provider = new JsonRpcProvider(rpc);
    const balanceResponse = await provider.getBalance(walletAddress);
    const balancePrice =  formatUnits(balanceResponse, 18);
    console.log(balancePrice);
    if(balancePrice == '0.0'){
       return '0.0';
    }else{
      const parsedNumber = parseFloat(balancePrice); // Chuyển đổi chuỗi thành số
      const formattedNumber = parsedNumber.toFixed(4);
      return formattedNumber;
    }
  } catch (error) {
    console.error(error);
    return '0.0';
  }
}
export function useBalanceEVMDemo(walletAddress: string, rpc: string){
 const [balanceEVM, setBalanceEVM] = useState<string>('0');
 useEffect(()=>{
  async function fetchBalance(){
    const balance = await fetchBalaceEvm(walletAddress,rpc) ?? 0.0;
    setBalanceEVM(balance);
  }
  fetchBalance();
 },[walletAddress,rpc]);
 return balanceEVM;
}
