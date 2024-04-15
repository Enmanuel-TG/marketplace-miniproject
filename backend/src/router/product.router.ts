import { Router } from 'express';
import { createPost, deletePost, getAllPost, getPost, updatePost } from '../controllers/product.controller';
import postValidator from '../validators/post.validators.ts';
import validateSchema from '../middlewares/validator.middleware.ts';

const router = Router();

router.post('/create', validateSchema(postValidator), createPost);
router.delete('/delete/:id', deletePost);
router.put('/update/:id', validateSchema(postValidator), updatePost);
router.get('/:id', getPost);
router.get('/', getAllPost);

export default router;
