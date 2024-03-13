import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY_NAME, KEY, SECRET } from './consts.utility';

const uploadImage = async (filePath: string, folder: string): Promise<{ url: string; id: string }> => {
  cloudinary.config({
    cloud_name: CLOUDINARY_NAME,
    api_key: KEY,
    api_secret: SECRET,
  });
  const result = await cloudinary.uploader.upload(filePath, { folder });
  return { url: result.secure_url, id: result.public_id };
};

export default uploadImage;
