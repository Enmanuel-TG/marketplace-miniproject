import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../utilities/consts.utility';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ message: 'Token not provided' });
  }
  try {
    const decoded = jwt.verify(token, TOKEN_SECRET);
    (req as any).user = decoded;
    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
export default validateToken;
