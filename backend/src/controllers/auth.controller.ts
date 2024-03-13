import { Response, Request } from 'express';
import { createAccessToken } from '../utils/jwt.utility.ts';
import { prisma } from '../utils/prisma.utility.ts';
import { NAME_TOKEN } from '../utils/consts.utility.ts';
import { IMG_DEFAULT } from '../utils/consts.utility.ts';
import bcrypt from 'bcryptjs';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, birthday, phoneNumber } = req.body;
  const passwordhash = await bcrypt.hash(password, 10);
  try {
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
  const { email } = req.body;
  const userFound = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (!userFound) {
    return res.status(400).json(['User not found']);
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

export const logout = (_req: Request, res: Response) => {
  try {
    res.cookie(NAME_TOKEN, '', {
      expires: new Date(0),
    });
    return res.status(200).json({ message: 'Logout successfully' });
  } catch (error) {
    return res.status(500).json(['Error internal server']);
  }
};

export const whoiam = async (req: Request, res: Response) => {
  const id = (req as any).userId; //TODO: fix this
  const userFound = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!userFound) {
    return res.status(404).json({
      message: 'User not found',
    });
  }
  return res.json({
    id: userFound.id,
    name: userFound.name,
    email: userFound.email,
    birthday: userFound.birthday,
    phoneNumber: userFound.phoneNumber,
    photo: userFound.photo,
  });
};
