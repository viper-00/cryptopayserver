import { BLOCKCHAINNAMES, CHAINIDS, COIN } from 'packages/constants/blockchain';

export function findTokenByChainIdsAndContractAddress(chainIds: CHAINIDS, contractAddress: string): COIN {
  const coins = BLOCKCHAINNAMES.find((item) => item.chainId === chainIds)?.coins;
  const token = coins?.find((item) => item.contractAddress?.toLowerCase() === contractAddress.toLowerCase());
  return token as COIN;
}

export function findDecimalsByChainIdsAndContractAddress(chainIds: CHAINIDS, contractAddress: string): number {
  const coins = BLOCKCHAINNAMES.find((item) => item.chainId === chainIds)?.coins;
  const token = coins?.find((item) => item.contractAddress?.toLowerCase() === contractAddress.toLowerCase());
  return token?.decimals || 0;
}
