import { CHAINIDS, CHAINS } from 'packages/constants/blockchain';
import { ChainAccountType } from '../types';
import { Keypair } from '@solana/web3.js';

export class SOLANA {
  static chain = CHAINS.SOLANA;

  static getChainIds(isMainnet: boolean): CHAINIDS {
    return isMainnet ? CHAINIDS.SOLANA : CHAINIDS.SOLANA_DEVNET;
  }

  static createAccountBySeed(isMainnet: boolean, seed: Buffer): ChainAccountType {
    // const path = `m/44'/501'/0'/0`;

    try {
      const keypair = Keypair.fromSeed(Uint8Array.from(seed));
      const privateKey = keypair.secretKey.toString();
      const address = keypair.publicKey.toString();

      return {
        chain: this.chain,
        address: address,
        privateKey: privateKey,
        note: 'Solana',
        isMainnet: isMainnet,
      };
    } catch (e) {
      console.error(e);
      throw new Error('can not create a wallet of solana');
    }
  }
}
