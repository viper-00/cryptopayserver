import axios from 'axios';
import { IS_MAINNET } from 'packages/constants';
import { CHAINS } from 'packages/constants/blockchain';
import { ChainAccountType } from './types';
import { HDKey } from 'ethereum-cryptography/hdkey.js';
import { Wallet } from 'ethers';

export class ETH {
  static chain = CHAINS.ETHEREUM;
  static BLOCKCHAIN_URL = IS_MAINNET ? 'https://etherscan.io' : 'https://sepolia.etherscan.io';

  static createAccountBySeed(seed: Buffer): ChainAccountType {
    const path = `m/44'/60'/0'/0/0`;

    try {
      const hdkey = HDKey.fromMasterSeed(Uint8Array.from(seed)).derive(path);
      const wallet = new Wallet(hdkey.privateKey?.toString() as string);
      const address = wallet.address;
      const privateKey = wallet.privateKey;

      return {
        chain: this.chain,
        address: address,
        privateKey: privateKey,
        note: 'Ethereum',
      };
    } catch (e) {
      console.error(e);
      throw new Error('can not create a wallet of eth');
    }
  }
}
