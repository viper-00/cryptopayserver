import { CHAINIDS, CHAINS, COINS } from 'packages/constants/blockchain';

export type ChainAccountType = {
  chain: CHAINS;
  address: string;
  privateKey?: string;
  note?: string;
};

export type UnspentTransactionOutput = {
  txid: string;
  vout: number;
  value: number;
};

export type BTCFeeRate = {
  fast: number;
  normal: number;
  slow: number;
};

export type ETHGasPrice = {
  fast: string;
  normal: string;
  slow: string;
};

export type ETHMaxPriorityFeePerGas = {
  fast: string;
  normal: string;
  slow: string;
};

export type TransactionDetail = {
  hash: string;
  from?: string;
  to?: string;
  value: string;
  asset: string;
  fee: string;
  type?: TRANSACTIONTYPE;
  status: TRANSACTIONSTATUS;
  blockTimestamp?: number;
  blockNumber: number;
  url: string;
};

export enum TRANSACTIONTYPE {
  RECEIVED = 'Received',
  SEND = 'SEND',
  SWAP = 'SWAP',
}

export enum TRANSACTIONSTATUS {
  PENDING = 'Pending',
  SUCCESS = 'Success',
  FAILED = 'Failed',
}

export type AssetBalance = {
  [key: string]: string;
};

export enum TRANSACTIONFUNCS {
  GETTXBYHASH = 'eth_getTransactionByHash',
  GETTXRECEIPT = 'eth_getTransactionReceipt',
  GETGASPRICE = 'eth_gasPrice',
  EstimateGas = 'eth_estimateGas',
  MaxPriorityFeePerGas = 'eth_maxPriorityFeePerGas',
  GETNONCE = 'eth_getTransactionCount',
}

export type ERC20TransactionDetail = {
  from: string;
  to: string;
  hash: string;
  asset: COINS;
  value: string;
};

export type TransactionRequest = {
  to?: string;
  from?: string;
  nonce?: number;

  gasLimit?: number;
  gasPrice?: number;

  // data?: BytesLike,
  value?: number;
  // chainId?: number

  // type?: number;
  // accessList?: AccessListish;

  // maxPriorityFeePerGas?: BigNumberish;
  // maxFeePerGas?: BigNumberish;

  // customData?: Record<string, any>;
  // ccipReadEnabled?: boolean;
};

export type CreateTransaction = {
  privateKey?: string;
  from: string;
  to: string;
  value: string;
  contractAddress?: string;
  type: number;
  chainId: CHAINIDS;
  data?: string;
  nonce?: number;

  gasPrice: string;
  maxFeePerGas?: string;

  gasLimit: number;
  maxPriorityFeePerGas?: string;
};
