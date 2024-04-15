import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from '../controllers/product.controller';
import postValidator from '../validators/post.validators.ts';
import validateSchema from '../middlewares/validator.middleware.ts';

const router = Router();

router.post('/create', validateSchema(postValidator), createProduct);
router.delete('/delete/:id', deleteProduct);
router.put('/update/:id', validateSchema(postValidator), updateProduct);
router.get('/:id', getProduct);
router.get('/', getAllProduct);

export default router;
