import { prisma } from '../utilities/prisma.utility';
import { Response, Request } from 'express';
import { createAccessToken } from '../libs/jwt.ts';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, birthday, phoneNumber, photo } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        birthday,
        phoneNumber,
        photo,
      },
    });

    const token = await createAccessToken({ id: user.id });
    res.cookie('token', token);
    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        birthday: user.birthday,
        phoneNumber: user.phoneNumber,
        photo: user.photo,
      },
    });
    return res.status(200).json({
      message: 'register successfully',
    });
  } catch (error) {
    return res.status(500).json({
      message: 'error to register user',
      error: error,
    });
  }
};
