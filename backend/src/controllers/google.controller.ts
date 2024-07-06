import { Response, Request } from 'express';
import { prisma } from '../utilities/prisma.utility.ts';
import { IMG_DEFAULT, NAME_TOKEN } from '../utilities/consts.utility.ts';
import { createAccessToken } from '../utilities/jwt.utility.ts';
import { Role } from '@prisma/client';

export const googleAuth = async (req: Request, res: Response) => {
  const { name, email, birthday, phoneNumber, photo, password } = req.body;
  let userRol: Role = Role.user;
  const userFound = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  const count = await prisma.user.count();
  if (count === 0) {
    userRol = Role.admin;
  }
  if (userFound) {
    return res.status(200).json({
      message: 'User successfully',
      user: {
        id: userFound.id,
        name: userFound.name,
        email: userFound.email,
        birthday: userFound.birthday,
        phoneNumber: userFound.phoneNumber,
        photo: userFound.photo,
        role: userFound.role,
      },
    });
  }
  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        birthday,
        phoneNumber,
        photo: photo || IMG_DEFAULT,
        role: userRol,
      },
    });
    const token = await createAccessToken({ id: user.id });
    return res
      .cookie(NAME_TOKEN, token, { httpOnly: true })
      .status(200)
      .json({
        message: 'User successfully',
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          birthday: user.birthday,
          phoneNumber: user.phoneNumber,
          photo: user.photo,
          role: user.role,
        },
      });
  } catch (error) {
    return res.status(500).json(['Error internal server', error]);
  }
};
