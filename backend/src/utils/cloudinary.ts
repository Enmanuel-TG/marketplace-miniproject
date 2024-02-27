import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_NAME, KEY, SECRET } from './consts.utility';

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: KEY,
  api_secret: SECRET,
});

const uploadImage = async (filePath: string) => {
  const result = await cloudinary.uploader.upload(filePath, { folder: 'ftProfile' });
  return result.secure_url;
};

export default uploadImage;
