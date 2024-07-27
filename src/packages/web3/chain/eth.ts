import axios from 'axios';
import { IS_MAINNET } from 'packages/constants';
import { BLOCKCHAINNAMES, CHAINIDS, CHAINS, COINS } from 'packages/constants/blockchain';
import {
  AssetBalance,
  ChainAccountType,
  CreateTransaction,
  ERC20TransactionDetail,
  ETHGasPrice,
  ETHMaxPriorityFeePerGas,
  SendTransaction,
  TransactionDetail,
  TRANSACTIONFUNCS,
  TransactionRequest,
  TRANSACTIONSTATUS,
} from '../types';
import { HDKey } from 'ethereum-cryptography/hdkey.js';
import { ethers, Wallet, Contract } from 'ethers';
import { RPC } from '../rpc';
import { ERC20Abi } from '../abi/erc20';
import { findDecimalsByChainIdsAndContractAddress, findTokenByChainIdsAndContractAddress } from 'utils/web3';
import { BigMul } from 'utils/number';
import Big from 'big.js';

export class ETH {
  static chain = CHAINS.ETHEREUM;
  static chainIds = IS_MAINNET ? CHAINIDS.ETHEREUM : CHAINIDS.ETHEREUM_SEPOLIA;
  static BLOCKCHAIN_URL = IS_MAINNET ? 'https://etherscan.io' : 'https://sepolia.etherscan.io';

  static async getProvider() {
    return new ethers.JsonRpcProvider(RPC.getRpcByChainIds(this.chainIds));
  }

