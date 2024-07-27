import * as bitcoin from 'bitcoinjs-lib';
import { CHAINIDS, CHAINS, COINS } from 'packages/constants/blockchain';
import {
  AssetBalance,
  BTCFeeRate,
  BTCTYPE,
  ChainAccountType,
  SendTransaction,
  TransactionDetail,
  TRANSACTIONSTATUS,
  TRANSACTIONTYPE,
  UnspentTransactionOutput,
} from '../types';
import { IS_MAINNET } from 'packages/constants';
import BIP32Factory from 'bip32';
import * as ecc from 'tiny-secp256k1';
import { ECPairFactory } from 'ecpair';
import axios from 'axios';
import { BigAdd, BigSub, BigDiv, BigMul } from 'utils/number';
import { ethers } from 'ethers';
import Big from 'big.js';

export class BTC {
  static chain = CHAINS.BITCOIN;
  static chainIds = IS_MAINNET ? CHAINIDS.BITCOIN : CHAINIDS.BITCOIN_TESTNET;
  static BTC_NETWORK = IS_MAINNET ? bitcoin.networks.bitcoin : bitcoin.networks.testnet;
  static NODE_API = IS_MAINNET ? 'https://mempool.space/api' : 'https://mempool.space/testnet/api';
  static BLOCKCHAIN_URL = IS_MAINNET ? 'https://mempool.space/zh/tx' : 'https://mempool.space/zh/testnet/tx';

  // For the wallet
  // Four type support: Native Segwit, Nested Segwit, Taproot, Legacy
  static createAccountBySeed(seed: Buffer): ChainAccountType[] {
    bitcoin.initEccLib(ecc);

    let accounts: Array<ChainAccountType> = [];

    const nativeSegwitPath = IS_MAINNET ? `m/84'/0'/0'/0/0` : `m/84'/1'/0'/0/0`;
    const nestedSegwitPath = IS_MAINNET ? `m/49'/0'/0'/0/0` : `m/49'/1'/0'/0/0`;
    const taprootPath = IS_MAINNET ? `m/86'/0'/0'/0/0` : `m/86'/1'/0'/0/0`;
    const legacyPath = IS_MAINNET ? `m/44'/0'/0'/0/0` : `m/44'/1'/0'/0/0`;

    try {
      // nativeSegwit
      const bip32 = BIP32Factory(ecc);
      const node = bip32.fromSeed(seed, this.BTC_NETWORK);

      const nativeSegwitPrivateKey = node.derivePath(nativeSegwitPath).privateKey?.toString('hex');
      const nativeSegwitAddress = this.getAddressP2wpkhFromPrivateKey(nativeSegwitPrivateKey as string);

      accounts.push({
        chain: this.chain,
        address: nativeSegwitAddress as string,
        privateKey: nativeSegwitPrivateKey,
        note: BTCTYPE.NATIVESEGWIT,
      });

      // nestedSegwit
      const nestedSegwitPrivateKey = node.derivePath(nestedSegwitPath).privateKey?.toString('hex');
      const nestedSegwitAddress = this.getAddressP2shP2wpkhFromPrivateKey(nestedSegwitPrivateKey as string);

      accounts.push({
        chain: this.chain,
        address: nestedSegwitAddress as string,
        privateKey: nestedSegwitPrivateKey,
        note: BTCTYPE.NESTEDSEGWIT,
      });

      // taproot
      const taprootPrivateKey = node.derivePath(taprootPath).privateKey?.toString('hex');
      const taprootAddress = this.getAddressP2trFromPrivateKey(taprootPrivateKey as string);

      accounts.push({
        chain: this.chain,
        address: taprootAddress as string,
        privateKey: taprootPrivateKey,
        note: BTCTYPE.TAPROOT,
      });

      // legacy
      const legacyPrivateKey = node.derivePath(legacyPath).privateKey?.toString('hex');
      const legacyAddress = this.getAddressP2pkhFromPrivateKey(legacyPrivateKey as string);

      accounts.push({
        chain: this.chain,
        address: legacyAddress as string,
        privateKey: legacyPrivateKey,
        note: BTCTYPE.LEGACY,
      });

      return accounts;
    } catch (e) {
      console.error(e);
      throw new Error('can not create a wallet of btc');
    }
  }

