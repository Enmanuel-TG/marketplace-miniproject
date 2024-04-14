import { Router } from 'express';
import { createPost, deletePost } from '../controllers/product.controller';

const router = Router();

router.post('/create', createPost);
router.delete('/delete/:id', deletePost);

export default router;