  static createAccountBySeed(seed: Buffer): ChainAccountType {
    const path = `m/44'/60'/0'/0/0`;

    try {
      const hdkey = HDKey.fromMasterSeed(Uint8Array.from(seed)).derive(path);

      const privateKey = Buffer.from(hdkey.privateKey as Uint8Array).toString('hex');
      const wallet = new Wallet(privateKey);
      const address = wallet.address;

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

  static createAccountByPrivateKey(privateKey: string): ChainAccountType {
    try {
      const wallet = new Wallet(privateKey);
      const address = wallet.address;

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

  static checkAddress(address: string): boolean {
    return ethers.isAddress(address);
  }

  static checkQRCodeText(text: string): boolean {
    const regex = /ethereum:(\w+)(\?value=(\d+)&decimal=(\d+))?(&contractAddress=(\w+))?/;
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
    const regex = /ethereum:(\w+)(\?value=(\d+)&decimal=(\d+))?(&contractAddress=(\w+))?/;

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

  static async generateQRCodeText(address: string, contractAddress?: string, amount?: string): Promise<string> {
    let qrcodeText = `ethereum:${address}`;
    const decimal = contractAddress ? await this.getERC20Decimals(contractAddress) : 18;

    amount = amount || '0';
    const value = ethers.parseUnits(amount, decimal).toString();

    qrcodeText += `?value=${value}&decimal=${decimal}`;

    if (contractAddress) {
      qrcodeText += `&contractAddress=${contractAddress}`;
    }

    return qrcodeText;
  }

  static async getAssetBalance(address: string): Promise<AssetBalance> {
    try {
      let items = {} as AssetBalance;
      items.ETH = await this.getETHBalance(address);

      const coins = BLOCKCHAINNAMES.find((item) => item.chainId === this.chainIds)?.coins;
      if (coins && coins.length > 0) {
        const tokens = coins.filter((item) => !item.isMainCoin);

        const promises = tokens.map(async (token) => {
          if (token.contractAddress && token.contractAddress !== '') {
            const balance = await this.getERC20Balance(address, token.contractAddress);
            items[token.symbol] = balance;
          }
        });

        await Promise.all(promises);
      }
      return items;
    } catch (e) {
      console.error(e);
      throw new Error('can not get the asset balance of eth');
    }
  }

  static async getETHBalance(address: string): Promise<string> {
    try {
      const provider = await this.getProvider();
      const balance = await provider.getBalance(address);
      return ethers.formatUnits(balance, 18);
    } catch (e) {
      console.error(e);
      throw new Error('can not get the eth balance of eth');
    }
  }

  static async getERC20Balance(address: string, contractAddress: string): Promise<string> {
    try {
      const provider = await this.getProvider();
      const contract = new Contract(contractAddress, ERC20Abi, provider);
      const result = await contract.balanceOf(address);
      const tokenDecimals = await this.getERC20Decimals(contractAddress);
      return ethers.formatUnits(result, tokenDecimals);
    } catch (e) {
      console.error(e);
      throw new Error('can not get the erc20 balance of eth');
    }
  }

  static async getERC20Decimals(contractAddress: string): Promise<number> {
    const decimals = findDecimalsByChainIdsAndContractAddress(this.chainIds, contractAddress);
    if (decimals && decimals > 0) {
      return decimals;
    }

    try {
      const provider = await this.getProvider();
      const contract = new Contract(contractAddress, ERC20Abi, provider);
      const decimals = await contract.decimals();
      return decimals;
    } catch (e) {
      console.error(e);
      throw new Error('can not get the decimals of eth');
    }
  }

  static async decodeERC20Transfer(hash: string): Promise<ERC20TransactionDetail> {
    try {
      const params = [hash];
      const response = await RPC.callRPC(this.chainIds, TRANSACTIONFUNCS.GETTXBYHASH, params);
      if (!response || response === null) {
        throw new Error('can not get tx by hash');
      }

      const input = response.result.input;
      const { to, amount, token } = await this.getERC20TransferToAmountAndTokenByInput(input);

      return {
        from: response.result.from,
        to: to,
        hash: response.result.hash,
        asset: token.symbol,
        value: amount,
      };
    } catch (e) {
      console.error(e);
      throw new Error('can not decode erc20 transfer of eth');
    }
  }

  static async getERC20TransferToAmountAndTokenByInput(input: string): Promise<any> {
    const iface = new ethers.Interface(ERC20Abi);
    const result = iface.decodeFunctionData('transfer', input);
    const to = result[0];
    const token = findTokenByChainIdsAndContractAddress(this.chainIds, to);
    const amount = ethers.formatUnits(result[1]._hex, token.decimals);

    return {
      to,
      amount,
      token,
    };
  }

  static async getTransactionStatus(hash: string): Promise<TRANSACTIONSTATUS> {
    try {
      const params = [hash];
      const response = await RPC.callRPC(this.chainIds, TRANSACTIONFUNCS.GETTXRECEIPT, params);
      if (!response || response === null) {
        throw new Error('can not get tx by hash');
      }

      const status = parseInt(response.result.status, 16);
      if (status === 1) {
        return TRANSACTIONSTATUS.SUCCESS;
      } else if (status === 0) {
        return TRANSACTIONSTATUS.FAILED;
      }

      throw new Error('can not get tx status of eth');
    } catch (e) {
      console.error(e);
      throw new Error('can not get tx status of eth');
    }
  }

  static async getTransactionResult(hash: string): Promise<any> {
    try {
      const params = [hash];
      const response = await RPC.callRPC(this.chainIds, TRANSACTIONFUNCS.GETTXRECEIPT, params);
      if (!response || response === null) {
        throw new Error('can not get tx by hash');
      }

      return response.result;
    } catch (e) {
      console.error(e);
      throw new Error('can not get tx result of eth');
    }
  }

  static async getTransactionDetail(hash: string, isPending: boolean = false): Promise<TransactionDetail> {
    const explorerUrl = `${this.BLOCKCHAIN_URL}/tx/${hash}`;

    try {
      if (isPending) {
      } else {
        const params = [hash];
        const tx_response = await RPC.callRPC(this.chainIds, TRANSACTIONFUNCS.GETTXBYHASH, params);
        if (!tx_response || tx_response === null) {
          throw new Error('can not get tx by hash');
        }

        let amount: any;
        let to: string;
        let asset: COINS;
        const token = findTokenByChainIdsAndContractAddress(this.chainIds, tx_response.result.to);
        if (token) {
          const {
            tokenTo,
            tokenAmount,
            token: COINS,
          } = await this.getERC20TransferToAmountAndTokenByInput(tx_response.result.input);

          amount = tokenAmount;
          to = tokenTo;
          asset = token.symbol;
        } else {
          amount = ethers.formatUnits(tx_response.result.value, 18);
          to = tx_response.to;
          asset = COINS.ETH;
        }

        const receipt_response = await RPC.callRPC(this.chainIds, TRANSACTIONFUNCS.GETTXRECEIPT, params);
        if (!receipt_response || receipt_response === null) {
          throw new Error('can not get tx by hash');
        }

        let tx_status: TRANSACTIONSTATUS = TRANSACTIONSTATUS.PENDING;
        const status = parseInt(receipt_response.result.status, 16);
        if (status === 1) {
          tx_status = TRANSACTIONSTATUS.SUCCESS;
        } else if (status === 0) {
          tx_status = TRANSACTIONSTATUS.FAILED;
        }

        const gasUsed = parseInt(receipt_response.result.gasUsed, 16).toString();
        const gasPrice = parseInt(receipt_response.result.effectiveGasPrice, 16).toString();
        const fee = ethers.formatEther(BigMul(gasUsed, gasPrice).toString());

        return {
          hash: receipt_response.result.transactionHash,
          from: receipt_response.result.from,
          to: to,
          value: amount,
          asset: asset,
          fee: fee,
          status: tx_status,
          blockNumber: parseInt(receipt_response.result.blockNumber, 16),
          url: explorerUrl,
        };
      }

      throw new Error('can not get the transaction of eth');
    } catch (e) {
      console.error(e);
      throw new Error('can not get the transaction of eth');
    }
  }

  static async estimateGas(txParams: TransactionRequest): Promise<number> {
    try {
      const response = await RPC.callRPC(this.chainIds, TRANSACTIONFUNCS.EstimateGas, [
        {
          from: txParams.from,
          to: txParams.to,
          value: txParams.value,
        },
      ]);
      if (!response || response === null) {
        throw new Error('can not estimate gas of eth');
      }

      const gasLimit = new Big(parseInt(response.result, 16));
      if (gasLimit && gasLimit.gt(0)) {
        return gasLimit.toNumber();
      }

      throw new Error('can not estimate gas of eth');
    } catch (e) {
      console.error(e);
      throw new Error('can not estimate gas of eth');
    }
  }

  static async getGasPrice(): Promise<ETHGasPrice> {
    try {
      const response = await RPC.callRPC(this.chainIds, TRANSACTIONFUNCS.GETGASPRICE, []);
      if (!response || response === null) {
        throw new Error('can not get gasPrice');
      }

      const gasPrice = new Big(parseInt(response.result, 16));

      if (gasPrice && gasPrice.gt(0)) {
        return {
          slow: gasPrice.toString(),
          normal: gasPrice.mul(150).div(100).toString(),
          fast: gasPrice.mul(2).toString(),
        };
      }

      throw new Error('can not get gasPrice of eth');
    } catch (e) {
      console.error(e);
      throw new Error('can not get gasPrice of eth');
    }
  }

  static async getMaxPriorityFeePerGas(): Promise<ETHMaxPriorityFeePerGas> {
    try {
      const response = await RPC.callRPC(this.chainIds, TRANSACTIONFUNCS.MaxPriorityFeePerGas, []);
      if (!response || response === null) {
        throw new Error('can not get maxPriorityFeePerGas of eth');
      }

      const maxPriorityFeePerGas = new Big(parseInt(response.result, 16));

      if (maxPriorityFeePerGas) {
        return {
          slow: maxPriorityFeePerGas.toString(),
          normal: maxPriorityFeePerGas.mul(150).div(100).toString(),
          fast: maxPriorityFeePerGas.mul(2).toString(),
        };
      }

      throw new Error('can not get maxPriorityFeePerGas of eth');
    } catch (e) {
      console.error(e);

      throw new Error('can not get maxPriorityFeePerGas of eth');
    }
  }

  static async getGasLimit(contractAddress: string, from: string, to: string, value: string): Promise<number> {
    if (contractAddress && contractAddress !== '') {
      return 96000;
    }

    const txParams: TransactionRequest = {
      from: from,
      to: to,
      value: new Big(value).toNumber(),
    };

    return await this.estimateGas(txParams);
  }

  static async createTransaction(request: CreateTransaction): Promise<CreateTransaction> {
    if (request.contractAddress) {
      return await this.createERC20Transaction(request);
    } else {
      return await this.createETHTransaction(request);
    }
  }

  static async createETHTransaction(request: CreateTransaction): Promise<CreateTransaction> {
    request.value = ethers.parseEther(request.value).toString();
    request.type = 2;
    if (request.gasPrice) {
      request.maxFeePerGas = request.gasPrice;
    } else {
      const price = await this.getGasPrice();
      request.gasPrice = price.normal;
      request.maxFeePerGas = price.normal;
    }

    if (!request.gasLimit) {
      const limit = await this.getGasLimit(request.contractAddress as string, request.from, request.to, request.value);
      request.gasLimit = limit;
    }

    if (!request.maxPriorityFeePerGas) {
      const fee = await this.getMaxPriorityFeePerGas();
      request.maxPriorityFeePerGas = fee.normal;
    }
    return request;
  }

  static async createERC20Transaction(request: CreateTransaction): Promise<CreateTransaction> {
    request.value = '0';
    request.type = 2;

    const decimals = await this.getERC20Decimals(request.contractAddress as string);
    const value = ethers.parseUnits(request.value, decimals).toString();
    const iface = new ethers.Interface(ERC20Abi);
    const data = iface.encodeFunctionData('transfer', [request.to, value]);
    request.data = data;
    request.to = request.contractAddress as string;

    if (request.gasPrice) {
      request.maxFeePerGas = request.gasPrice;
    } else {
      const price = await this.getGasPrice();
      request.gasPrice = price.normal;
      request.maxFeePerGas = price.normal;
    }

    if (!request.gasLimit) {
      const limit = await this.getGasLimit(request.contractAddress as string, request.from, request.to, request.value);
      request.gasLimit = limit;
    }

    if (!request.maxPriorityFeePerGas) {
      const fee = await this.getMaxPriorityFeePerGas();
      request.maxPriorityFeePerGas = fee.normal;
    }

    return request;
  }

  static async getNonce(address: string): Promise<number> {
    try {
      const params = [address, 'latest'];
      const response = await RPC.callRPC(this.chainIds, TRANSACTIONFUNCS.GETNONCE, params);
      if (!response || response === null) {
        throw new Error('can not get nonce of eth');
      }

      const nonce = parseInt(response.result, 16);

      if (nonce) {
        return nonce;
      }

      throw new Error('can not get nonce of eth');
    } catch (e) {
      console.error(e);
      throw new Error('can not get nonce of eth');
    }
  }

  static async getFee(request: CreateTransaction): Promise<string> {
    const tx = await this.createTransaction(request);
    return ethers.formatEther(BigMul(tx.gasPrice, tx.gasLimit.toString()));
  }

  static async sendAccelerateTransaction(request: CreateTransaction): Promise<string> {
    if (!request.privateKey || request.privateKey === '') {
      throw new Error('can not get private key of eth');
    }

    request.value = ethers.parseUnits(request.value).toString();
    request.type = 2;

    if (request.maxPriorityFeePerGas) {
      request.maxPriorityFeePerGas = new Big(request.maxPriorityFeePerGas).mul(150).div(100).toString();
    } else {
      const priorityFee = await this.getMaxPriorityFeePerGas();
      request.maxPriorityFeePerGas = priorityFee.normal;
    }

    if (request.contractAddress) {
      request.to = request.contractAddress;
    }

    try {
      const provider = await this.getProvider();
      const wallet = new ethers.Wallet(request.privateKey, provider);
      const response = await wallet.sendTransaction(request);
      if (response) {
        return response.hash;
      }

      throw new Error('can not send transaction of eth');
    } catch (e) {
      console.error(e);
      throw new Error('can not send transaction of eth');
    }
  }

  static async sendTransaction(request: SendTransaction): Promise<string> {
    if (!request.privateKey || request.privateKey === '') {
      throw new Error('can not get private key of eth');
    }

    const cRequest: CreateTransaction = {
      chainId: request.coin.chainId,
      from: request.from,
      to: request.to,
      privateKey: request.privateKey,
      value: request.value,
      gasPrice: request.gasPrice as string,
      gasLimit: request.gasLimit as number,
      maxPriorityFeePerGas: request.maxPriorityFeePerGas,
    };

    let tx = await this.createTransaction(cRequest);
    tx.nonce = await this.getNonce(tx.from);

    try {
      const provider = await this.getProvider();
      const wallet = new ethers.Wallet(request.privateKey, provider);
      const response = await wallet.sendTransaction(cRequest);
      if (response) {
        return response.hash;
      }

      throw new Error('can not send transaction of eth');
    } catch (e) {
      console.error(e);
      throw new Error('can not send transaction of eth');
    }
  }

  //   static signMessage(privateKey: string, message: string): string {
  //   }

  static async personalSign(privateKey: string, message: string): Promise<string> {
    const wallet = new ethers.Wallet(privateKey);
    const messageBytes = ethers.toUtf8Bytes(message);
    const signature = await wallet.signMessage(messageBytes);
    return signature;
  }
}
