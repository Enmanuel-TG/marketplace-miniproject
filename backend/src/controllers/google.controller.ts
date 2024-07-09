import { Response, Request } from 'express';
import { GOOGLE_API_URL, NAME_TOKEN } from '../utilities/consts.utility';
import { Role } from '@prisma/client';
import { prisma } from '../utilities/prisma.utility';
import { createAccessToken } from '../utilities/jwt.utility';

export const loginWithGoogle = async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const response = await fetch(`${GOOGLE_API_URL}/userinfo?access_token=${accessToken}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });
  const { email } = (await response.json()) as Record<string, string>;
  const userFound = await prisma.user.findUnique({
    where: {
      email: email,
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
        role: userFound.role,
        password: '',
      },
    });
};

export const registerWithGoogle = async (req: Request, res: Response) => {
  const accessToken = req.headers.authorization as string;
  const { phoneNumber, birthday } = req.body;
  let userRol: Role = Role.user;

  const count = await prisma.user.count();
  if (count === 0) {
    userRol = Role.admin;
  }

  const response = await fetch(`${GOOGLE_API_URL}/userinfo?access_token=${accessToken}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      Accept: 'application/json',
    },
  });
  const { email, name, picture } = (await response.json()) as Record<string, string>;

  const userFound = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (userFound) {
    return res.status(400).json(['User already exists']);
  }
  const user = await prisma.user.create({
    data: {
      name,
      email,
      birthday,
      phoneNumber,
      photo: picture,
      role: userRol,
      password: '',
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
};
