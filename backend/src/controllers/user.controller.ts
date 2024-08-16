import { Response, Request } from 'express';
import { ExtendedRequest } from '../types.d';
import { prisma } from '../utilities/prisma.utility.ts';
import getTokenId from '../utilities/get-token-id.utility.ts';
import uploadedPhotos from '../utilities/uploaded-photo.utility.ts';
import { PHOTO_PROFILE_FOLDER } from '../utilities/consts.utility.ts';
import { UploadedFile } from 'express-fileupload';
import bcrypt from 'bcryptjs';

export const profile = async (req: ExtendedRequest, res: Response) => {
  const id = req.userId;
  const userFound = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!userFound) {
    return res.status(404).json({
      message: 'User not found.',
    });
  }
  return res.json({
    id: userFound.id,
    name: userFound.name,
    email: userFound.email,
    birthday: userFound.birthday,
    phoneNumber: userFound.phoneNumber,
    photo: userFound.photo,
    createdAt: userFound.createdAt,
  });
};

export const updatePhotoProfile = async (req: ExtendedRequest, res: Response) => {
  const id = getTokenId(req);
  const photo = req.files?.photo;
  if (!id) {
    return res.status(404).json({
      message: 'User not found.',
    });
  }

  if (!photo) {
    return res.status(400).json('No photo uploaded.');
  }
  const urlPhoto = await uploadedPhotos(photo as UploadedFile, PHOTO_PROFILE_FOLDER);
  const userFound = await prisma.user.update({
    where: { id },
    data: { photo: urlPhoto[0] },
  });
  if (!userFound) {
    return res.status(404).json({
      message: 'User not found.',
    });
  }
  return res.json({
    id: userFound.id,
    name: userFound.name,
    newPhoto: userFound.photo,
  });
};

export const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword } = req.body;
  const id = getTokenId(req);
  const userFound = await prisma.user.findUnique({
    where: { id },
  });
  if (!userFound) {
    return res.status(404).json(['User not found.']);
  }
  const isMatch = await bcrypt.compare(oldPassword, userFound.password);
  if (!isMatch) {
    return res.status(400).json(['Incorrect data.']);
  }
  const passwordhash = await bcrypt.hash(newPassword, 10);
  try {
    await prisma.user.update({
      where: { id },
      data: { password: passwordhash },
    });
    return res.json(['Password changed successfully.']);
  } catch (error) {
    return res.status(500).json(['Error to change password.']);
  }
};
export const getUser = async (req: Request, res: Response) => {
  const { id } = req.body;
  try {
    const userFound = await prisma.user.findUnique({
      where: {
        id: Number(id),
      },
    });
    if (!userFound) {
      return res.status(404).json({
        message: 'User not found.',
      });
    }
    return res.status(200).json({
      id: userFound.id,
      name: userFound.name,
      photo: userFound.photo,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error to get user.',
      error,
    });
  }
};
