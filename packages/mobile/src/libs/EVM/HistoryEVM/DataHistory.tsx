import { Address } from "@tonkeeper/shared/Address";
import axios from "axios";

export const fetchDataTokens = async () => {
  try {
    const YourApiKeyToken = "AFB234BB-3D89-481E-91E9-4A60E8A11E63";
    const url = `https://api-testnet.bscscan.com/api?module=account&action=txlist&address=0xde0b295669a9fd93d5f28d9ec85e40f4cb697bae&startblock=0&endblock=99999999&page=1&offset=10&sort=asc&apikey=${YourApiKeyToken}`;
    const response = await axios.get(url);
    if (response.status === 200) {
      //   console.log("Data history", response.data);
      return response.data;
    } else {
      throw new Error("Fetch data token error: ");
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export interface TransactionModel {
  blockNumber?: string;
  timeStamp?: string;
  hash?: string;
  nonce?: string;
  blockHash?: string;
  transactionIndex?: string;
  from?: string;
  to?: string;
  value?: string;
  gas?: string;
  gasPrice?: string;
  isError?: string;
  txReceiptStatus?: string;
  input?: string;
  contractAddress?: string;
  cumulativeGasUsed?: string;
  gasUsed?: string;
  confirmations?: string;
  methodId?: string;
  functionName?: string;
}

export function createBSTransactionFromJson(json: any): TransactionModel {
  return {
    blockNumber: json["blockNumber"],
    timeStamp: json["timeStamp"],
    hash: json["hash"],
    nonce: json["nonce"],
    blockHash: json["blockHash"],
    transactionIndex: json["transactionIndex"],
    from: json["from"],
    to: json["to"],
    value: json["value"],
    gas: json["gas"],
    gasPrice: json["gasPrice"],
    isError: json["isError"],
    txReceiptStatus: json["txReceiptStatus"],
    input: json["input"],
    contractAddress: json["contractAddress"],
    cumulativeGasUsed: json["cumulativeGasUsed"],
    gasUsed: json["gasUsed"],
    confirmations: json["confirmations"],
    methodId: json["methodId"],
    functionName: json["functionName"] ?? '',
  };
}

export const getApiKey = (blockChainType: string) => {
  switch (blockChainType) {
    case "1":
      return "GNEBS2B7RXTCZMWBUIUJJ8VSWZBI9JT6UQ";
    case "10":
      return "GNEBS2B7RXTCZMWBUIUJJ8VSWZBI9JT6UQ";
    case "324":
      return "GNEBS2B7RXTCZMWBUIUJJ8VSWZBI9JT6UQ";
    case "56":
      return "AFB234BB-3D89-481E-91E9-4A60E8A11E63";
    case "137":
      return "Z3791WU5HIBZFXN1SX1BIK1ZFZB3BZG7SU";
    case "1116":
      return "215812fe7d774d8993b51fa4c3b128cc";
    case "97":
      return "AFB234BB-3D89-481E-91E9-4A60E8A11E63";
    case "250":
      return "FQJ3DXPBSYSH49A2S1BW945FFNU2MFKGTF";
    case "1088":
      return "";
    case "42220":
      return "UVHIDNSSG5XQ2E9SY14YNVSTQXWBV2RZY1";
    case "25":
      return "R9TQT3NANJ3HQ92WQSG6329MGRTHTQDC11";
    default:
      return "Invalid blockchain type";
  }
};

export const getApiUrl = (blockChainType: string) => {
  switch (blockChainType) {
    case "1":
      return "https://api.etherscan.io/api";
    // Ethereum API URL
    case "10":
      return "https://api.etherscan.io/api";
    case "324":
      return "https://api.etherscan.io/api";
    // Ethereum API URL
    case "56":
      return "https://api.bscscan.com/api";
    // CORE API URL
    case "1116":
      return "215812fe7d774d8993b51fa4c3b128cc";
    // BSC API URL
    case "97":
      return "https://api-testnet.bscscan.com/api";
    // POLYGON API URL
    case "137":
      return "https://api.polygonscan.com/api";
    case "250":
      return "https://api.ftmscan.com/api";
    case "1088":
      return "https://andromeda-explorer.metis.io/api";
    case "42220":
      return "https://api.celoscan.io/api";
    case "25":
      return "https://api.cronoscan.com/api";
    default:
      return "Invalid blockchain type";
  }
};
export const _buildRequestUrl = (apiUrl: string, address: string,apiKeyParam : string ) => {
    const module = 'account';
    const action = 'txlist';
    const addressParam = `address=${address}`;
    return apiKeyParam == ''
      ? `${apiUrl}?module=${module}&action=${action}&${addressParam}`
      : `${apiUrl}?module=${module}&action=${action}&${addressParam}&apikey=${apiKeyParam}`;
}

export const fetchTransactions = async (
  address: string,
  blockChainType: string
) => {
  try {
    if (blockChainType == "1100") {
      let response = await axios.get(
        `https://toncenter.com/api/v2/getTransactions?address=${address}&limit=20&to_lt=0&archival=true`
      );
      if (response.status == 200) {
        return response.data;
      } else {
        console.log("Failed to fetch transaction");
      }
    } else {
      const apiURL = getApiUrl(blockChainType);
      const apiKeyparams = getApiKey(blockChainType);
      const requestUrl =
        blockChainType == "1116"
          ? `https://openapi.coredao.org/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=5&sort=asc&apikey=215812fe7d774d8993b51fa4c3b128cc`
          : blockChainType == '43114'
                ? `https://avascan.info/blockchain/all/address/${address}/transactions`
                : blockChainType == '42161'
                    ? `https://arbiscan.io/address/${address}`
                    : _buildRequestUrl(apiURL, address, apiKeyparams);
      console.log(requestUrl);
      let response = await axios.get(requestUrl);
      if (response.status == 200) {
        return response.data;
      } else {
        blockChainType == "1116" ? `https://openapi.coredao.org/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=5&sort=asc&apikey=215812fe7d774d8993b51fa4c3b128cc` : "";
        console.log("Failed to fetch transaction");
      }
    }
  } catch (error) {
    throw new Error(error);
  }
};
