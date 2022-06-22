// Just a hacky way we keep all chain/name/symbol/network/contract addresses all in one spot

// RINKEBY
// export const networkInfo: NetworkInfo = {
//   chainId: 0x4,
//   providerUrl:
//     'https://eth-rinkeby.alchemyapi.io/v2/' + process.env.RINKEBY_PROVIDER_ID,
//   contracts: {
//     altar: '0x13D211d31B61F00C825d04902fb1944D6ec512a7',
//     avatar: '0x830a62F79A4A39634c20a356Dd6658d5CaB8A0Ca',
//     neonToken: '0xC0436A43635BF00B72a853AD4674454D89D220d7',
//   },
//   local: false,
//   rpcUrls: ['https://rinkeby.infura.io/v3/'],
//   chainName: 'Rinkeby',
//   nativeCurrency: {
//     name: 'ETH',
//     symbol: 'ETH',
//     decimals: 18,
//   },
// };

// HARMONY DEVNET
export const networkInfo: NetworkInfo = {
  chainId: 0x635ae020,
  providerUrl: 'https://api.s0.ps.hmny.io/',
  contracts: {
    altar: '0x81Ac5b9E48C67c26e00e70011CDeBfBFB96E82A5',
    avatar: '0x0282F0F444Bbe5f570526c6f5C5eea75633feE68',
    neonToken: '0x8E6Dc2059cc6eb8A3f21Db4A6feb7fA13a6526DC',
    wilderness: '0xB27f488FDc6b0D75503cD017150509169b8A0598',

    stoneToken: '0x6EA32644866eFcE9e6FCC377a39975d41Fd0372A',
    stickToken: '0x45Aae9058CaebdCD0b0C7Edd48F381495C91d537',
    plantToken: '0xfB8768764eC3A77528b01c80ADFa0a967f60a01D',
    appleToken: '0x75cE930E5f0f15024b579A618510d1AaB1BB3EF5',
  },
  local: false,
  rpcUrls: ['https://api.s0.ps.hmny.io/'],
  chainName: 'Harmony Devnet',
  nativeCurrency: {
    name: 'ONE',
    symbol: 'ONE',
    decimals: 18,
  },
};

// the new/real harmony Devnet from discord... (this is the one to use!)
// websocket: ws.s0.ps.hmny.io
// api/rpc:
// faucet/explorer info : https://docs.harmony.one/home/developers/network-and-faucets
// chainid : 1666900000

// chainId = 31337; // hardhat
// chainId: '0x7A69',
// rpcUrls: [networkRPC],
// chainName: 'Hardhat',

// Harmony Testnet
// providerUrl = 'https://api.s0.b.hmny.io'; // Harmony Testnet
// chainId: '0x6357D2E0',
// rpcUrls: ['https://api.s0.b.hmny.io'],
// chainName: 'Harmony Testnet',
// nativeCurrency: {
//   name: 'ONE',
//   symbol: 'ONE',
//   decimals: 18,
// },
// chainId = 0x6357d2e0; // Harmony Testnet

// blockExplorerUrls: ["https://polygonscan.com/"]

export interface NetworkInfo {
  chainId: number;
  providerUrl: string;
  contracts: { [contract: string]: string };
  local: boolean;
  rpcUrls: string[];
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
}
