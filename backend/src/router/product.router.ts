import { Router } from 'express';
import { createPost, deletePost, updatePost } from '../controllers/product.controller';

const router = Router();

router.post('/create', createPost);
router.delete('/delete/:id', deletePost);
router.put('/update/:id', updatePost);

export default router;
