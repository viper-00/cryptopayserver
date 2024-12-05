import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from 'packages/db/mysql';
import { ResponseData, CorsMiddleware, CorsMethod } from '.';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    await CorsMiddleware(req, res, CorsMethod);

    switch (req.method) {
      case 'PUT':
        const connection = await connectDatabase();
        const pullPaymentId = req.body.id;
        const userId = req.body.user_id;
        const storeId = req.body.store_id;

        const name = req.body.name;
        const amount = req.body.amount;
        const currency = req.body.currency;
        const showAutoApproveClaim = req.body.show_auto_approve_claim;
        const description = req.body.description;
        const payoutMethod = req.body.payout_method;

        let updateQuery = 'UPDATE pull_payments SET ';
        let updateValues = [];
        if (name) {
          updateQuery += 'name = ?,';
          updateValues.push(name);
        }
        if (amount) {
          updateQuery += 'amount = ?,';
          updateValues.push(amount);
        }
        if (currency) {
          updateQuery += 'currency = ?,';
          updateValues.push(currency);
        }
        if (showAutoApproveClaim) {
          updateQuery += 'show_auto_approve_claim = ?,';
          updateValues.push(showAutoApproveClaim);
        }
        if (description) {
          updateQuery += 'description = ?,';
          updateValues.push(description);
        }
        if (payoutMethod) {
          updateQuery += 'payout_method = ?,';
          updateValues.push(payoutMethod);
        }

        updateQuery = updateQuery.slice(0, -1);

        updateQuery += ' WHERE pull_payment_id = ? and user_id = ? and store_id = ? and status = ?';
        updateValues.push(pullPaymentId, userId, storeId, 1);

        await connection.query(updateQuery, updateValues);

        return res.status(200).json({
          message: '',
          result: true,
          data: null,
        });
      default:
        throw 'no support the method of api';
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'no support the api', result: false, data: e });
  }
}
