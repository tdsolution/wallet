import { createContext, useState } from "react";
interface BalanceEvmContextType {
    balanceEVM: string;
    setBalanceEVM: React.Dispatch<React.SetStateAction<string>>;
}
export const BalanceEvmContext = createContext<BalanceEvmContextType | ''>('');
export const BalanceEvmProvider = ({ children }: any) => {
    const [balanceEvm, setBalanceEVM] = useState<string>('0');
    return (
        <BalanceEvmProvider value={{ balanceEvm, setBalanceEVM }}>
            {children}
        </BalanceEvmProvider>
    );
}