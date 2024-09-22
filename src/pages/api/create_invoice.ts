import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from 'packages/db/mysql';
import { WEB3 } from 'packages/web3';
import { ResponseData, CorsMiddleware, CorsMethod } from '.';
import { GenerateOrderIDByTime } from 'utils/number';
import mysql from 'mysql2/promise';
import { ORDER_STATUS } from 'packages/constants';

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
        const description = req.body.description;
        const buyerEmail = req.body.buyer_email;
        const metadata = req.body.metadata;
        const notificationUrl = req.body.notification_url;
        const notificationEmail = req.body.notification_email;

        const order_id = GenerateOrderIDByTime();

        const paymentSettingsQuery =
          'SELECT current_used_address_id, payment_expire FROM payment_settings where user_id = ? and store_id = ? and chain_id = ?';
        const paymentSettingsValues = [userId, storeId, chainId];
        const [paymentSettingsRows] = await connection.query(paymentSettingsQuery, paymentSettingsValues);
        if (Array.isArray(paymentSettingsRows) && paymentSettingsRows.length === 1) {
          const paymentSettingRow = paymentSettingsRows[0] as mysql.RowDataPacket;
          const paymentExpire = paymentSettingRow.payment_expire; // unit: minutes

          const addressQuery = 'SELECT address FROM addresses where id = ?';
          const addressValues = [paymentSettingRow.current_used_address_id];
          const [addressRows] = await connection.query(addressQuery, addressValues);
          if (Array.isArray(addressRows) && addressRows.length === 1) {
            const addressRow = addressRows[0] as mysql.RowDataPacket;

            const destinationAddress = addressRow.address;
            const paid = 2; // unpaid
            const orderStatus = ORDER_STATUS.Processing; // settled, invalid, expired, processing

            const now = new Date();
            const createDate = now.getTime();
            const expirationDate = now.getTime() + parseInt(paymentExpire) * 60 * 1000;

            const createQuery = `INSERT INTO invoices 
        (store_id, chain_id, network, order_id, amount, crypto, currency, description, buyer_email, destination_address, paid, metadata, notification_url, notification_email, order_status, created_date, expiration_date, status) 
        VALUES 
        (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            const createValues = [
              storeId,
              chainId,
              network,
              order_id,
              amount,
              crypto,
              currency,
              description,
              buyerEmail,
              destinationAddress,
              paid,
              metadata,
              notificationUrl,
              notificationEmail,
              orderStatus,
              createDate,
              expirationDate,
              1,
            ];
            const [ResultSetHeader]: any = await connection.query(createQuery, createValues);
            const invoiceId = ResultSetHeader.insertId;
            if (invoiceId === 0) {
              return res.status(200).json({ message: 'Something wrong', result: false, data: null });
            }

            return res.status(200).json({
              message: '',
              result: true,
              data: {},
            });
          }
        }

        return res.status(200).json({
          message: 'something wrong',
          result: false,
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
