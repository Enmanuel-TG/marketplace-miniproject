// import { Response, Request, NextFunction } from 'express';
// import { prisma } from '../utilities/prisma.utility';
// import bcrypt from 'bcryptjs';

// const loginValidator = async (req: Request, res: Response, next: NextFunction) => {
//   //const errors = [];
//   try {
//     const { email, password } = req.body;
//     const userFound = await prisma.user.findUnique({
//       where: {
//         email,
//       },
//     });
//     if (!userFound) {
//       return res.status(404).json(['User Not Found']);
//     }
//     const isMatch = await bcrypt.compare(password, userFound.password);
//     if (!isMatch) {
//       return res.status(404).json(['incorrect password']);
//     }
//     return next();
//   } catch (error) {
//     return res.status(404).json(error + '');
//   }
// };

// export default loginValidator;

import { Response, Request, NextFunction } from 'express';
import { prisma } from '../utils/prisma.utility';
import bcrypt from 'bcryptjs';

const loginValidator = async (req: Request, res: Response, next: NextFunction) => {
  const errors = [];

  try {
    const { email, password } = req.body;
    const userFound = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!userFound) {
      errors.push({
        code: 400,
        massage: 'User Not Found',
      });
    } else {
      if (!userFound.password) {
        errors.push({
          code: 400,
          massage: 'Password not set for the user',
        });
      } else {
        const isMatch = await bcrypt.compare(password, userFound.password);
        if (!isMatch) {
          errors.push({
            code: 400,
            massage: 'Incorrect password',
          });
        }
      }
    }
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    } else {
      return next();
    }
  } catch (error) {
    return res.status(500).json(['Internal Server Error']);
  }
};

export default loginValidator;
