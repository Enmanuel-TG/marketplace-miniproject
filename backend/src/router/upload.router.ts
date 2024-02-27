import { Router } from 'express';
import getImg from '../controllers/upload.controller.ts';

const router = Router();

router.post('/photo', getImg);

export default router;
