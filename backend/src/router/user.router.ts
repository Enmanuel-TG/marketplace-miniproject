import { Router } from 'express';
import { profile, updatePhotoProfile } from '../controllers/user.controller';
import validateToken from '../middlewares/validate-token.middleware.ts';

const router = Router();

router.post('/profile', validateToken, profile);
router.post('/update', validateToken, updatePhotoProfile);

export default router;
