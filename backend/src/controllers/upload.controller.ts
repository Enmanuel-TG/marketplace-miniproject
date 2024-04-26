import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import uploadImage from '../utilities/cloudinary.utility.ts';
import { PHOTO_PROFILE_FOLDER } from '../utilities/consts.utility.ts';

const getImg = async (req: Request, res: Response) => {
  try {
    if (!req.files) {
      return res.status(400).json('No photo uploaded.');
    }
    if (req.files.photo) {
      const file = req.files.photo as UploadedFile;
      const tempFilePath = file.tempFilePath;
      const result = await uploadImage(tempFilePath, PHOTO_PROFILE_FOLDER);
      return result;
    }
    return;
  } catch (error) {
    return res.status(500).json(error);
  }
};

export default getImg;
