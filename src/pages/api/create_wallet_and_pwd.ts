import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from 'packages/db/mysql';
import { ResponseData, CorsMiddleware, CorsMethod } from '.';
import CryptoJS from 'crypto-js';
import { NOTIFICATIONS } from 'packages/constants';

export default async function handle(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    await CorsMiddleware(req, res, CorsMethod);

    switch (req.method) {
      case 'POST':
        const connection = await connectDatabase();
        const userId = req.body.user_id;
        const password = req.body.password;
        const cryptoPassword = CryptoJS.SHA256(password).toString();
        const isBackup = 2;
        const storeId = req.body.store_id;

        const mnemonic = '';
        // user
        const query =
          'INSERT INTO wallets (user_id, store_id, mnemonic, password, is_backup, status) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [userId, storeId, mnemonic.toString(), cryptoPassword, isBackup, 1];
        const [ResultSetHeader]: any = await connection.query(query, values);
        const walletId = ResultSetHeader.insertId;
        if (walletId === 0) {
          return res.status(200).json({ message: 'Something wrong', result: false, data: null });
        }

        // notification
        const aQuery =
          'INSERT INTO addresses (user_id, wallet_id, address, address_type, private_key, note, status) VALUES (?, ?, ?, ?, ?, ?, ?)';
        for (const nKey in NOTIFICATIONS) {
          const nValue = [userId, walletId, 1];
          //   await connection.query(nQuery, nValue);
        }

        return res.status(200).json({ message: '', result: true, data: null });
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: '', result: false, data: e });
  }
}
