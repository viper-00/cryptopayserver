export function GetBlockchainTxUrl(isMainnet: boolean, hash: string): string {
  return isMainnet ? `https://mempool.space/zh/tx/${hash}` : `https://mempool.space/zh/testnet/tx/${hash}`;
}

export function GetBlockchainAddressUrl(isMainnet: boolean, address: string): string {
  return isMainnet
    ? `https://mempool.space/zh/address/${address}`
    : `https://mempool.space/zh/testnet/address/${address}`;
}

export function GetNodeApi(isMainnet: boolean): string {
  return isMainnet ? 'https://mempool.space/api' : 'https://mempool.space/testnet/api';
}
