// import {Contract, JsonRpcProvider ,  Wallet as WalletETH } from 'ethers';

// export async function swapTokenDeposit() {
//     try {
//        const privateKey = '0xaf2c05d68a462db06595e2e1d210c68d6d9a961b2f7ad601be3f66c915608314';
//        const provider = new JsonRpcProvider('https://bsc-testnet.publicnode.com');
//        const wallet = new WalletETH(privateKey, provider);
//        const contractAddress = '0xae13d989dac2f0debff460ac112a837c89baa7cd'; 
//        const contract = new Contract(contractAddress, contractAbi, wallet);
//        const symbol =  await contract.name();
//        console.log(symbol);
//        contract.on('Transfer', (from, to, value, event) => {
//        console.log('Transfer event triggered:', {
//         from: from,
//         to: to,
//         value: value.toString(),
//         data: event,
//        });
//     });
//     } catch (error) {
//         console.error('Error:', error);
//         throw error;
//     }
// }
// const contractAbi = [
//   "function name() view returns (string)",
//   "event Transfer(address indexed from, address indexed to, uint amount)"
// ];

// import {ChainId, Token, TokenAmount, Fetcher, Route, Trade, TradeType, Percent } from  '@depay/web3-exchanges-evm';
// import { JsonRpcProvider } from 'ethers';
// const slippageTolerance = new Percent('50', '10000'); 

// const chainId = 1;
// const provider = new JsonRpcProvider('https://bsc-testnet.publicnode.com');
 
// async function swapTokenDeposit() {
//     try {
//         const amountIn = '10000000000000';
//         // lấy thông tin token và coin
//         const tokenIn = new Token(chainId,'0xae13d989dac2f0debff460ac112a837c89baa7cd');
//         const tokenOut = Token.BSC;
//         // Fetch thông tin về đường đi
//         const pair = await Fetcher.fetchPairData(tokenIn, tokenOut, provider);
//         const route = new Route([pair], tokenIn);
//         const trade = new Trade(route, new TokenAmount(tokenIn, amountIn), TradeType.EXACT_INPUT);
//         // Thực hiện giao dịch swap
//         const slippageAdjustedAmountOut = trade.minimumAmountOut(slippageTolerance);
//         const path = [tokenIn.address, tokenOut.address];
//         const deadline = Math.floor(Date.now() / 1000) + 60 * 20; // 20 minutes from the current Unix time
//         const value = trade.inputAmount.raw.toString();
//         // const tx = await Fetcher.swapExactTokensForETH(value, slippageAdjustedAmountOut.raw.toString(), path, 
//         // ethers.Wallet.createRandom().address, deadline, provider);

//         // // console.log('Swap transaction:', tx);
//         // // return tx;

//     } catch (error) {
//         console.error('Error:', error);
//         throw error;
//     }
// }