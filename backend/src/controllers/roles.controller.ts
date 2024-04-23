import { Request, Response } from 'express';
import { prisma } from '../utilities/prisma.utility.ts';

export const changeRolUser = async (req: Request, res: Response) => {
  const { email, role } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        role: role,
      },
    });
    return res.status(200).json({
      message: 'User role updated successfully',
      user: {
        id: updatedUser.id,
        role: updatedUser.role,
        name: updatedUser.name,
        email: updatedUser.email,
        photo: updatedUser.photo,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error to update user role',
      error,
    });
  }
};
