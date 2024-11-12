import { Request, Response } from 'express';
import { prisma } from '../utilities/prisma.utility.ts';

export const changeRoleUser = async (req: Request, res: Response) => {
  const { id, role } = req.body;
  try {
    const updatedUser = await prisma.user.update({
      where: {
        id,
      },
      data: {
        role,
      },
    });
    return res.status(200).json({
      message: 'User role updated successfully.',
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
      message: 'Error to update user role.',
      error,
    });
  }
};
