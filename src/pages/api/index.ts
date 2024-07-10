import Cors from 'cors';
import type { NextApiRequest, NextApiResponse } from 'next';

export const CorsMethod = Cors({
  methods: ['POST', 'GET', 'HEAD'],
});

export function CorsMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export type ResponseData = {
  message?: string;
  result?: boolean;
  data?: any;
};