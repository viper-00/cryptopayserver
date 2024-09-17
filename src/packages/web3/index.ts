import { WalletAccountType, ChainAccountType, AssetBalance, TransactionDetail, SendTransaction } from './types';
import { Bip39 } from './bip39';
import { BTC } from './chain/btc';
import { ETH } from './chain/eth';
import { CHAINIDS, CHAINS } from 'packages/constants/blockchain';

export class WEB3 {
  // support: Import and generate wallet
  static async generateWallet(mnemonic: string = ''): Promise<WalletAccountType> {
    const isGenerate = mnemonic === '' ? true : false;

    if (mnemonic !== '' && !Bip39.validateMnemonic(mnemonic)) throw new Error('Invalid mnemonic');
    mnemonic = mnemonic === '' ? Bip39.generateMnemonic() : mnemonic;

    const seed = await Bip39.generateSeed(mnemonic);

    // mainnet
    const mainnetAccount = await this.createAccountBySeed(true, seed);

    //testnet
    const testnetAccount = await this.createAccountBySeed(false, seed);

    return {
      isGenerate: isGenerate,
      mnemonic: mnemonic,
      account: [...mainnetAccount, ...testnetAccount],
    };
  }

  static async createAccountBySeed(isMainnet: boolean, seed: Buffer): Promise<Array<ChainAccountType>> {
    return await Promise.all([...BTC.createAccountBySeed(isMainnet, seed), ETH.createAccountBySeed(isMainnet, seed)]);
  }

  static async createAccountByPrivateKey(
    isMainnet: boolean,
    chain: CHAINS,
    privateKey: string,
  ): Promise<Array<ChainAccountType>> {
    switch (chain) {
      case CHAINS.BITCOIN:
        return BTC.createAccountByPrivateKey(isMainnet, privateKey);
      case CHAINS.ETHEREUM:
        return Array<ChainAccountType>(ETH.createAccountByPrivateKey(isMainnet, privateKey));
      default:
        return [];
    }
  }

  static async checkAddress(isMainnet: boolean, chain: CHAINS, address: string): Promise<boolean> {
    switch (chain) {
      case CHAINS.BITCOIN:
        return BTC.checkAddress(isMainnet, address);
      case CHAINS.ETHEREUM:
        return ETH.checkAddress(address);
      default:
        return false;
    }
  }

  static async getFeeRate(isMainnet: boolean, chain: CHAINS): Promise<any> {
    switch (chain) {
      case CHAINS.BITCOIN:
        return BTC.getCurrentFeeRate(isMainnet);
      case CHAINS.ETHEREUM:
        return ETH.getGasPrice(isMainnet);
      default:
        return null;
    }
  }

  static getChainIds(isMainnet: boolean, chain: CHAINS): CHAINIDS {
    switch (chain) {
      case CHAINS.BITCOIN:
        return BTC.getChainIds(isMainnet);
      case CHAINS.ETHEREUM:
        return ETH.getChainIds(isMainnet);
      default:
        return CHAINIDS.NONE;
    }
  }

  static async getAssetBalance(isMainnet: boolean, chain: CHAINS, address: string): Promise<AssetBalance> {
    switch (chain) {
      case CHAINS.BITCOIN:
        return await BTC.getAssetBalance(isMainnet, address);
      case CHAINS.ETHEREUM:
        return await ETH.getAssetBalance(isMainnet, address);
      default:
        return {} as AssetBalance;
    }
  }

  static async getTransactionDetail(isMainnet: boolean, chain: CHAINS, hash: string): Promise<TransactionDetail> {
    switch (chain) {
      case CHAINS.BITCOIN:
        return await BTC.getTransactionDetail(isMainnet, hash);
      case CHAINS.ETHEREUM:
        return await ETH.getTransactionDetail(isMainnet, hash);
      default:
        return {} as TransactionDetail;
    }
  }

  static async getTransactions(isMainnet: boolean, chain: CHAINS, address: string): Promise<TransactionDetail[]> {
    switch (chain) {
      case CHAINS.BITCOIN:
        return await BTC.getTransactions(isMainnet, address);
      case CHAINS.ETHEREUM:
        return [];
      default:
        return [];
    }
  }

  static async sendTransaction(isMainnet: boolean, req: SendTransaction): Promise<string> {
    switch (req.coin.chainId) {
      case CHAINS.BITCOIN:
        return await BTC.sendTransaction(isMainnet, req);
      case CHAINS.ETHEREUM:
        return await ETH.sendTransaction(isMainnet, req);
      default:
        return '';
    }
  }
}
