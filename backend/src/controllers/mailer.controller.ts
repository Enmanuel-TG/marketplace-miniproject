import { Request, Response } from 'express';
import { prisma } from '../utilities/prisma.utility';
import { TOKEN_SECRET, FRONTEND_URL, TOKEN_PASSWORD_RESET } from '../utilities/consts.utility';
import jwt from 'jsonwebtoken';
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
