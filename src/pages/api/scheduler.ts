import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from 'packages/db/mysql';
import { ResponseData, CorsMiddleware, CorsMethod } from '.';
import { ORDER_STATUS } from 'packages/constants';
import mysql from 'mysql2/promise';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    await CorsMiddleware(req, res, CorsMethod);

    switch (req.method) {
      case 'GET':
        console.log('Schduler Task: Checkout status of order');
        const connection = await connectDatabase();
        const query = 'SELECT * FROM invoices where order_status = ? and status = ?';
        const values = [ORDER_STATUS.Processing, 1];
        const [rows] = await connection.query(query, values);

        if (Array.isArray(rows) && rows.length > 0) {
          const items = rows as mysql.RowDataPacket[];

          items.forEach(async (item) => {
            const currentTime = Date.now();
            const remainingTime = item.expiration_date - currentTime;

            if (remainingTime <= 0) {
              // update status from processing to expired
              const update_query = 'UPDATE invoices set order_status = ? where status = 1';
              const update_values = [ORDER_STATUS.Expired];
              await connection.query(update_query, update_values);
            }
          });
        }

        return res.status(200).json({ message: '', result: true, data: null });
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