  static createAccountByPrivateKey(privateKey: string): Array<ChainAccountType> {
    try {
      let accounts: Array<ChainAccountType> = [];

      // nativeSegwit
      const nativeSegwitAddress = this.getAddressP2wpkhFromPrivateKey(privateKey);

      accounts.push({
        chain: this.chain,
        address: nativeSegwitAddress as string,
        privateKey: privateKey,
        note: 'Native Segwit',
      });

      // nestedSegwit
      const nestedSegwitAddress = this.getAddressP2shP2wpkhFromPrivateKey(privateKey);

      accounts.push({
        chain: this.chain,
        address: nestedSegwitAddress as string,
        privateKey: privateKey,
        note: 'Nested Segwit',
      });

      // taproot
      const taprootAddress = this.getAddressP2trFromPrivateKey(privateKey);

      accounts.push({
        chain: this.chain,
        address: taprootAddress as string,
        privateKey: privateKey,
        note: 'Taproot',
      });

      // legacy
      const legacyAddress = this.getAddressP2pkhFromPrivateKey(privateKey);

      accounts.push({
        chain: this.chain,
        address: legacyAddress as string,
        privateKey: privateKey,
        note: 'Legacy',
      });

      return accounts;
    } catch (e) {
      console.error(e);
      throw new Error('can not create a wallet of btc');
    }
  }

  static toWifStaring(privateKey: string): string {
    const ECPair = ECPairFactory(ecc);
    const privateKeyBytes = Buffer.from(privateKey, 'hex');
    const keyPair = ECPair.fromPrivateKey(privateKeyBytes, { network: this.BTC_NETWORK });
    return keyPair.toWIF();
  }

