import { prisma } from '../utilities/prisma.utility';
import { Request, Response } from 'express';

import bcrypt from 'bcryptjs';

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const userFound = await prisma.user.findUnique({ where: { email } });
    if (!userFound) {
      return res.status(404).json(['User Not Found']);
    }
    const isMatch = await bcrypt.compare(password, password.userFound);
    if (!isMatch) {
      return res.status(404).json(['incorrect password']);
    }
  } catch (error) {
    return res.status(400).json(error);
  }
  return;
};

export default login;
