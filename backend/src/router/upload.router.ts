import { Router } from 'express';
import uploadImg from '../controllers/upload.controller.ts';
const router = Router();

router.post('/photo', uploadImg);

export default router;
