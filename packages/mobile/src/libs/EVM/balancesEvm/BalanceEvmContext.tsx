import { createContext, useState } from "react";
interface BalanceEvmContextType {
    balanceEVM: number;
    setBalanceEVM: React.Dispatch<React.SetStateAction<number>>;
}
export const BalanceEvmContext = createContext<BalanceEvmContextType | undefined>(undefined);
export const BalanceEvmProvider = ({ children }: any) => {
    const [balanceEvm, setBalanceEVM] = useState<number>(0);
    return (
        <BalanceEvmProvider value={{ balanceEvm, setBalanceEVM }}>
            {children}
        </BalanceEvmProvider>
    );
}