import jwt from 'jsonwebtoken';
import { TOKEN_SECRET, TOKEN_EXPIRES } from '../utilities/consts.utility';

export function createAccessToken(payload: any): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRES }, (err, token) => {
      if (err) reject(err);
      resolve(token as string);
    });
  });
}
