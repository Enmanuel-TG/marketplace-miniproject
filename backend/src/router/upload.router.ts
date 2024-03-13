import { Router } from 'express';
import getImg from '../controllers/upload.controller';

const router = Router();
router.post('/', getImg);

export default router;
