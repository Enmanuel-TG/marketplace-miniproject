import { Router } from 'express';
import { createPost } from '../controllers/product.controller';

const router = Router();

router.post('/create', createPost);

export default router;
