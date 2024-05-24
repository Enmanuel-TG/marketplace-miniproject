import { UploadedFile } from 'express-fileupload';
import uploadImage from './cloudinary.utility';

const uploadedPhotos = async (photos: UploadedFile, folder: string) => {
  const images: string[] = [];
  if (Array.isArray(photos)) {
    for (const photo of photos) {
      const file = photo as UploadedFile;
      const tempFilePath = file.tempFilePath;
      const result = await uploadImage(tempFilePath, folder);
      images.push(result.url);
    }
  } else {
    const file = photos as UploadedFile;
    const tempFilePath = file.tempFilePath;
    const result = await uploadImage(tempFilePath, folder);
    images.push(result.url);
  }
  return images;
};

export default uploadedPhotos;
