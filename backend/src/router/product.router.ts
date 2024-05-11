import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProduct,
} from '../controllers/product.controller';
import ProductValidator from '../validators/product.validators.ts';
import validateSchema from '../middlewares/validator.middleware.ts';

const router = Router();

router.post('/create', validateSchema(ProductValidator), createProduct);
router.delete('/delete/:id', deleteProduct);
router.put('/update/:id', validateSchema(ProductValidator), updateProduct);
router.get('/:id', getProduct);
router.get('/', getAllProduct);

export default router;
