export function GetBlockchainTxUrl(isMainnet: boolean, hash: string): string {
  return isMainnet ? `https://litecoinspace.org/tx/${hash}` : `https://litecoinspace.org/testnet/tx/${hash}`;
}

export function GetBlockchainAddressUrl(isMainnet: boolean, address: string): string {
  return isMainnet
    ? `https://litecoinspace.org/address/${address}`
    : `https://litecoinspace.org/testnet/address/${address}`;
}

export function GetNodeApi(isMainnet: boolean): string {
  return isMainnet ? 'https://litecoinspace.org/api' : 'https://litecoinspace.org/testnet/api';
}
