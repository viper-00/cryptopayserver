import type { NextApiRequest, NextApiResponse } from 'next';
import { ResponseData } from '.';

export default async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  try {
    return res.status(200).json({ message: '', result: true, data: null });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: '', result: false, data: e });
  }
}
