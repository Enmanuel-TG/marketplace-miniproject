import { Request, Response } from 'express';
import { prisma } from '../utilities/prisma.utility';
import { TOKEN_SECRET, PASSWORD, ACCOUNT } from '../utilities/consts.utility';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: ACCOUNT,
    pass: PASSWORD,
  },
});

export const requestPasswordReset = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(404).json(['User not found']);
    }
    const token = jwt.sign({ userId: user.id }, TOKEN_SECRET, { expiresIn: '1h' });
    await prisma.user.update({
      where: { email },
      data: {
        resetToken: token,
        resetTokenExpiry: new Date(Date.now() + 3600000),
      },
    });
    const resetUrl = `http://localhost:3000/reset-password?token=${token}`;
    await transporter.sendMail({
      to: user.email,
      subject: 'Password Reset',
      html: `<a href="${resetUrl}">Reset your password</a>`,
    });

    return res.status(200).json(['Password reset link sent']);
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};
