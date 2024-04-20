import { NextFunction, Request, Response } from 'express';
import { getTokenId } from '../utilities/get-token-id.ts';
import { prisma } from '../utilities/prisma.utility.ts';
import { ROLES } from '../utilities/consts.utility.ts';
export const getUserAndRole = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const userId = getTokenId(req);
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.role !== ROLES.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    next();
    return res.status(200).json('yep');
  } catch (error: any) {
    return res.status(500).json({ message: 'Error processing request', error: error.message });
  }
};
