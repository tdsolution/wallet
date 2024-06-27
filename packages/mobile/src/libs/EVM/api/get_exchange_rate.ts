import axios from 'axios';
export async function getTokenTrend(){
    try {
        const url = 'https://api.dextools.io/v1/token?chain=polygon&address=0x12016b4E07866c962e29b7597eCd66B3B89a3a58';
        const response = await axios.get(url, 
            {
            headers: {
            'accept': 'application/json',
            'X-API-Key': '01e54e9712d16936f7a4a333fc6c789f',
          },
            }
        );
        if(response.status === 200){
            const data = JSON.stringify(response.data);
           console.log(data['data']['reprPair']['price']);
            return data['data']['reprPair']['price'];
        }else{
             return '0.0';
        }
    } catch (error) {
        console.error(error);
        return '0.0';
    }
}
export async function getTokenCST(){
    try {
        const url = 'https://api.dextools.io/v1/token?chain=coredao&address=0xc24b642357d7dd1bbe33f3d8aa0101dfa2cf6eb9';
        const response = await axios.get(url, 
            {
            headers: {
            'accept': 'application/json',
            'X-API-Key': '01e54e9712d16936f7a4a333fc6c789f',
          },
            }
        );
        if(response.status === 200){
            const data = JSON.parse(response.data);
            console.log(data.data);
            // const price = data1.data.reprPair.price;
            // console.log(price);
            return 'price';
        }else{
             return '0.0';
        }
    } catch (error) {
        return 'error';
    }
}
// https://api.coingecko.com/api/v3/simple/price?ids=movr&vs_currencies=usd&include_24hr_change=true
export async function fetchExchangeRate (){
    try {
        const toCurrency = 'usd'; // Loại tiền tệ cần chuyển đổi
        const stringIds = 'moonriver,wrapped-flare,flare-networks,orbit-bridge-klaytn-usdc,fantom,metis-token,celo,crypto-com-chain,the-open-network,tron,berachain-bera,optimism,wmatic,wrapped-core,weth,binancecoin,wbnb,ethereum,tether,usd-coin,shiba-inu,coredaoorg,matic-network,arbitrum,avalanche-2,bouncebit,bouncebit-usd,bouncebit-btc';
        const url = `https://api.coingecko.com/api/v3/simple/price?ids=${stringIds}&vs_currencies=${toCurrency}&include_24hr_change=true`;
        //console.log("dau cho"+ url);
        const response = await axios.get(url);
        if(response.status === 200){
            const data = JSON.stringify(response.data);
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
         try {
            let coinRates = await fetchExchangeRate();
            if(coinRates != null){
              await this.saveData(coinRates);
            }
        } catch (error) {
            const jsonData = JSON.stringify(_list);
            const nestedJsonString = convertListToNestedJson(jsonData);
            await this.saveData(nestedJsonString);
        }
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


