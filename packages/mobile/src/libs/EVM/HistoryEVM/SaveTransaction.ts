import AsyncStorage from "@react-native-async-storage/async-storage";

export interface TransactionModel {
  unSwap?: boolean;
  amount?: string;
  fromAddress?: string;
  toAddress?: string;
  idxChain?: number;
  isRead?: boolean;
  name?: string;
  symbol?: string;
  time?: string;
}

class SaveTransaction {
  static _key = "LIST_TRANSACTION";

  static async fullFlowSaveData(transactions: TransactionModel[]): Promise<void> {
    try {
      let list = await this.getData();
      transactions.forEach(transaction => {
        list.push(transaction);
      });
      await this.saveData(list);
    } catch (error) {
      console.error("Error saving data:", error);
      throw error;
    }
  }

  static async saveData(list: TransactionModel[]) {
    try {
      await AsyncStorage.setItem(this._key, JSON.stringify(list));
      console.log("Saved transaction successfully");
    } catch (error) {
      console.error("Error saving data:", error);
      throw error;
    }
  }

  static async getData(): Promise<TransactionModel[]> {
    try {
      const listString = (await AsyncStorage.getItem(this._key)) ?? "";
      if (listString !== "") {
        const jsonArray = JSON.parse(listString);
        return jsonArray;
      }
      return [];
    } catch (error) {
      console.error("Error getting data:", error);
      throw error;
    }
  }

  static async clearData() {
    try {
      await AsyncStorage.removeItem(this._key);
      console.log("Cleared data successfully");
    } catch (error) {
      console.error("Error clearing data:", error);
      throw error;
    }
  }
}

export default SaveTransaction;
