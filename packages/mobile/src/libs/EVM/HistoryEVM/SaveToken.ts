import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ListTokenModel {
    chainId: string;
    tokens: {
        tokenAddress: string;
        symbol: string;
        decimals: number;
    }[];
}

class SaveListToken {
    static _key = 'LIST_TOKEN';

    static async fullFlowSaveData(token: { chainId: string; tokenAddress: string; symbol: string; decimals: number }): Promise<void> {
        try {
            let list = await this.getData();
            const existingChainIndex = list.findIndex(item => item.chainId === token.chainId);
            if (existingChainIndex !== -1) {
                const existingChain = list[existingChainIndex];
                const existingTokenIndex = existingChain.tokens.findIndex(t => t.tokenAddress === token.tokenAddress);
                if (existingTokenIndex !== -1) {
                    existingChain.tokens[existingTokenIndex] = token;
                } else {
                    existingChain.tokens.push(token);
                }
                list[existingChainIndex] = existingChain;
            } else {
                list.push({ chainId: token.chainId, tokens: [token] });
            }
            await this.saveData(list);
        } catch (error) {
            console.error('Error saving data:', error);
            throw error;
        }
    }

    static async saveData(list: ListTokenModel[]) {
        try {
            await AsyncStorage.setItem(this._key, JSON.stringify(list));
            console.log('Saved token successfully');
        } catch (error) {
            console.error('Error saving data:', error);
            throw error;
        }
    }

    static async getData(): Promise<ListTokenModel[]> {
        try {
            const listString = await AsyncStorage.getItem(this._key) ?? '';
            if (listString !== '') {
                const jsonArray = JSON.parse(listString);
                return jsonArray;
            }
            return [];
        } catch (error) {
            console.error('Error getting data:', error);
            throw error;
        }
    }

    static async clearData() {
        try {
            await AsyncStorage.removeItem(this._key);
            console.log('Cleared data successfully');
        } catch (error) {
            console.error('Error clearing data:', error);
            throw error;
        }
    }
}

export default SaveListToken;
