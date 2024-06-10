import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllUserProduct,
  getProduct,
  updateProduct,
  getAllProduct,
} from '../controllers/product.controller';
import ProductValidator from '../validators/product.validator.ts';
import validateSchema from '../middlewares/validator.middleware.ts';

const router = Router();

router.post('/create', validateSchema(ProductValidator), createProduct);
router.delete('/delete/:id', deleteProduct);
router.put('/update/:id', validateSchema(ProductValidator), updateProduct);
router.get('/:id', getProduct);
router.get('/:id', getAllUserProduct);
router.get('/', getAllProduct);

export default router;
