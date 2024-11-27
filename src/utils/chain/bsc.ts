export function GetBlockchainTxUrl(isMainnet: boolean, hash: string): string {
    return isMainnet ? `https://bscscan.com/tx/${hash}` : `https://testnet.bscscan.com/tx/${hash}`;
  }
  
  export function GetBlockchainAddressUrl(isMainnet: boolean, hash: string): string {
    return isMainnet ? `https://bscscan.com/address/${hash}` : `https://testnet.bscscan.com/address/${hash}`;
  }
  