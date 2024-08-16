import { Router } from 'express';
import { profile, updatePhotoProfile, changePassword, getUser } from '../controllers/user.controller';
import validateToken from '../middlewares/validate-token.middleware.ts';
import validateSchema from '../middlewares/validator.middleware.ts';
import { passwordValidator } from '../validators/user.validator.ts';

const router = Router();

router.get('/profile', validateToken, profile);
router.post('/update', validateToken, updatePhotoProfile);
router.get('/get-user', getUser);
router.put('/change-password', validateSchema(passwordValidator), changePassword);

export default router;
