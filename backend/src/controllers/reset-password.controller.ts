import { Request, Response } from 'express';
import { prisma } from '../utilities/prisma.utility';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET, FRONTEND_URL, TOKEN_PASSWORD_RESET } from '../utilities/consts.utility';
import { emailTransporter } from '../utilities/email-transporter.utility.ts';

export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json(['User not found']);
    }
    const token = jwt.sign({ userId: user.id }, TOKEN_SECRET, { expiresIn: TOKEN_PASSWORD_RESET });
    const resetUrl = `${FRONTEND_URL}/reset-password/?token=${token}`;
    await emailTransporter.sendMail({
      to: user.email,
      subject: 'Password Reset',
      html: `<a href="${resetUrl}">Reset your password</a>`,
    });

    return res.status(200).json(['Password reset link sent']);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

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
    return res.status(400).json(error);
  }
};
