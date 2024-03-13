import jwt from 'jsonwebtoken';
import { TOKEN_SECRET, TOKEN_EXPIRES } from './consts.utility';

export function createAccessToken<T extends object>(payload: T): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, TOKEN_SECRET, { expiresIn: TOKEN_EXPIRES }, (err, token) => {
      if (err) reject(err);
      resolve(token as string);
    });
  });
}
