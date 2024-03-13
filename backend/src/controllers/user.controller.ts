import { Response, Request } from 'express';
import { ExtendedRequest } from '../types.d';
import { prisma } from '../utilities/prisma.utility.ts';

export const profile = async (req: Request, res: Response) => {
  const id = (req as unknown as ExtendedRequest).userId;
  if (!id) {
    return res.status(404).json({
      message: 'User not found',
    });
  }
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
