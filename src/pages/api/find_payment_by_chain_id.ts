import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from 'packages/db/mysql';
import { ResponseData, CorsMiddleware, CorsMethod } from '.';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    await CorsMiddleware(req, res, CorsMethod);

    switch (req.method) {
      case 'GET':
        const connection = await connectDatabase();
        const userId = req.query.user_id;
        const storeId = req.query.store_id;
        const chainId = req.query.chain_id;

        const query =
          'SELECT current_used_address_id FROM payment_settings where user_id = ? and store_id = ? and chain_id = ?';
        const values = [userId, storeId, chainId];
        const [rows] = await connection.query(query, values);
        if (Array.isArray(rows) && rows.length === 1) {
          const row = rows[0] as mysql.RowDataPacket;

          const addressQuery = 'SELECT address FROM addresses where id = ? and status = 1';
          const addressValues = [row.current_used_address_id];
          const [addressRows] = await connection.query(addressQuery, addressValues);

          return res.status(200).json({
            message: '',
            result: true,
            data: addressRows,
          });
        }
        return res.status(200).json({ message: '', result: true, data: rows });

      case 'POST':
        break;
      default:
        throw 'no support the method of api';
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: '', result: false, data: e });
  }
}
