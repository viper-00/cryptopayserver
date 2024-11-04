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
        const email = req.body.email;

        const username = req.body.username;
        const password = req.body.password;
        const profilePictureUrl = req.body.profile_picture_url;

        let updateQuery = 'UPDATE users SET ';
        let updateValues = [];
        if (username) {
          updateQuery += 'username = ?,';
          updateValues.push(username);
        }
        if (password) {
          updateQuery += 'password = ?,';
          updateValues.push(password);
        }
        if (profilePictureUrl) {
          updateQuery += 'profile_picture_url = ?,';
          updateValues.push(profilePictureUrl);
        }

        updateQuery = updateQuery.slice(0, -1);

        updateQuery += ' WHERE email = ? and status = ?';
        updateValues.push(email, 1);

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
    return res.status(500).json({ message: 'no support the webhook', result: false, data: e });
  }
}
