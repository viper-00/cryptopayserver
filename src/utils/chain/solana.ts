export function GetBlockchainTxUrl(isMainnet: boolean, hash: string): string {
  return isMainnet ? `https://explorer.solana.com/tx/${hash}` : `https://explorer.solana.com/tx/${hash}?cluster=devnet`;
}

export function GetBlockchainAddressUrl(isMainnet: boolean, address: string): string {
  return isMainnet
    ? `https://explorer.solana.com/address/${address}`
    : `https://explorer.solana.com/address/${address}?cluster=devnet`;
}
