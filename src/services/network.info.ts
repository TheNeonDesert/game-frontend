// Just a hacky way we keep all chain/name/symbol/network/contract addresses all in one spot

// RINKEBY
export const networkInfo: NetworkInfo = {
  chainId: 0x4,
  providerUrl:
    'https://eth-rinkeby.alchemyapi.io/v2/' + process.env.RINKEBY_PROVIDER_ID,
  contracts: {
    altar: '0x13D211d31B61F00C825d04902fb1944D6ec512a7',
    avatar: '0x830a62F79A4A39634c20a356Dd6658d5CaB8A0Ca',
    neonToken: '0xC0436A43635BF00B72a853AD4674454D89D220d7',
  },
  local: false,
  rpcUrls: ['https://rinkeby.infura.io/v3/'],
  chainName: 'Rinkeby',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'ETH',
    decimals: 18,
  },
};

// the new/real harmony Devnet from discord... (this is the one to use!)
// websocket: ws.s0.ps.hmny.io
// api/rpc:  https://api.s0.ps.hmny.io/
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
