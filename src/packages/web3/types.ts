import { CHAINS } from 'packages/constants/blockchain';

export type ChainAccountType = {
  chain: CHAINS;
  address: string;
  privateKey?: string;
  note?: string;
};
