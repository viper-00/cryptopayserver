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

export const SOLANA_COINS: COIN[] = [
  {
    chainId: CHAINS.SOLANA,
    name: COINS.SOL,
    isMainCoin: true,
    symbol: COINS.SOL,
    decimals: 9,
    displayDecimals: 6,
    icon: '',
  },
  {
    chainId: CHAINS.SOLANA,
    name: COINS.WSOL,
    isMainCoin: false,
    symbol: COINS.WSOL,
    decimals: 9,
    displayDecimals: 6,
    contractAddress: 'So11111111111111111111111111111111111111112',
    icon: '',
  },
  {
    chainId: CHAINS.SOLANA,
    name: COINS.USDT,
    isMainCoin: false,
    symbol: COINS.USDT,
    decimals: 6,
    displayDecimals: 2,
    contractAddress: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
    icon: '',
  },
  {
    chainId: CHAINS.SOLANA,
    name: COINS.USDC,
    isMainCoin: false,
    symbol: COINS.USDC,
    decimals: 6,
    displayDecimals: 2,
    contractAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    icon: '',
  },
];

export const SOLANA_DEVNET_COINS: COIN[] = [
  {
    chainId: CHAINS.SOLANA,
    name: COINS.SOL,
    isMainCoin: true,
    symbol: COINS.SOL,
    decimals: 9,
    displayDecimals: 6,
    icon: '',
  },
  {
    chainId: CHAINS.SOLANA,
    name: COINS.USDC,
    isMainCoin: false,
    symbol: COINS.USDC,
    decimals: 6,
    displayDecimals: 2,
    contractAddress: 'Gh9ZwEmdLJ8DscKNTkTqPbNwLNNBjuSzaG9Vp2KGtKJr',
    icon: '',
  },
];

export type BLOCKCHAIN = {
  name: CHAINNAMES;
  chainId: CHAINIDS;
  explorerUrl?: string;
  websiteUrl?: string;
  isMainnet: boolean;
  rpc?: string[];
  icon?: any;

  coins: COIN[];

  time?: number;
};

export const BLOCKCHAINNAMES: BLOCKCHAIN[] = [
  {
    name: CHAINNAMES.BITCOIN,
    chainId: CHAINIDS.BITCOIN,
    explorerUrl: 'https://mempool.space',
    websiteUrl: 'https://bitcoin.org',
    isMainnet: true,
    coins: BITCOIN_COINS,
    rpc: ['https://mempool.space'],
    icon: '../btc.svg',
  },
  {
    name: CHAINNAMES.BITCOIN,
    chainId: CHAINIDS.BITCOIN_TESTNET,
    explorerUrl: 'https://mempool.space/testnet',
    websiteUrl: 'https://bitcoin.org',
    isMainnet: false,
    coins: BITCOIN_COINS,
    rpc: ['https://mempool.space/testnet'],
    icon: '../btc.svg',
  },
  {
    name: CHAINNAMES.ETHEREUM,
    chainId: CHAINIDS.ETHEREUM,
    explorerUrl: 'https://etherscan.io',
    websiteUrl: 'https://ethereum.org/en',
    isMainnet: true,
    coins: ETHEREUM_COINS,
    rpc: ['https://ethereum.publicnode.com'],
    icon: '../eth.svg',
  },
  {
    name: CHAINNAMES.ETHEREUM,
    chainId: CHAINIDS.ETHEREUM_SEPOLIA,
    explorerUrl: 'https://sepolia.etherscan.io',
    websiteUrl: 'https://ethereum.org/en',
    isMainnet: false,
    coins: ETHEREUM_SEPOLIA_COINS,
    rpc: ['https://ethereum-sepolia.publicnode.com'],
    icon: '../eth.svg',
  },
  {
    name: CHAINNAMES.SOLANA,
    chainId: CHAINIDS.SOLANA,
    explorerUrl: 'https://explorer.solana.com',
    websiteUrl: 'https://solana.com',
    isMainnet: true,
    coins: SOLANA_COINS,
    rpc: ['https://api.mainnet-beta.solana.com', 'https://rpc.ankr.com/solana'],
    icon: '../solana.svg',
  },
  {
    name: CHAINNAMES.SOLANA,
    chainId: CHAINIDS.SOLANA_DEVNET,
    explorerUrl: 'https://explorer.solana.com?cluster=devnet',
    websiteUrl: 'https://solana.com',
    isMainnet: false,
    coins: SOLANA_DEVNET_COINS,
    rpc: [
      // 'https://api.devnet.solana.com',
      // 'https://rpc.ankr.com/solana_devnet',
      'https://quiet-evocative-sanctuary.solana-devnet.quiknode.pro/9546a31f74b22b085dc30ae790d10b23014825af',
    ],
    icon: '../sol.svg',
  },
];
