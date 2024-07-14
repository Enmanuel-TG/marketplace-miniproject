import { Request, Response } from 'express';
import { prisma } from '../utilities/prisma.utility.ts';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET, FRONTEND_URL, TOKEN_PASSWORD_RESET } from '../utilities/consts.utility.ts';
import { emailTransporter } from '../utilities/email-transporter.utility.ts';

export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json(['User not found.']);
    }
    const token = jwt.sign({ userId: user.id }, TOKEN_SECRET, { expiresIn: TOKEN_PASSWORD_RESET });
    const resetUrl = `${FRONTEND_URL}/reset-password/?token=${token}`;
    await emailTransporter.sendMail({
      to: user.email,
      subject: 'Password Reset',
      html: `
        <p>Dear ${user.name},</p>
        <p>We received a request to reset your password. Please click the link below to reset your password:</p>
        <p><a href="${resetUrl}">Reset your password</a></p>
        <p>If you did not request a password reset, please ignore this email or contact support if you have any questions.</p>
        <p>Best regards,</p>
        <p>Marketplace App Team</p>
      `,
    });

    return res.status(200).json(['Password reset link sent.']);
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
      return res.status(400).json(['Invalid or expired token.']);
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
      },
    });
    return res.status(200).json(['Password reset successful.']);
  } catch (error) {
    return res.status(400).json(['Your link is not valid or expired.']);
  }
};
