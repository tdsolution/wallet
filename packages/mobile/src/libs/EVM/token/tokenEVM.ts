import { Contract, JsonRpcProvider, formatUnits } from "ethers";
import { DataTokens } from "./tokenData"
import SaveListToken from "../HistoryEVM/SaveToken";

export const getTokenListByChainID = (chainId : string) => {
    const selectedChain = DataTokens.find(chain => chain.chainId === chainId);
    return selectedChain ? selectedChain.tokens : [];
}

export const getTokenListImportByChainID = async (chainId : string) => {
  const listData = await SaveListToken.getData();
  const selectedChain = listData.find(chain => chain.chainId === chainId);
  return selectedChain ? selectedChain.tokens : [];
}

const abi =  [
   "function balanceOf(address owner) view returns (uint256)",
];
export async function getBalanceToken(rpc:string, addressToken : string, address: string){
    try {
      const provider = new JsonRpcProvider(rpc);
      const tokenContractAddress = addressToken; // Thay YOUR_TOKEN_CONTRACT_ADDRESS bằng địa chỉ smart contract của token
      const tokenContract =  new Contract(tokenContractAddress, abi, provider);
      const balance =  await tokenContract.balanceOf(address);
      const balancePrice =  formatUnits(balance, 18);
      return balancePrice;
    } catch (error) {
      return '0.0';
    }
}