import { Response, Request, NextFunction } from 'express';
import { prisma } from '../utilities/prisma.utility';
import bcrypt from 'bcryptjs';

const loginValidator = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const userFound = await prisma.user.findUnique({
      where: {
        email: email,
        password: password,
      },
    });
    if (!userFound) {
      return res.status(404).json(['User Not Found']);
    }
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch) {
      return res.status(404).json(['incorrect password']);
    }
    return next();
  } catch (error) {
    return res.status(404).json(error + '');
  }
};

export default loginValidator;
