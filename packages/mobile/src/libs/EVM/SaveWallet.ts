import AsyncStorage from "@react-native-async-storage/async-storage";
export interface ListWalletModel {
  name: string;
  addressWallet: string;
  privateKey: string;
  mnemonic: string;
}
function listWalletModelFromJson(jsonString: string): ListWalletModel {
  const decoded = JSON.parse(jsonString);
  return {
    name: decoded.name,
    addressWallet: decoded.addressWallet,
    privateKey: decoded.privateKey,
    mnemonic: decoded.mnemonic,
  };
}
class SaveListWallet {
     static _key = 'LIST_WALLET';
   static async fullFlowSaveData({ wallet }: { wallet: ListWalletModel }): Promise<void> {
  try {
    const _list = await this.getData();
     console.log(_list.length);
    let _isDuplicate = false;
    if ((_list?.length ?? 0) > 0) {
      for (let i = 0; i < _list!.length; i++) {
        if (_list[i].privateKey === wallet.privateKey) {
          _isDuplicate = true;
          _list.splice(i, 1, wallet);
        }
      }

      if (!_isDuplicate) {
        _list.push(wallet);
      }
      console.log(_list.length);
      await this.saveData(_list);
      return;
    }
    // If length == 0
    _list?.push(wallet);
    await this.saveData(_list);
  } catch (error) {
    console.error('Error saving data:', error);
    throw error;
  }
}  
  static async saveData(list:ListWalletModel[]) {
    try {
      await AsyncStorage.setItem(this._key,JSON.stringify(list));
      console.log('Saved wallet successfully');
    } catch (error) {
      console.error('Error saving data:', error);
      throw error;
    }
  }  
  static async getData(): Promise<ListWalletModel[]> {
    try {
        const listString = await AsyncStorage.getItem(this._key) ?? '';
        if(listString != ''){
        const jsonArray = JSON.parse(listString);
        const list: ListWalletModel[] = jsonArray.map((item: any) => {
        return listWalletModelFromJson(JSON.stringify(item));
        });
        return list;
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
export default SaveListWallet;