export const DataChains : any[]= [
   {
    type: "ton",
    chainId: "1100",
    name: "Ton",
    id: "the-open-network",
    logo: "https://pbs.twimg.com/profile_images/1758437914898292736/PFNZIPNB_400x400.jpg",
    currency: "TON",
    rpc: "https://toncenter.com/api/v2/jsonRPC",
    rpcBackup: "https://toncenter.com/api/v2/jsonRPC",
  },
  {
    type: "eth",
    chainId: "6001",
    name: "BounceBit",
    id: "bouncebit",
    logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPypMZ-ZbxLhda_Hcg0oGDhMiu8Dr9aPnCEg&s",
    currency: "BB",
    rpc: "https://fullnode-mainnet.bouncebitapi.com",
    rpcBackup: "https://fullnode-mainnet.bouncebitapi.com",
  },
  {
    type: "eth",
    chainId: "1285",
    name: "Moonriver",
    id: "moonriver",
    logo: "https://assets-global.website-files.com/62f34c32e8660c273054c17c/63eb2f6f8167112603ad7845_Frame%20229%205-min.png",
    currency: "MOVR",
    rpc: "https://moonriver.drpc.org",
    rpcBackup: "https://moonriver.drpc.org",
  },
  {
    type: "eth",
    chainId: "1",
    name: "Ethereum",
    id: "ethereum",
    logo: "https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png",
    currency: "ETH",
    rpc: "https://eth.drpc.org",
    rpcBackup: "https://mainnet.infura.io/v3/b6673e63957344c1882a407f12e89bec",
  },
   {
    type: "eth",
    chainId: "14",
    name: "Flare",
    id: "flare-networks",
    logo: "https://assets.coingecko.com/coins/images/28624/standard/FLR-icon200x200.png?1696527609",
    currency: "FLR",
    rpc: "https://rpc.ankr.com/flare",
    rpcBackup: "https://flare.rpc.thirdweb.com",
  },
  {
    type: "eth",
    chainId: "324",
    name: "zkSync Mainnet",
    id: "ethereum",
    logo: "https://static.okx.com/cdn/assets/imgs/233/304C4440A1D87D83.png",
    currency: "ETH",
    rpc: "https://1rpc.io/zksync2-era",
    rpcBackup: "https://zksync.meowrpc.com",
  },
  {
    type: "core",
    chainId: "1116",
    name: "Core Chain MainNet",
    id: "coredaoorg",
    logo: "https://i.imgur.com/MRyPUEL.png",
    currency: "CORE",
    rpc: "https://rpc-core.icecreamswap.com",
    rpcBackup: "https://rpc.coredao.org/",
  },
  {
    type: "pol",
    chainId: "137",
    name: "Polygon",
    id: "matic-network",
    logo: "https://seeklogo.com/images/P/polygon-matic-logo-1DFDA3A3A8-seeklogo.com.png",
    currency: "MATIC",
    rpc: "https://polygon.blockpi.network/v1/rpc/public",
    rpcBackup: "https://polygon-mainnet.infura.io/v3/b6673e63957344c1882a407f12e89be",
    
  },
  {
    type: "op",
    chainId: "10",
    name: "OP Mainnet",
    id: "optimism",
    logo: "https://assets.coingecko.com/coins/images/25244/large/Optimism.png?1696524385",
    currency: "ETH",
    rpc: "https://mainnet.optimism.io",
    rpcBackup: "https://optimism-mainnet.infura.io/v3/b6673e63957344c1882a407f12e89bec",
    
  },
  {
    type: "arb",
    chainId: "42161",
    name: "Arbitrum One",
    id: "arbitrum",
    logo: "https://assets.coingecko.com/coins/images/16547/large/photo_2023-03-29_21.47.00.jpeg?1696516109",
    currency: "ETH",
    rpc: "https://arbitrum.drpc.org",
    rpcBackup: "https://arbitrum-mainnet.infura.io/v3/b6673e63957344c1882a407f12e89bec",
    
  },
  {
    type: "avax",
    chainId: "43114",
    name: "Avalanche Network",
    id: "avalanche-2",
    logo: "https://assets.coingecko.com/coins/images/12559/large/Avalanche_Circle_RedWhite_Trans.png?1696512369",
    currency: "AVAX",
    rpc: "https://avalanche.drpc.org",
    rpcBackup: "https://api.avax.network/ext/bc/C/rpc",
    
  },
  {
    type: "bnb",
    chainId: "38",
    name: "BNB Smart Chain",
    id: "binancecoin",
    logo: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
    currency: "BNB",
    rpc: "https://bsc-dataseed1.binance.org/",
    rpcBackup: "https://bsc-dataseed1.binance.org/",
    
  },
  {
    type: "bnb",
    chainId: "97",
    name: "BNB Testnet",
    id: "binancecoin",
    logo: "https://cryptologos.cc/logos/bnb-bnb-logo.png",
    currency: "tBNB",
    rpc: "https://bsc-testnet-rpc.publicnode.com",
    rpcBackup: "https://bsc-testnet-rpc.publicnode.com",
    
  },
  {
    type: "ftm",
    chainId: "250",
    name: "Fantom",
    id: "fantom",
    logo: "https://assets.coingecko.com/coins/images/4001/large/Fantom_round.png?169650464",
    currency: "FTM",
    rpc: "https://fantom.drpc.org",
    rpcBackup: "https://fantom-rpc.publicnode.com",
    
  },
  {
    type: "metis",
    chainId: "1088",
    name: "Metis",
    id: "metis-token",
    logo: "https://assets.coingecko.com/coins/images/15595/large/Metis_Black_Bg.png?1702968192",
    currency: "METIS",
    rpc: "https://metis-pokt.nodies.app",
    rpcBackup: "https://andromeda.metis.io/?owner=1088",
    
  },
  {
    type: "celo",
    chainId: "42220",
    name: "Celo",
    id: "celo",
    logo: "https://assets.coingecko.com/coins/images/11090/large/InjXBNx9_400x400.jpg?1696511031",
    currency: "CELO",
    rpc: "https://1rpc.io/celo",
    rpcBackup: "https://rpc.ankr.com/celo",
    
  },
  {
    type: "cronos",
    chainId: "25",
    name: "Cronos",
    id: "crypto-com-chain",
    logo: "https://cronoscan.com/images/brandassets/logo.jpg?v=24.2.3.0",
    currency: "CRO",
    rpc: "https://evm.cronos.org",
    rpcBackup: "https://cronos.blockpi.network/v1/rpc/public",
    
  }

]