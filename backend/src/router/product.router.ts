import { Router, Request, Response } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from '../controllers/product.controller';
import ProductValidator from '../validators/product.validators.ts';
import validateSchema from '../middlewares/validator.middleware.ts';
import { UploadedFile } from 'express-fileupload';
import uploadImage from '../utilities/cloudinary.utility.ts';
import { PHOTOS_PRODUCT_FOLDER } from '../utilities/consts.utility.ts';

const router = Router();

router.post('/create', validateSchema(ProductValidator), createProduct);
router.delete('/delete/:id', deleteProduct);
router.put('/update/:id', validateSchema(ProductValidator), updateProduct);
router.get('/:id', getProduct);
router.get('/', getAllProduct);

router.post('/test', async (req: Request, res: Response) => {
  const photos = req.files?.photos;
  const images = [];

  if (!photos) {
    return res.status(400).json({ message: 'No photo uploaded.' });
  }

  if (!Array.isArray(photos)) {
    images.push(photos);
  } else {
    for (const photo of photos) {
      const file = photo as UploadedFile;
      const tempFilePath = file.tempFilePath;
      const result = await uploadImage(tempFilePath, PHOTOS_PRODUCT_FOLDER);
      images.push(result);
    }
  }

  return res.json({ message: 'test', images });
});

export default router;
