import { Request, Response } from 'express';
import { TOKEN_SECRET } from '../utilities/consts.utility';
import { prisma } from '../utilities/prisma.utility';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const resetPassword = async (req: Request, res: Response) => {
  const { newPassword } = req.body;
  const token = req.headers.authorization as string;
  try {
    const decoded = jwt.verify(token, TOKEN_SECRET) as { userId: number };
    const user = await prisma.user.findUnique({ where: { id: decoded.userId } });
    if (!user) {
      return res.status(400).json(['Invalid or expired token']);
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    });
    return res.status(200).json(['Password reset successful']);
  } catch (error) {
    return res.status(400).json(['Invalid token']);
  }
};
