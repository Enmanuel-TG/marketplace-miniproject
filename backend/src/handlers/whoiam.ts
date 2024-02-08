import { Response, Request } from 'express';
import { prisma } from '../utils/prisma.utility';

export const whoIam = async (req: Request, res: Response) => {
  const { email } = req.body;
  const userFound = await prisma.user.findUnique({
    where: {
      email,
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

export default whoIam;
