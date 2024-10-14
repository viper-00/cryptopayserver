import { CHAINIDS, CHAINS } from 'packages/constants/blockchain';
import { AssetBalance, ChainAccountType, SendTransaction, TransactionDetail, TransactionRequest, TRANSACTIONSTATUS } from '../types';
import { Keypair, PublicKey } from '@solana/web3.js';
import { ethers } from 'ethers';

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

  static createAccountByPrivateKey(isMainnet: boolean, privateKey: string): ChainAccountType {
    try {
      const keypair = Keypair.fromSecretKey(Uint8Array.from(Buffer.from(privateKey)));
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

  static checkAddress(address: string): boolean {
    const publicKey = new PublicKey(address);
    return PublicKey.isOnCurve(publicKey);
  }

  static checkQRCodeText(text: string): boolean {
    const regex = /solana:(\w+)(\?value=(\d+)&decimal=(\d+))?(&contractAddress=(\w+))?/;
    try {
      const matchText = text.match(regex);
      if (matchText) {
        return true;
      }
      return false;
    } catch (e) {
      return false;
    }
  }

  static parseQRCodeText(text: string): any {
    const regex = /solana:(\w+)(\?value=(\d+)&decimal=(\d+))?(&contractAddress=(\w+))?/;

    try {
      const matchText = text.match(regex);
      if (matchText) {
        const address = matchText[1];
        const value = matchText[3] || 0;
        const decimal = matchText[4] || 18;
        const amount = ethers.formatUnits(value, decimal);
        const contractAddress = matchText[6] || undefined;

        return {
          address,
          amount,
          decimal,
          contractAddress,
        };
      } else {
        return;
      }
    } catch (e) {
      console.error(e);
      return;
    }
  }

  static async generateQRCodeText(
    isMainnet: boolean,
    address: string,
    contractAddress?: string,
    amount?: string,
  ): Promise<string> {
    let qrcodeText = `solana:${address}`;
    const decimal = contractAddress ? await this.getERC20Decimals(isMainnet, contractAddress) : 18;

    amount = amount || '0';
    const value = ethers.parseUnits(amount, decimal).toString();

    qrcodeText += `?value=${value}&decimal=${decimal}`;

    if (contractAddress) {
      qrcodeText += `&contractAddress=${contractAddress}`;
    }

    return qrcodeText;
  }

  static async getAssetBalance(isMainnet: boolean, address: string): Promise<AssetBalance> {}

  static async getSolBalance(isMainnet: boolean, address: string): Promise<string> {}

  static async getERC20Balance(isMainnet: boolean, address: string, contractAddress: string): Promise<string> {}

  static async getERC20Decimals(isMainnet: boolean, contractAddrzess: string): Promise<number> {}

  static async decodeERC20Transfer(isMainnet: boolean, hash: string): Promise<ERC20TransactionDetail> {}

  static async getERC20TransferToAmountAndTokenByInput(isMainnet: boolean, input: string): Promise<any> {}

  static async getTransactionStatus(isMainnet: boolean, hash: string): Promise<TRANSACTIONSTATUS> {}

  static async getTransactionResult(isMainnet: boolean, hash: string): Promise<any> {}

  static async getTransactions(
    isMainnet: boolean,
    address: string,
    symbol?: string,
  ): Promise<EthereumTransactionDetail[]> {}

  static async getTransactionDetail(
    isMainnet: boolean,
    hash: string,
    isPending: boolean = false,
  ): Promise<TransactionDetail> {}

  static async estimateGas(isMainnet: boolean, txParams: TransactionRequest): Promise<number> {}

  static async createTransaction(
    isMainnet: boolean,
    request: CreateEthereumTransaction,
  ): Promise<CreateEthereumTransaction> {}

  static async createSolTransaction(
    isMainnet: boolean,
    request: CreateEthereumTransaction,
  ): Promise<CreateEthereumTransaction> {}

  static async createERC20Transaction(
    isMainnet: boolean,
    request: CreateEthereumTransaction,
  ): Promise<CreateEthereumTransaction> {}

  static async sendTransaction(isMainnet: boolean, request: SendTransaction): Promise<string> {}
}
