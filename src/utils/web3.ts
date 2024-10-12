import { BLOCKCHAINNAMES, CHAINIDS, CHAINS, COIN, COINS } from 'packages/constants/blockchain';
import {
  GetBlockchainAddressUrl as GetBTCBlockchainAddressUrl,
  GetBlockchainTxUrl as GetBTCBlockchainTxUrl,
} from './chain/btc';
import {
  GetBlockchainAddressUrl as GetETHBlockchainAddressUrl,
  GetBlockchainTxUrl as GetETHBlockchainTxUrl,
} from './chain/eth';

export function FindTokenByChainIdsAndContractAddress(chainIds: CHAINIDS, contractAddress: string): COIN {
  const coins = BLOCKCHAINNAMES.find((item) => item.chainId === chainIds)?.coins;
  const token = coins?.find((item) => item.contractAddress?.toLowerCase() === contractAddress.toLowerCase());
  return token as COIN;
}

export function FindTokenByChainIdsAndSymbol(chainIds: CHAINIDS, symbol: COINS): COIN {
  const coins = BLOCKCHAINNAMES.find((item) => item.chainId === chainIds)?.coins;
  const token = coins?.find((item) => item.symbol?.toLowerCase() === symbol.toLowerCase());
  return token as COIN;
}

export function FindDecimalsByChainIdsAndContractAddress(chainIds: CHAINIDS, contractAddress: string): number {
  const coins = BLOCKCHAINNAMES.find((item) => item.chainId === chainIds)?.coins;
  const token = coins?.find((item) => item.contractAddress?.toLowerCase() === contractAddress.toLowerCase());
  return token?.decimals || 0;
}

export function GetBlockchainTxUrlByChainIds(isMainnet: boolean, chain: CHAINS) {
  switch (chain) {
    case CHAINS.BITCOIN:
      return GetBTCBlockchainTxUrl(isMainnet);
    case CHAINS.ETHEREUM:
      return GetETHBlockchainTxUrl(isMainnet);
    default:
      return '';
  }
}

export function GetBlockchainAddressUrlByChainIds(isMainnet: boolean, chain: CHAINS) {
  switch (chain) {
    case CHAINS.BITCOIN:
      return GetBTCBlockchainAddressUrl(isMainnet);
    case CHAINS.ETHEREUM:
      return GetETHBlockchainAddressUrl(isMainnet);
    default:
      return '';
  }
}
