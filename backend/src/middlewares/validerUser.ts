import { PrismaClient } from '@prisma/client';
import { Response, Request, NextFunction } from 'express';
const prisma = new PrismaClient();

const userValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { email, age } = req.body;
  const parsedAge = parseInt(age);
  const errors = [];
  try {
    const userFound = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (userFound) {
      errors.push({
        type: 'email',
        message: 'email is already in use',
      });
    }
    if (parsedAge < 18) {
      errors.push({
        type: 'age',
        message: 'You need to be of legal age',
      });
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }
    return next();
  } catch (error) {
    return res.status(500).json({
      message: 'Error  internal server',
      error: error,
    });
  }
};

export default userValidator;
