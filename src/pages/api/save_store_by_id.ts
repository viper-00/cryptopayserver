import type { NextApiRequest, NextApiResponse } from 'next';
import { connectDatabase } from 'packages/db/mysql';
import { WEB3 } from 'packages/web3';
import { ResponseData, CorsMiddleware, CorsMethod } from '.';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    await CorsMiddleware(req, res, CorsMethod);

    switch (req.method) {
      case 'PUT':
        const connection = await connectDatabase();
        const userId = req.body.user_id;
        const storeId = req.body.store_id;
        const brandColor = req.body.brand_color;
        const logoUrl = req.body.logo_url;
        const customCssUrl = req.body.custom_css_url;
        const currency = req.body.currency;
        const allowAnyoneCreateInvoice = req.body.allow_anyone_create_invoice;
        const addAdditionalFeeToInvoice = req.body.add_additional_fee_to_invoice;
        const invoiceExpiresIfNotPaidFullAmount = req.body.invoice_expires_if_not_paid_full_amount;
        const invoicePaidLessThanPrecent = req.body.invoice_paid_less_than_precent;
        const minimumExpiraionTimeForRefund = req.body.minimum_expiraion_time_for_refund;

        const updateQuery =
          'UPDATE stores SET brand_color = ?, logo_url = ?, custom_css_url = ?, currency = ?, allow_anyone_create_invoice = ?, add_additional_fee_to_invoice = ?, invoice_expires_if_not_paid_full_amount = ?, invoice_paid_less_than_precent = ?, minimum_expiraion_time_for_refund = ? WHERE id = ? and user_id = ? and status = ?';
        const updateValues = [
          brandColor,
          logoUrl,
          customCssUrl,
          currency,
          allowAnyoneCreateInvoice,
          addAdditionalFeeToInvoice,
          invoiceExpiresIfNotPaidFullAmount,
          invoicePaidLessThanPrecent,
          minimumExpiraionTimeForRefund,
          storeId,
          userId,
          1,
        ];
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
    return res.status(500).json({ message: 'no support the wallet', result: false, data: e });
  }
}
