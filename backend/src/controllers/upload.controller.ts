import { Request, Response } from 'express';
import { UploadedFile } from 'express-fileupload';
import uploadImage from '../utils/cloudinary.utility.ts';

const getImg = async (req: Request, res: Response) => {
  try {
    if (!req.files) {
      return res.status(400).json('No photo uploaded.');
    }
    if (req.files.photo) {
      const file = req.files.photo as UploadedFile;
      const tempFilePath = file.tempFilePath;
      const result = await uploadImage(tempFilePath);
      return res.status(200).json({ imageUrl: result });
    }
    return res.status(200).json('Complete');
  } catch (error) {
    return res.status(400).json(error);
  }
};

export default getImg;
