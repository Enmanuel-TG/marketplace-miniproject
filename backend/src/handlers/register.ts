import { PrismaClient } from '@prisma/client';
import { Response, Request } from 'express';
import { createAccessToken } from '../libs/jwt.ts';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  const { name, email, password, age, phoneNumber, photo } = req.body;

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password,
        age,
        phoneNumber,
        photo,
      },
    });

    const token = await createAccessToken({ id: user.id });
    res.cookie('token', token);
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      password: user.password,
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
