import { Response } from 'express';
import { ExtendedRequest } from '../types.d';
import { prisma } from '../utilities/prisma.utility.ts';
import getImg from '../controllers/upload.controller.ts';
import { CloudinaryUploadResponse } from '../types.d';

export const profile = async (req: ExtendedRequest, res: Response) => {
  const id = req.userId;
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

export const updatePhotoProfile = async (req: ExtendedRequest, res: Response) => {
  const id = req.userId;
  const result = (await getImg(req, res)) as CloudinaryUploadResponse;

  if (!result) {
    return res.status(400).json({
      message: 'Error to upload image',
    });
  }
  const urlPhoto = result.url;
  const userFound = await prisma.user.update({
    where: { id },
    data: { photo: urlPhoto },
  });
  if (!userFound) {
    return res.status(404).json({
      message: 'User not found',
    });
  }
  return res.json({
    id: userFound.id,
    photo: userFound.photo,
  });
};
