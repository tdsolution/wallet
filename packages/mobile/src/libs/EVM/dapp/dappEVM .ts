import { DataDapp } from "./dataDapp";

export const getDappListByChainID = (chainId : string) => {
    const selectedChain = DataDapp.find(chain => chain.chainId === chainId);
    return selectedChain ? selectedChain.dapps : [];
}