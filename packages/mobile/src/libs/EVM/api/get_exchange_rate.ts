import axios from 'axios';

export async function fetchExchangeRate (){
    try {
        const toCurrency = 'usd'; // Loại tiền tệ cần chuyển đổi
        const stringIds = 'orbit-bridge-klaytn-usdc,fantom,metis-token,celo,crypto-com-chain,the-open-network,tron,berachain-bera,optimism,wmatic,wrapped-core,weth,binancecoin,wbnb,ethereum,tether,usd-coin,shiba-inu,coredaoorg,matic-network,arbitrum,avalanche-2';
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${stringIds}&vs_currencies=${toCurrency}&include_24hr_change=true`;
        const response = await axios.get(url);
        if(response.status === 200){
            const data = JSON.stringify(response.data);
            console.log(data);
            return data;
        }else{
            throw new Error('Failed to fetch exchange rate.');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

import AsyncStorage from "@react-native-async-storage/async-storage";
interface CoinRate {
    id: string;
    usd: string;
    usdChange: string;
}

export function coinRateModelFromJson(jsonString: string): CoinRate[] {
    const decoded: { [key: string]: { usd?: number, usd_24h_change?: number } } = JSON.parse(jsonString);
    const coinRates: CoinRate[] = Object.entries(decoded).map(([key, value]) => {
        const usd = value.usd !== undefined ? value.usd.toFixed(2) : '0.00';
        const usdChange = value.usd_24h_change !== undefined ? value.usd_24h_change.toFixed(2) : '0.00';
        return {
            id: key,
            usd,
            usdChange
        };
    });
    return coinRates;
}
 function convertListToNestedJson(jsonListString:string) {
   const jsonArray : {id: string, usd: string, usdChange:string}[] = JSON.parse(jsonListString);
   const result : {[key: string]: {usd: number, usd_24h_change: number}} = {};
   for (const entry of jsonArray){
    const id : string  = entry.id;
    const usd : number = parseFloat(entry.usd);
    const usdChange : number = parseFloat(entry.usdChange);
    result[id] = {usd, usd_24h_change: usdChange};
   }
   return JSON.stringify(result);
}
class SaveListCoinRate {
   static _key = 'LIST_COIN_RATE';

  static async getCoinRateById(coinId: string): Promise<CoinRate | null> {
    try {
        const coinRates = await this.getData();
        const foundCoin = coinRates.find(coin => coin.id === coinId);
        return foundCoin !== undefined ? foundCoin : null;
    } catch (error) {
        console.error('Error getting coin rate by ID:', error);
        throw error; // Optionally, rethrow the error for the caller to handle
    }
}
   static async fullFlowSaveData(): Promise<void>{
     const _list = await this.getData();
     if(!_list || _list.length === 0){
        try {
            let coinRates = await fetchExchangeRate();
            if(coinRates != null){
              await this.saveData(coinRates);
            }
        } catch (error) {
            console.error(error);
        }
     }else{
        const jsonData = JSON.stringify(_list);
        const nestedJsonString = convertListToNestedJson(jsonData);
        await this.saveData(nestedJsonString);
     }
   }

   static async getData(): Promise<CoinRate[]>{
    try {
        const listString = await AsyncStorage.getItem(this._key) ?? '';
        if(listString !== null){
        const coinRates: CoinRate[] = coinRateModelFromJson(listString);
        return coinRates;
        }
        return [];
       
    } catch (error) {
       console.error('Error clearing data', error);
       return [];
    }
   }
   static async saveData (jsonData: string) : Promise<void>{
      try {
        await AsyncStorage.setItem(this._key, jsonData);
      } catch (error) {
        console.error(error);
      }
   }
   static async clearData(){
    try {
        await AsyncStorage.removeItem(this._key);
        console.log('Cleared data successfully!')
    } catch (error) {
        console.error('Error clearing data', error);
        throw error;
    }
   }
}
export default SaveListCoinRate;


