// chainId
export const CHAINIDS = {
  ETH_MAINNET: 1,
  ETH_SEPOLIA: 11155111,
  OP_MAINNET: 10,
  OP_SEPOLIA: 11155420,
  BSC_MAINNET: 56,
  BSC_TESTNET: 97,
  ARBITRUM_ONE: 42161,
  ARBITRUM_NOVA: 42170,
  ARBITRUM_SEPOLIA: 421614,
};

export const APP_NAME = 'CRYPTOPAYSERVER';
export const APP_DESCRIPTION = 'Free services to help you buy and sell products and collect cryptocurrencies.';
export const ENV = process.env.NEXT_PUBLIC_ENVIRONMENT ?? 'development'
export const IS_MAINNET = process.env.NODE_ENV ?? 'testnet'
export const IS_DEVELOPMENT = process.env.NEXT_PUBLIC_ENVIRONMENT === "development"
export const IS_PRODUCATION = !IS_DEVELOPMENT

export const STATIC_ASSETS = ""