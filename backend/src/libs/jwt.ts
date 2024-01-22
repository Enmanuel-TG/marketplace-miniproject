import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../utilities/consts.utility';

export function createAccessToken(payload: any): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: '7d' }, (err, token) => {
      if (err) reject(err);
      resolve(token);
    });
  });
}
