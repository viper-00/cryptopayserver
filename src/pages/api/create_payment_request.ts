import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from 'packages/db/mysql';
import { WEB3 } from 'packages/web3';
import { ResponseData, CorsMiddleware, CorsMethod } from '.';
import { BLOCKSCAN, BlockScanWalletType } from 'packages/web3/block_scan';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    await CorsMiddleware(req, res, CorsMethod);

    switch (req.method) {
      case 'POST':
        const connection = await connectDatabase();
        const userId = req.body.user_id;
        const storeId = req.body.store_id;

        const title = req.body.title;
        const amount = req.body.amount;
        const currency = req.body.currency;
        const allowCustomAmount = req.body.allow_custom_amount;
        const expirationDate = req.body.expiration_date;
        const email = req.body.email;
        const requestCustomerData = req.body.request_customer_data;
        const memo = req.body.memo;

        const createQuery =
          'INSERT INTO payment_requests (user_id, store_id, title, amount, currency, allow_custom_amount, expiration_date, email, request_customer_data, memo, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
        const createValues = [
          userId,
          storeId,
          title,
          amount,
          currency,
          allowCustomAmount,
          expirationDate,
          email,
          requestCustomerData,
          memo,
          1,
        ];
        const [ResultSetHeader]: any = await connection.query(createQuery, createValues);
        const walletId = ResultSetHeader.insertId;
        if (walletId === 0) {
          return res.status(200).json({ message: 'Something wrong', result: false, data: null });
        }

        return res.status(200).json({ message: '', result: true, data: null });
      default:
        throw 'no support the method of api';
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'no support the api', result: false, data: e });
  }
}
