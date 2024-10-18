export function GetBlockchainTxUrl(isMainnet: boolean, hash: string): string {
  return isMainnet ? `https://explorer.solana.com/tx/${hash}` : `https://explorer.solana.com/tx/${hash}?cluster=devnet`;
}

export function GetBlockchainAddressUrl(isMainnet: boolean): string {
  return isMainnet ? 'https://explorer.solana.com/address/%s' : 'https://explorer.solana.com/address/%s?cluster=devnet';
}
