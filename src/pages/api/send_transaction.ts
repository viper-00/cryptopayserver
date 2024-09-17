import type { NextApiRequest, NextApiResponse } from 'next';
import { CHAINS } from 'packages/constants/blockchain';
import { connectDatabase } from 'packages/db/mysql';
import { ResponseData, CorsMiddleware, CorsMethod } from '.';
import { WEB3 } from 'packages/web3';
import mysql from 'mysql2/promise';
import { FindTokenByChainIdsAndContractAddress } from 'utils/web3';
import { BTC } from 'packages/web3/chain/btc';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    await CorsMiddleware(req, res, CorsMethod);

    switch (req.method) {
      case 'POST':
        const connection = await connectDatabase();
        const walletId = req.body.wallet_id;
        const userId = req.body.user_id;
        const chainId = req.body.chain_id;
        const network = req.body.network;
        const fromAddress = req.body.from_address;
        const toAddress = req.body.to_address;
        const feeRate = req.body.fee_rate;
        const value = req.body.value;

        const addressQuery =
          'SELECT private_key, note, network, address FROM addresses where chain_id = ? and network = ? and address = ? and wallet_id = ? and user_id = ? and status = 1';
        const addressValues = [chainId, network, fromAddress, walletId, userId];
        const [addressRows] = await connection.query(addressQuery, addressValues);
        if (Array.isArray(addressRows) && addressRows.length === 1) {
          const addressRow = addressRows[0] as mysql.RowDataPacket;

          const hash = await WEB3.sendTransaction(addressRow.network === 1 ? true : false, {
            coin: FindTokenByChainIdsAndContractAddress(
              WEB3.getChainIds(addressRow.network === 1 ? true : false, chainId),
              '',
            ),
            value: value,
            privateKey: addressRow.private_key,
            feeRate: feeRate,
            btcType: BTC.getType(addressRow.note),
            from: addressRow.address,
            to: toAddress,
          });

          return res.status(200).json({
            message: '',
            result: true,
            data: {
              hash: hash,
            },
          });
        }

      default:
        throw 'no support the method of api';
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: '', result: false, data: e });
  }
}
