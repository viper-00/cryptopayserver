export function GetBlockchainTxUrl(isMainnet: boolean): string {
  return isMainnet ? 'https://mempool.space/zh/tx' : 'https://mempool.space/zh/testnet/tx';
}

export function GetBlockchainAddressUrl(isMainnet: boolean): string {
  return isMainnet ? 'https://mempool.space/zh/address' : 'https://mempool.space/zh/testnet/address';
}

export function GetNodeApi(isMainnet: boolean): string {
  return isMainnet ? 'https://mempool.space/api' : 'https://mempool.space/testnet/api';
}
