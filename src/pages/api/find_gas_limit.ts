import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData, CorsMiddleware, CorsMethod } from '.';
import { WEB3 } from 'packages/web3';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    await CorsMiddleware(req, res, CorsMethod);

    switch (req.method) {
      case 'GET':
        const chainId = req.query.chain_id;
        const network = req.query.network;
        const contractAddress = req.query.contract_address;
        const from = req.query.from;
        let to = req.query.to;
        let value = req.query.value;

        if (!to || to === "") {
            to = "0x0000000000000000000000000000000000000000"
        }

        if (!value || value === "") {
            value = '1'
        }

        const gas = await WEB3.getGasLimit(
          parseInt(network as string) === 1 ? true : false,
          parseInt(chainId as string),
          contractAddress as string,
          from as string,
          to as string,
          value as string,
        );

        return res.status(200).json({ message: '', result: true, data: gas });
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
