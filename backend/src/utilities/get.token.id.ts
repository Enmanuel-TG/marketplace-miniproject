import { TOKEN_SECRET } from './consts.utility';
import jwt from 'jsonwebtoken';
import { ExtendedRequest } from '../types.d';

export const getTokenId = (req: ExtendedRequest) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, TOKEN_SECRET) as unknown as { id: string; iat: number; exp: number };
  req.userId = Number(decoded.id);
  const id = Number(decoded.id);
  return id;
};

export default getTokenId;
