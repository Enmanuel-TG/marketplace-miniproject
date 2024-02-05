import { Request, Response } from 'express';
import { createAccessToken } from '../utils/jwt.utility.ts';

export const login = async (req: Request, res: Response) => {
  const user = req.body;
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
    message: 'login successfully',
  });
};

export default login;
