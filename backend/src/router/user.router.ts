import { Router } from 'express';
import { profile } from '../controllers/user.controller';
import validateToken from '../middlewares/validate-token.middleware.ts';

const router = Router();

router.post('/profile', validateToken, profile);

export default router;
