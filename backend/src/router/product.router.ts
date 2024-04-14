import { Router } from 'express';
import { createPost, deletePost, getAllPost, getPost, updatePost } from '../controllers/product.controller';

const router = Router();

router.post('/create', createPost);
router.delete('/delete/:id', deletePost);
router.put('/update/:id', updatePost);
router.get('/:id', getPost);
router.get('/', getAllPost);

export default router;
