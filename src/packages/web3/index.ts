import { WalletAccountType, ChainAccountType, AssetBalance, TransactionDetail, SendTransaction } from './types';
import { Bip39 } from './bip39';
import { BTC } from './chain/btc';
import { ETH } from './chain/eth';
import { CHAINS } from 'packages/constants/blockchain';

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

  static async createAccountByPrivateKey(chain: CHAINS, privateKey: string): Promise<Array<ChainAccountType>> {
    switch (chain) {
      case CHAINS.BITCOIN:
        return BTC.createAccountByPrivateKey(privateKey);
      case CHAINS.ETHEREUM:
        return Array<ChainAccountType>(ETH.createAccountByPrivateKey(privateKey));
      default:
        return [];
    }
  }

  static async checkAddress(chain: CHAINS, address: string): Promise<boolean> {
    switch (chain) {
      case CHAINS.BITCOIN:
        return BTC.checkAddress(address);
      case CHAINS.ETHEREUM:
        return ETH.checkAddress(address);
      default:
        return false;
    }
  }

  static async getAssetBalance(chain: CHAINS, address: string): Promise<AssetBalance> {
    switch (chain) {
      case CHAINS.BITCOIN:
        return BTC.getAssetBalance(address);
      case CHAINS.ETHEREUM:
        return ETH.getAssetBalance(address);
      default:
        return {} as AssetBalance;
    }
  }

  static async getTransactionDetail(chain: CHAINS, hash: string): Promise<TransactionDetail> {
    switch (chain) {
      case CHAINS.BITCOIN:
        return await BTC.getTransactionDetail(hash);
      case CHAINS.ETHEREUM:
        return await ETH.getTransactionDetail(hash);
      default:
        return {} as TransactionDetail;
    }
  }

  static async sendTransaction(req: SendTransaction): Promise<string> {
    switch (req.coin.chainId) {
      case CHAINS.BITCOIN:
        return await BTC.sendTransaction(req);
      case CHAINS.ETHEREUM:
        return await ETH.sendTransaction(req);
      default:
        return '';
    }
  }
}
