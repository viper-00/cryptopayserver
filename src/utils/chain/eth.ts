export function GetBlockchainTxUrl(isMainnet: boolean): string {
  return isMainnet ? 'https://etherscan.io/tx' : 'https://sepolia.etherscan.io/tx';
}

export function GetBlockchainAddressUrl(isMainnet: boolean): string {
  return isMainnet ? 'https://etherscan.io/address' : 'https://sepolia.etherscan.io/address';
}
