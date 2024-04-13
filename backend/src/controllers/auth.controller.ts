import { Response, Request } from 'express';
import { createAccessToken } from '../utilities/jwt.utility.ts';
import { prisma } from '../utilities/prisma.utility.ts';
import { NAME_TOKEN } from '../utilities/consts.utility.ts';
import { IMG_DEFAULT } from '../utilities/consts.utility.ts';
import bcrypt from 'bcryptjs';
import calculateAge from '../utilities/calculate-age.utility.ts';
import { LEGAL_AGE } from '../utilities/consts.utility';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, birthday, phoneNumber } = req.body;
  const passwordhash = await bcrypt.hash(password, 10);

  const age = calculateAge(birthday);
  try {
    const userFound = await prisma.user.findUnique({ where: { email: email } });
    if (userFound) {
      return res.status(400).json(['the email is already in use']);
    }
    if (age < LEGAL_AGE) {
      return res.status(400).json(['You need to be of legal age']);
    }
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: passwordhash,
        birthday,
        phoneNumber,
        photo: IMG_DEFAULT,
      },
    });

    const token = await createAccessToken({ id: user.id });
    return res
      .cookie(NAME_TOKEN, token, { httpOnly: true })
      .status(200)
      .json({
        message: 'register successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          birthday: user.birthday,
          phoneNumber: user.phoneNumber,
          photo: user.photo,
        },
      });
  } catch (error) {
    return res.status(500).json({
      message: 'error to register user',
      error: error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const userFound = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!userFound) {
    return res.status(400).json(['User not found']);
  }
  const isMatch = await bcrypt.compare(password, userFound.password);
  if (!isMatch) {
    return res.status(400).json(['Incorrect data']);
  }
  const token = await createAccessToken({ id: userFound.id });
  return res
    .cookie(NAME_TOKEN, token, { httpOnly: true })
    .status(200)
    .json({
      message: 'login successfully',
      user: {
        id: userFound.id,
        name: userFound.name,
        email: userFound.email,
        birthday: userFound.birthday,
        phoneNumber: userFound.phoneNumber,
        photo: userFound.photo,
      },
    });
};

export const logout = (res: Response) => {
  try {
    res.cookie(NAME_TOKEN, '', {
      expires: new Date(0),
    });
    return res.status(200).json({ message: 'Logout successfully' });
  } catch (error) {
    return res.status(500).json(['Error internal server']);
  }
};
