import { Router } from 'express';
import { profile, updatePhotoProfile, changePassword } from '../controllers/user.controller';
import validateToken from '../middlewares/validate-token.middleware.ts';

const router = Router();

router.get('/profile', validateToken, profile);
router.post('/update', validateToken, updatePhotoProfile);
router.put('/change', changePassword);

export default router;
