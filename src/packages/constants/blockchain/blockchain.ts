import { CHAINNAMES, CHAINS, CHAINIDS } from './chain';
import { COINS } from './coin';

export type COIN = {
  chainId: CHAINS;
  name: COINS;
  isMainCoin: boolean;
  symbol: COINS;
  contractAddress?: string;
  decimals: number;
  displayDecimals: number;
  icon: any;
};

export const BITCOIN_COINS: COIN[] = [
  {
    chainId: CHAINS.BITCOIN,
    name: COINS.BTC,
    isMainCoin: true,
    symbol: COINS.BTC,
    decimals: 8,
    displayDecimals: 8,
    icon: '',
    contractAddress: "",
  },
];

export const ETHEREUM_COINS: COIN[] = [
  {
    chainId: CHAINS.ETHEREUM,
    name: COINS.ETH,
    isMainCoin: true,
    symbol: COINS.ETH,
    decimals: 18,
    displayDecimals: 8,
    contractAddress: '0x0000000000000000000000000000000000000000',
    icon: '',
  },
  {
    chainId: CHAINS.ETHEREUM,
    name: COINS.USDT,
    isMainCoin: false,
    symbol: COINS.USDT,
    decimals: 6,
    displayDecimals: 2,
    contractAddress: '0xdac17f958d2ee523a2206206994597c13d831ec7',
    icon: '',
  },
  {
    chainId: CHAINS.ETHEREUM,
    name: COINS.USDC,
    isMainCoin: false,
    symbol: COINS.USDC,
    decimals: 6,
    displayDecimals: 2,
    contractAddress: '0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
    icon: '',
  },
  {
    chainId: CHAINS.ETHEREUM,
    name: COINS.DAI,
    isMainCoin: false,
    symbol: COINS.DAI,
    decimals: 18,
    displayDecimals: 2,
    contractAddress: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
    icon: '',
  },
  {
    chainId: CHAINS.ETHEREUM,
    name: COINS.SHIB,
    isMainCoin: false,
    symbol: COINS.SHIB,
    decimals: 18,
    displayDecimals: 8,
    contractAddress: '0x95aD61b0a150d79219dCF64E1E6Cc01f0B64C4cE',
    icon: '',
  },
  {
    chainId: CHAINS.ETHEREUM,
    name: COINS.LINK,
    isMainCoin: false,
    symbol: COINS.LINK,
    decimals: 18,
    displayDecimals: 8,
    contractAddress: '0x514910771AF9Ca656af840dff83E8264EcF986CA',
    icon: '',
  },
  {
    chainId: CHAINS.ETHEREUM,
    name: COINS.UNI,
    isMainCoin: false,
    symbol: COINS.UNI,
    decimals: 18,
    displayDecimals: 8,
    contractAddress: '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
    icon: '',
  },
  {
    chainId: CHAINS.ETHEREUM,
    name: COINS.WBTC,
    isMainCoin: false,
    symbol: COINS.WBTC,
    decimals: 8,
    displayDecimals: 8,
    contractAddress: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
    icon: '',
  },
  {
    chainId: CHAINS.ETHEREUM,
    name: COINS.WETH,
    isMainCoin: false,
    symbol: COINS.WETH,
    decimals: 18,
    displayDecimals: 8,
    contractAddress: '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
    icon: '',
  },
];

export const ETHEREUM_SEPOLIA_COINS: COIN[] = [
  {
    chainId: CHAINS.ETHEREUM,
    name: COINS.ETH,
    isMainCoin: true,
    symbol: COINS.ETH,
    decimals: 18,
    displayDecimals: 8,
    contractAddress: '0x0000000000000000000000000000000000000000',
    icon: '',
  },
  {
    chainId: CHAINS.ETHEREUM,
    name: COINS.USDT,
    isMainCoin: false,
    symbol: COINS.USDT,
    decimals: 6,
    displayDecimals: 2,
    contractAddress: '0xf93D3ae82636bD3d2f62C3EcE339F2171f022Fc0',
    icon: '',
  },
  {
    chainId: CHAINS.ETHEREUM,
    name: COINS.USDC,
    isMainCoin: false,
    symbol: COINS.USDC,
    decimals: 6,
    displayDecimals: 2,
    contractAddress: '0x9b9064B41D71fba74833f921a7ab1E248095648C',
    icon: '',
  },
  {
    chainId: CHAINS.ETHEREUM,
    name: COINS.DAI,
    isMainCoin: false,
    symbol: COINS.DAI,
    decimals: 18,
    displayDecimals: 2,
    contractAddress: '0x65f0A9f3506B7248e568d1C6EFFbCFC93f82A02C',
    icon: '',
  },
];

type BLOCKCHAIN = {
  name: CHAINNAMES;
  chainId: CHAINIDS;
  explorerUrl?: string;
  websiteUrl?: string;
  isMainnet: boolean;
  rpc?: string[];

  coins: COIN[];
};

export const BLOCKCHAINNAMES: BLOCKCHAIN[] = [
  {
    name: CHAINNAMES.BITCOIN,
    chainId: CHAINIDS.BITCOIN,
    explorerUrl: '',
    websiteUrl: '',
    isMainnet: true,
    coins: BITCOIN_COINS,
  },
  {
    name: CHAINNAMES.BITCOIN,
    chainId: CHAINIDS.BITCOIN_TESTNET,
    explorerUrl: '',
    websiteUrl: '',
    isMainnet: false,
    coins: BITCOIN_COINS,
  },
  {
    name: CHAINNAMES.ETHEREUM,
    chainId: CHAINIDS.ETHEREUM,
    explorerUrl: '',
    websiteUrl: '',
    isMainnet: true,
    coins: ETHEREUM_COINS,
    rpc: ['https://ethereum.publicnode.com'],
  },
  {
    name: CHAINNAMES.ETHEREUM,
    chainId: CHAINIDS.ETHEREUM_SEPOLIA,
    explorerUrl: '',
    websiteUrl: '',
    isMainnet: false,
    coins: ETHEREUM_SEPOLIA_COINS,
    rpc: ['https://ethereum-sepolia.publicnode.com'],
  },
];
