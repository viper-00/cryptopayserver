import { CHAINS } from 'packages/constants/blockchain';

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

export type TransactionDetail = {
  hash: string;
  value: number;
  asset: string;
  fee: number;
  type: TRANSACTIONTYPE;
  status: TRANSACTIONSTATUS;
  blockTimestamp: number;
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
