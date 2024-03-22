import { prisma } from '../utilities/prisma.utility';
import { Response, Request, NextFunction } from 'express';
import calculateAge from '../utilities/calculate-age.utility';
import { LEGAL_AGE } from '../utilities/consts.utility';

const registerValidator = async (req: Request, res: Response, next: NextFunction) => {
  const { email, name, birthday } = req.body;
  const errors = [];
  try {
    const age = calculateAge(birthday);
    const userFound = await prisma.user.findFirst({
      where: {
        email,
      },
    });
    if (userFound) {
      errors.push({
        type: 'email',
        message: 'Email is already in use',
      });
    };
    if (!name || name == " ") {
      errors.push({
        type: 'name',
        message:'Invalid name'
      })
     };

    if (age < LEGAL_AGE) {
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

export default registerValidator;