import { Router } from 'express';
import { profile, updatePhotoProfile, changePassword } from '../controllers/user.controller';
import validateToken from '../middlewares/validate-token.middleware.ts';
import validateSchema from '../middlewares/validator.middleware.ts';
import { passwordValidator } from '../validators/auth.validator.ts';

const router = Router();

router.get('/profile', validateToken, profile);
router.post('/update', validateToken, updatePhotoProfile);
router.put('/change-password', validateSchema(passwordValidator), changePassword);

export default router;