  // p2wpkh
  static getAddressP2wpkhFromPrivateKey(privateKey: string): string {
    const ECPair = ECPairFactory(ecc);
    const keyPair = ECPair.fromWIF(this.toWifStaring(privateKey), this.BTC_NETWORK);
    const p2wpkh = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: this.BTC_NETWORK });
    return p2wpkh.address as string;
  }

  // p2sh-p2wpkh
  static getAddressP2shP2wpkhFromPrivateKey(privateKey: string): string {
    const ECPair = ECPairFactory(ecc);
    const keyPair = ECPair.fromWIF(this.toWifStaring(privateKey), this.BTC_NETWORK);
    const p2 = bitcoin.payments.p2sh({
      redeem: bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: this.BTC_NETWORK }),
      network: this.BTC_NETWORK,
    });
    return p2.address as string;
  }

  // p2tr
  static getAddressP2trFromPrivateKey(privateKey: string): string {
    const ECPair = ECPairFactory(ecc);
    const keyPair = ECPair.fromWIF(this.toWifStaring(privateKey), this.BTC_NETWORK);
    const p2tr = bitcoin.payments.p2tr({
      internalPubkey: keyPair.publicKey.subarray(1, 33),
      network: this.BTC_NETWORK,
    });

    return p2tr.address as string;
  }

  // p2pkh
  static getAddressP2pkhFromPrivateKey(privateKey: string): string {
    const ECPair = ECPairFactory(ecc);
    const keyPair = ECPair.fromWIF(this.toWifStaring(privateKey), this.BTC_NETWORK);
    const p2pkh = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: this.BTC_NETWORK });
    p2pkh.output;
    return p2pkh.address as string;
  }

  // For the transaction
  static checkAddress(address: string): boolean {
    try {
      bitcoin.address.toOutputScript(address, this.BTC_NETWORK);
      return true;
    } catch (e) {
      return false;
    }
  }

  static checkQRCodeText(text: string): boolean {
    const regex = /bitcoin:(\w+)\?amount=([\d.]+)/;
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
    const regex = /bitcoin:(\w+)\?amount=([\d.]+)/;

    try {
      const matchText = text.match(regex);
      if (matchText) {
        const address = matchText[1];
        const amount = matchText[2] || 0;

        return {
          address,
          amount,
        };
      } else {
        return;
      }
    } catch (e) {
      console.error(e);
      return;
    }
  }

  static async getAssetBalance(address: string, toBTC: boolean = true): Promise<AssetBalance> {
    let items = {} as AssetBalance;
    items.BTC = await this.getBalance(address, toBTC);
    return items;
  }

  static async getBalance(address: string, toBTC: boolean = true): Promise<string> {
    try {
      const url = `${this.NODE_API}/address/${address}/utxo`;
      const response = await axios.get(url);

      if (response.data.length > 0) {
        let balance = '0';
        response.data.map((utxo: any) => {
          if (utxo.status.confirmed) {
            balance = BigAdd(balance, parseInt(utxo.value).toString());
          }
        });

        return toBTC ? BigDiv(balance, '100000000') : balance;
      }

      return '0';
    } catch (e) {
      console.error(e);
      throw new Error('can not get the balance of btc');
    }
  }

  static async getAddressUtxo(address: string): Promise<UnspentTransactionOutput[]> {
    try {
      const url = `${this.NODE_API}/address/${address}/utxo`;
      const response = await axios.get(url);

      if (response.data.length > 0) {
        return response.data.map((utxo: any) => {
          if (utxo.status.confirmed) {
            return {
              txid: utxo.txid,
              vout: utxo.vout,
              value: utxo.value,
            };
          }
        });
      }

      return [];
    } catch (e) {
      console.error(e);
      throw new Error('can not get the utxo of btc');
    }
  }

  static async getCurrentFeeRate(): Promise<BTCFeeRate> {
    try {
      const url = `${this.NODE_API}/fees/recommended`;
      const response = await axios.get(url);
      if (response.data) {
        return {
          fast: parseInt(response.data.fastestFee),
          normal: parseInt(response.data.halfHourFee),
          slow: parseInt(response.data.hourFee),
        };
      }
      throw new Error('can not get the fee rate of btc');
    } catch (e) {
      console.error(e);
      throw new Error('can not get the fee rate of btc');
    }
  }

  static async broadcastTransaction(data: string): Promise<string> {
    try {
      const url = `${this.NODE_API}/tx`;
      const response = await axios.post(url, data);
      if (response.data.txId) {
        return response.data.txId;
      }

      throw new Error('can not broadcast tx of btc');
    } catch (e) {
      console.error(e);
      throw new Error('can not broadcast tx of btc');
    }
  }

  static async getTransactions(address: string): Promise<TransactionDetail[]> {
    try {
      const url = `${this.NODE_API}/address/${address}/txs`;
      const response = await axios.get(url);
      if (response.data.length > 0) {
        let txs: TransactionDetail[] = [];
        response.data.map((item: any) => {
          let status = TRANSACTIONSTATUS.PENDING;
          if (item.status.confirmed) {
            status = TRANSACTIONSTATUS.SUCCESS;
          }

          let txType;
          let value = 0;
          item.vin.map((vinItem: any) => {
            if (
              vinItem.prevout.scriptpubkey_address &&
              address.toLowerCase() === vinItem.prevout.scriptpubkey_address.toLowerCase()
            ) {
              txType = TRANSACTIONTYPE.SEND;
              value += parseInt(vinItem.prevout.value);
            }
          });

          if (txType !== TRANSACTIONTYPE.SEND) {
            txType = TRANSACTIONTYPE.RECEIVED;
          }

          item.vout.map((voutItem: any) => {
            if (
              voutItem.scriptpubkey_address &&
              address.toLowerCase() === voutItem.scriptpubkey_address.toLowerCase()
            ) {
              value -= parseInt(voutItem.value);
            }
          });

          let blockTimestamp = 0,
            blockNumber = 0;
          if (item.status.confirmed) {
            blockTimestamp = item.status.block_time;
            blockNumber = item.status.block_height;
          }

          const url = `${this.BLOCKCHAIN_URL}/${item.txid}`;

          txs.push({
            hash: item.txid,
            value: value.toString(),
            asset: COINS.BTC,
            fee: item.fee,
            type: txType,
            status: status,
            blockTimestamp: blockTimestamp,
            blockNumber: blockNumber,
            url: url,
          });
        });

        return txs;
      } else {
        return [];
      }
    } catch (e) {
      console.error(e);
      throw new Error('can not get the transactions of btc');
    }
  }

  static async getTransactionDetail(hash: string, address?: string): Promise<TransactionDetail> {
    try {
      const url = `${this.NODE_API}/tx/${hash}`;
      const response = await axios.get(url);
      if (response.data) {
        let status = TRANSACTIONSTATUS.PENDING;
        if (response.data.status.confirmed) {
          status = TRANSACTIONSTATUS.SUCCESS;
        }

        let txType;
        let value = 0;

        if (address) {
          response.data.vin.map((vinItem: any) => {
            if (
              vinItem.prevout.scriptpubkey_address &&
              address.toLowerCase() === vinItem.prevout.scriptpubkey_address.toLowerCase()
            ) {
              txType = TRANSACTIONTYPE.SEND;
              value += parseInt(vinItem.prevout.value);
            }
          });

          if (txType !== TRANSACTIONTYPE.SEND) {
            txType = TRANSACTIONTYPE.RECEIVED;
          }

          response.data.vout.map((voutItem: any) => {
            if (
              voutItem.scriptpubkey_address &&
              address.toLowerCase() === voutItem.scriptpubkey_address.toLowerCase()
            ) {
              value -= parseInt(voutItem.value);
            }
          });
        }

        let blockTimestamp = 0,
          blockNumber = 0;
        if (response.data.status.confirmed) {
          blockTimestamp = response.data.status.block_time;
          blockNumber = response.data.status.block_height;
        }

        const explorerUrl = `${this.BLOCKCHAIN_URL}/${response.data.txid}`;

        if (address) {
          return {
            hash: response.data.txid,
            value: value.toString(),
            asset: COINS.BTC,
            fee: response.data.fee,
            type: txType,
            status: status,
            blockTimestamp: blockTimestamp,
            blockNumber: blockNumber,
            url: explorerUrl,
          };
        } else {
          return {
            hash: response.data.txid,
            asset: COINS.BTC,
            fee: response.data.fee,
            status: status,
            blockTimestamp: blockTimestamp,
            blockNumber: blockNumber,
            url: explorerUrl,
          };
        }
      }

      throw new Error('can not get the transaction of btc');
    } catch (e) {
      console.error(e);
      throw new Error('can not get the transaction of btc');
    }
  }

  static async sendTransaction(req: SendTransaction): Promise<string> {
    try {
      const ECPair = ECPairFactory(ecc);
      const keyPair = ECPair.fromWIF(this.toWifStaring(req.privateKey), this.BTC_NETWORK);

      let script: Buffer;
      switch (req.btcType) {
        case BTCTYPE.NATIVESEGWIT:
          const p2wpkh = bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: this.BTC_NETWORK });
          script = p2wpkh.output as Buffer;
        case BTCTYPE.NESTEDSEGWIT:
          const p2 = bitcoin.payments.p2sh({
            redeem: bitcoin.payments.p2wpkh({ pubkey: keyPair.publicKey, network: this.BTC_NETWORK }),
            network: this.BTC_NETWORK,
          });
          script = p2.output as Buffer;
          break;
        case BTCTYPE.TAPROOT:
          const p2tr = bitcoin.payments.p2tr({
            internalPubkey: keyPair.publicKey.subarray(1, 33),
            network: this.BTC_NETWORK,
          });
          script = p2tr.output as Buffer;
          break;
        case BTCTYPE.LEGACY:
          const p2pkh = bitcoin.payments.p2pkh({ pubkey: keyPair.publicKey, network: this.BTC_NETWORK });
          script = p2pkh.output as Buffer;
          break;
        default:
          throw new Error('can not create the transactions of btc');
      }

      const txb = new bitcoin.Psbt({ network: this.BTC_NETWORK });
      txb.setVersion(2);
      txb.setLocktime(0);

      let totalBalance = '0';
      const utxos = await this.getAddressUtxo(req.from);
      utxos &&
        utxos.length > 0 &&
        utxos.forEach((item) => {
          totalBalance = BigAdd(totalBalance, item.value.toString());
          txb.addInput({
            hash: item.txid,
            index: item.vout,
            witnessUtxo: {
              script: script,
              value: item.value,
            },
          });
        });

      const sendBalance = new Big(ethers.parseUnits(req.value, 8).toString()).toNumber();
      txb.addOutput({
        address: req.to,
        value: sendBalance,
      });

      // feeRate * vSize
      const feeRate = req.feeRate ? req.feeRate : (await this.getCurrentFeeRate()).normal;
      const size = txb.extractTransaction().virtualSize() + 90;
      const feeBalance = BigMul(size.toString(), feeRate.toString());

      const remainValue = parseFloat(BigSub(BigSub(totalBalance, sendBalance.toString()), feeBalance));
      if (remainValue < 0) {
        throw new Error('can not create the transactions of btc');
      }

      txb.addOutput({
        address: req.from,
        value: remainValue,
      });

      txb.signAllInputs(keyPair);
      txb.finalizeAllInputs();

      const tx = txb.extractTransaction();
      const txid = await this.broadcastTransaction(tx.toHex());
      return txid;
    } catch (e) {
      console.error(e);
      throw new Error('can not create the transactions of btc');
    }
  }
}
