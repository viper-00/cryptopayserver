import { BLOCKCHAINNAMES, CHAINIDS, CHAINS } from 'packages/constants/blockchain';
import {
  AssetBalance,
  ChainAccountType,
  SendTransaction,
  SolanaTransactionDetail,
  TransactionDetail,
  TransactionRequest,
  TRANSACTIONSTATUS,
} from '../types';
import { Connection, Keypair, PublicKey, Transaction, TransactionSignature } from '@solana/web3.js';
import { ethers } from 'ethers';
import { RPC } from '../rpc';
import { FindDecimalsByChainIdsAndContractAddress, FindTokenByChainIdsAndContractAddress } from 'utils/web3';
import { AccountLayout, TOKEN_PROGRAM_ID } from '@solana/spl-token';
import { GetBlockchainTxUrl } from 'utils/chain/solana';

export class SOLANA {
  static chain = CHAINS.SOLANA;

  static getChainIds(isMainnet: boolean): CHAINIDS {
    return isMainnet ? CHAINIDS.SOLANA : CHAINIDS.SOLANA_DEVNET;
  }

  static async getConnection(isMainnet: boolean): Promise<Connection> {
    const connection = new Connection(RPC.getRpcByChainIds(this.getChainIds(isMainnet)), 'confirmed');
    return connection;
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

  static async getAssetBalance(isMainnet: boolean, address: string): Promise<AssetBalance> {
    try {
      let items = {} as AssetBalance;
      items.SOL = await this.getSolBalance(isMainnet, address);

      const coins = BLOCKCHAINNAMES.find((item) => item.chainId === this.getChainIds(isMainnet))?.coins;
      if (coins && coins.length > 0) {
        const tokens = coins.filter((item) => !item.isMainCoin);

        const promises = tokens.map(async (token) => {
          if (token.contractAddress && token.contractAddress !== '') {
            const balance = await this.getERC20Balance(isMainnet, address, token.contractAddress);
            items[token.symbol] = balance;
          }
        });

        await Promise.all(promises);
      }
      return items;
    } catch (e) {
      console.error(e);
      throw new Error('can not get the asset balance of solana');
    }
  }

  static async getSolBalance(isMainnet: boolean, address: string): Promise<string> {
    try {
      const connection = await this.getConnection(isMainnet);
      const balance = await connection.getBalance(new PublicKey(address));
      return ethers.formatUnits(balance, 9);
    } catch (e) {
      console.error(e);
      throw new Error('can not get the sol balance of solana');
    }
  }

  static async getERC20Balance(isMainnet: boolean, address: string, contractAddress: string): Promise<string> {
    try {
      const connection = await this.getConnection(isMainnet);

      const mintAddress = new PublicKey(contractAddress);
      const ownerAddress = new PublicKey(address);

      let response = await connection.getTokenAccountsByOwner(ownerAddress, {
        programId: TOKEN_PROGRAM_ID,
      });

      response.value.forEach(async (item) => {
        const accountInfo = AccountLayout.decode(item.account.data);
        const amount = accountInfo.amount.toString();

        if (accountInfo.mint === mintAddress) {
          const tokenDecimals = await this.getERC20Decimals(isMainnet, contractAddress);
          return ethers.formatUnits(amount, tokenDecimals);
        }
      });

      return '';
    } catch (e) {
      console.error(e);
      throw new Error('can not get the erc20 balance of solana');
    }
  }

  static async getERC20Decimals(isMainnet: boolean, contractAddress: string): Promise<number> {
    const decimals = FindDecimalsByChainIdsAndContractAddress(this.getChainIds(isMainnet), contractAddress);
    if (decimals && decimals > 0) {
      return decimals;
    }

    try {
      const connection = await this.getConnection(isMainnet);
      const mintInfo = await connection.getParsedAccountInfo(new PublicKey(contractAddress));
      // @ts-ignore
      return mintInfo.value?.data.parsed.info.decimals;
    } catch (e) {
      console.error(e);
      throw new Error('can not get the decimals of solana');
    }
  }

  // static async decodeERC20Transfer(isMainnet: boolean, hash: string): Promise<ERC20TransactionDetail> {
  //   try {
  //     const connection = await this.getConnection(isMainnet)
  //     const tx = await connection.getParsedTransaction(hash, {
  //       commitment: 'confirmed'
  //     })

  //     if (tx) {
  //       tx.transaction.message.instructions.forEach(async (insturction) => {

  //       })
  //     }

  //   } catch (e) {
  //     console.error(e);
  //     throw new Error('can not decode erc20 transfer of solana');
  //   }
  // }

  static async getERC20TransferToAmountAndTokenByInput(isMainnet: boolean, input: string): Promise<any> {}

  static async getTransactionStatus(isMainnet: boolean, hash: string): Promise<TRANSACTIONSTATUS> {
    try {
      const connection = await this.getConnection(isMainnet);
      const tx = await connection.getParsedTransaction(hash, {
        commitment: 'confirmed',
        maxSupportedTransactionVersion: 0,
      });

      if (tx && !tx.meta?.err) {
        return TRANSACTIONSTATUS.SUCCESS;
      } else {
        return TRANSACTIONSTATUS.FAILED;
      }
    } catch (e) {
      console.error(e);
      throw new Error('can not get tx status of solana');
    }
  }

  // static async getTransactionResult(isMainnet: boolean, hash: string): Promise<any> {}

  static async getTransactions(
    isMainnet: boolean,
    address: string,
    contractAddress?: string,
    limit: number = 10,
  ): Promise<SolanaTransactionDetail[]> {
    try {
      contractAddress = contractAddress ? contractAddress : '';

      const connection = await this.getConnection(isMainnet);
      const ownerAddress = new PublicKey(address);
      const signatures = await connection.getSignaturesForAddress(ownerAddress, {
        limit: limit,
      });

      let signaturesArray: TransactionSignature[] = [];
      let details: SolanaTransactionDetail[] = [];

      if (signatures && signatures.length > 0) {
        signatures.forEach((item) => {
          signaturesArray.push(item.signature);
        });

        const txs = await connection.getParsedTransactions(signaturesArray, {
          commitment: 'confirmed',
          maxSupportedTransactionVersion: 0,
        });

        if (txs && txs.length > 0) {
          txs.forEach(async (tx: any) => {
            for (const instruction of tx.transaction.message.instructions) {
              let detail: SolanaTransactionDetail = {
                chainId: this.getChainIds(isMainnet),
                address: address,
                hash: tx.signatures[0],
                contractAddress: contractAddress as string,
                status: tx.meta?.err ? TRANSACTIONSTATUS.FAILED : TRANSACTIONSTATUS.SUCCESS,
                blockTimestamp: tx.blockTime,
                from: '',
                to: '',
                value: '',
                asset: '',
                type: 'None',
              };

              if (instruction.programId.equals(PublicKey.default)) {
                const parsed = instruction.parsed;

                if (parsed.type && parsed.type === 'transfer') {
                  const from = parsed.info.source;
                  const to = parsed.info.destination;
                  const amount = parsed.info.lamports;

                  detail.from = new PublicKey(from).toBase58();
                  detail.to = new PublicKey(to).toBase58();
                  detail.value = (amount / 1_000_000_000).toString();
                  detail.asset = 'SOL';
                  if (new PublicKey(from) === new PublicKey(address)) {
                    detail.type = 'Send';
                  } else {
                    detail.type = 'Received';
                  }
                } else {
                  continue;
                }
              } else if (instruction.programId.equals(TOKEN_PROGRAM_ID)) {
                const parsed = instruction.parsed;

                if (parsed.type && parsed.type === 'transferChecked') {
                  const from = parsed.info.source;
                  const to = parsed.info.destination;
                  const mint = parsed.info.mint;

                  detail.from = new PublicKey(from).toBase58();
                  detail.to = new PublicKey(to).toBase58();
                  detail.value = ethers.formatUnits(parsed.info.tokenAmount.amount, parsed.info.tokenAmount.decimals);
                  const token = FindTokenByChainIdsAndContractAddress(this.getChainIds(isMainnet), mint);
                  detail.asset = token.symbol;

                  if (new PublicKey(from) === new PublicKey(address)) {
                    detail.type = 'Send';
                  } else {
                    detail.type = 'Received';
                  }
                } else {
                  continue;
                }
              } else {
                continue;
              }

              details.push(detail);
            }
          });
        }
      }

      return details;
    } catch (e) {
      console.error(e);
      throw new Error('can not get the transactions of solana');
    }
  }

  static async getTransactionDetail(isMainnet: boolean, hash: string): Promise<TransactionDetail> {
    try {
      const connection = await this.getConnection(isMainnet);

      const tx: any = await connection.getParsedTransaction(hash, {
        commitment: 'confirmed',
        maxSupportedTransactionVersion: 0,
      });

      if (tx) {
        let from,
          to,
          value,
          asset = '';

        for (const instruction of tx.transaction.message.instructions) {
          if (instruction.programId.equals(PublicKey.default)) {
            const parsed = instruction.parsed;

            if (parsed.type && parsed.type === 'transfer') {
              from = new PublicKey(parsed.info.source).toBase58();
              to = new PublicKey(parsed.info.destinatio).toBase58();
              value = (parsed.info.lamports / 1_000_000_000).toString();
              asset = 'SOL';
            }

            break;
          } else if (instruction.programId.equals(TOKEN_PROGRAM_ID)) {
            const parsed = instruction.parsed;

            if (parsed.type && parsed.type === 'transferChecked') {
              const mint = parsed.info.mint;

              from = new PublicKey(parsed.info.source).toBase58();
              to = new PublicKey(parsed.info.destination).toBase58();
              value = ethers.formatUnits(parsed.info.tokenAmount.amount, parsed.info.tokenAmount.decimals);
              const token = FindTokenByChainIdsAndContractAddress(this.getChainIds(isMainnet), mint);
              asset = token.symbol;
            }

            break;
          }
        }

        return {
          hash: tx.signatures[0],
          from: from,
          to: to,
          value: value,
          asset: asset,
          fee: tx.meta?.fee,
          status: tx.meta?.err ? TRANSACTIONSTATUS.FAILED : TRANSACTIONSTATUS.SUCCESS,
          slot: tx.slot,
          url: GetBlockchainTxUrl(isMainnet, hash),
        };
      }

      throw new Error('can not get the transaction of solana');
    } catch (e) {
      console.error(e);
      throw new Error('can not get the transaction of solana');
    }
  }

  // fee = number * feeCalculator
  static async getFee(isMainnet: boolean, txParams: Transaction): Promise<number> {
    try {
      const lamportsPerSignature = await this.getFeePerSignature(isMainnet);

      if (lamportsPerSignature) {
        const signatureCount = txParams.signatures.length;
        const estimatedFee = lamportsPerSignature * signatureCount;

        return estimatedFee;
      }

      throw new Error('can not get the fee of solana');
    } catch (e) {
      console.error(e);
      throw new Error('can not get the fee of solana');
    }
  }

  static async getFeePerSignature(isMainnet: boolean): Promise<number> {
    try {
      const connection = await this.getConnection(isMainnet);
      const { blockhash } = await connection.getLatestBlockhash();
      const feeCalculator = await connection.getFeeCalculatorForBlockhash(blockhash);

      if (feeCalculator && feeCalculator.value) {
        return feeCalculator.value.lamportsPerSignature;
      }

      throw new Error('can not get the fee per signature of solana');
    } catch (e) {
      console.error(e);
      throw new Error('can not get the fee per signature of solana');
    }
  }

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
