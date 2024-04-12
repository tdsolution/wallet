import { JsonRpcProvider, formatUnits } from 'ethers';
import { String } from 'lodash';
import  {useState, useEffect} from 'react';
import SaveListCoinRate from './api/get_exchange_rate';

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
      return balancePrice;
    }
  } catch (error) {
    return '0.0';
  }
}
export function formatCurrency(balance: number): string {
    console.log(balance);
    try {
        const f = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
        const numberAfterParse = f.format(balance);
        const finalNumber: string[] = [];

        // Handling cases where balance is less than 1 and greater than 0
        if (balance < 1 && balance > 0) {
            return `$${balance.toFixed(6)}`;
        } else {
            for (let i = 0; i < numberAfterParse.length; i++) {
                if (numberAfterParse[i] !== ',' && numberAfterParse[i] !== '.') {
                    finalNumber.push(numberAfterParse[i]);
                }

                if (numberAfterParse[i] === ',') {
                    finalNumber.push('.');
                }

                if (numberAfterParse[i] === '.') {
                    finalNumber.push(',');
                }
            }
        }

        return finalNumber.join('').replace(/,00/g, '');
    } catch (e) {
        return '';
    }
}
export function useBalanceEVMDemo(walletAddress: string, rpc: string, coinId: string){
 const [balanceEVM, setBalanceEVM] = useState<number>(0);
 useEffect(()=>{
  async function fetchBalance(){
    const balance = await fetchBalaceEvm(walletAddress,rpc) ?? 0.0;
    const coinRate = await SaveListCoinRate.getCoinRateById(coinId);
    const rateUsd = coinRate?.usd ?? '0';
    if(coinRate != null){
    const balanceUsd = (parseFloat(balance) * parseFloat(rateUsd));
    console.log('balance'+balance);
    console.log('rateUsd'+rateUsd);
    console.log('coinId '+coinId);
     setBalanceEVM(balanceUsd);
    }
  }
  fetchBalance();
 },[walletAddress,rpc]);
 return balanceEVM;
}
