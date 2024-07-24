import { WalletAccountType, ChainAccountType } from './types';
import { Bip39 } from './bip39';
import { BTC } from './btc';
import { ETH } from './eth';

export class WEB3 {
  // support: Import and generate wallet
  static async generateWallet(mnemonic: string = ''): Promise<WalletAccountType> {
    const isGenerate = mnemonic === '' ? true : false;

    if (mnemonic !== '' && !Bip39.validateMnemonic(mnemonic)) throw new Error('Invalid mnemonic');
    mnemonic = mnemonic === '' ? Bip39.generateMnemonic() : mnemonic;

    const seed = await Bip39.generateSeed(mnemonic);
    const account = await this.createAccountBySeed(seed);

    return {
      isGenerate: isGenerate,
      mnemonic: mnemonic,
      account: account,
    };
  }

  static async createAccountBySeed(seed: Buffer): Promise<Array<ChainAccountType>> {
    return await Promise.all([...BTC.createAccountBySeed(seed), ETH.createAccountBySeed(seed)]);
  }
}
