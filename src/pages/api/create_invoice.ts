import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from 'packages/db/mysql';
import { WEB3 } from 'packages/web3';
import { ResponseData, CorsMiddleware, CorsMethod } from '.';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    await CorsMiddleware(req, res, CorsMethod);

    switch (req.method) {
      case 'POST':
        const connection = await connectDatabase();
        const userId = req.body.user_id;
        const storeId = req.body.store_id;
        const chainId = req.body.chain_id;
        const network = req.body.network;
        const amount = req.body.amount;
        const currency = req.body.currency;
        const crypto = req.body.crypto;
        const orderId = req.body.order_id;
        const description = req.body.description;
        const buyerEmail = req.body.buyer_email;
        const metadata = req.body.metadata;
        const notificationUrl = req.body.notification_url;
        const notificationEmail = req.body.notification_email;

        const createQuery = `INSERT INTO invoices 
                                    (store_id, chain_id, network, invoice_id, order_id, amount, crypto, currency, description, buyer_email, payment_method, destination_address, rate, total_due, paid, metadata, notification_url, notification_email, order_status, created_date, expiration_date, status) 
                                    VALUES 
                                    (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        const createValues = [storeId, chainId, network];
        const [ResultSetHeader]: any = await connection.query(createQuery, createValues);
        const walletId = ResultSetHeader.insertId;
        if (walletId === 0) {
          return res.status(200).json({ message: 'Something wrong', result: false, data: null });
        }

        // wallet.account &&
        //   wallet.account.length > 0 &&
        //   wallet.account.map(async (item) => {
        //     const createWalletQuery =
        //       'INSERT INTO addresses (user_id, wallet_id, address, chain_id, private_key, note, network, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
        //     const createWalletValues = [
        //       userId,
        //       walletId,
        //       item.address,
        //       item.chain,
        //       item.privateKey,
        //       item.note,
        //       item.isMainnet ? 1 : 2,
        //       1,
        //     ];
        //     await connection.query(createWalletQuery, createWalletValues);
        //   });

        return res.status(200).json({
          message: '',
          result: true,
          data: {},
        });
      default:
        throw 'no support the method of api';
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: '', result: false, data: e });
  }
}
