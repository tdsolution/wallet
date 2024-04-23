
export const buildTransactionUrl = (address: string, blockchainType: string): string => {
  switch (blockchainType) {
    case '1':
      return `https://etherscan.io/address/${address}`;
    case '324':
      return `https://explorer.zksync.io/address/${address}`;
    case '56':
      return `https://bscscan.com/address/${address}`;
    case '1116':
      return `https://scan.coredao.org/address/${address}`;
    case '97':
      return `https://testnet.bscscan.com/address/${address}`;
    case '10':
      return `https://optimistic.etherscan.io/address/${address}`;
    case '137':
      return `https://polygonscan.com/address/${address}`;
    // case '1000':
    //   return `https://tronscan.org/#/address/${AppDataGlobal.ADDRESS_TRON}`;
    // case '1100':
    //   return `https://tonscan.org/address/${AppDataGlobal.ADDRESS_TON}`;
    case '43114':
      return `https://avascan.info/blockchain/dfk/address/${address}/transactions`;
    case '42161':
      return `https://arbiscan.io/address/${address}`;
    case '250':
      return `https://ftmscan.com/address/${address}`;
    case '1088':
      return `https://explorer.metis.io/address/${address}`;
    case '42220':
      return `https://celoscan.io/address/${address}`;
    case '25':
      return `https://cronoscan.com/address/${address}`;
    default:
      throw new Error('Invalid blockchain type');
  }
};