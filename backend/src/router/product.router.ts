import { Router } from 'express';
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getAllUserProduct,
  getProduct,
  getProductsByCategory,
  searchProduct,
  updateProduct,
} from '../controllers/product.controller';
import validateSchema from '../middlewares/validator.middleware';
import ProductValidator from '../validators/product.validator';

const router = Router();

router.post('/create', validateSchema(ProductValidator), createProduct);
router.delete('/delete/:id', deleteProduct);
router.put('/update/:id', validateSchema(ProductValidator), updateProduct);
router.get('/product/:id', getProduct);
router.get('/userProduct/:id', getAllUserProduct);
router.get('/allProduct', getAllProduct);
router.get('/category', getProductsByCategory);
router.get('/search', searchProduct);

export default router;

