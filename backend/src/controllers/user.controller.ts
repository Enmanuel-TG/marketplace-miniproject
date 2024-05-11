import { Response } from 'express';
import { ExtendedRequest } from '../types.d';
import { prisma } from '../utilities/prisma.utility.ts';
import getTokenId from '../utilities/get.token.id.ts';
import { UploadedFile } from 'express-fileupload';
import { PHOTO_PROFILE_FOLDER } from '../utilities/consts.utility.ts';
import uploadImage from '../utilities/cloudinary.utility.ts';

export const profile = async (req: ExtendedRequest, res: Response) => {
  const id = req.userId;
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
  const id = getTokenId(req);
  const photo = req.files?.photo;
  if (!id) {
    return res.status(404).json({
      message: 'User not found',
    });
  }

  if (!photo) {
    return res.status(400).json('No photo uploaded.');
  }

  const file = photo as UploadedFile;
  const tempFilePath = file.tempFilePath;
  const result = await uploadImage(tempFilePath, PHOTO_PROFILE_FOLDER);
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
    name: userFound.name,
    newPhoto: userFound.photo,
  });
};
