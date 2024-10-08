import { Router } from 'express';
import {
  profile,
  updatePhotoProfile,
  changePassword,
  getUser,
  updateUser,
  updateDescription,
} from '../controllers/user.controller';
import validateToken from '../middlewares/validate-token.middleware.ts';
import validateSchema from '../middlewares/validator.middleware.ts';
import { passwordValidator } from '../validators/user.validator.ts';
import { UpdateProfileValidator } from '../validators/update-profile.validator.ts';

const router = Router();

router.get('/profile', validateToken, profile);
router.post('/update', validateToken, updatePhotoProfile);
router.post('/get-user', getUser);
router.put('/change-password', validateSchema(passwordValidator), changePassword);
router.put('/profile', validateToken, validateSchema(UpdateProfileValidator), updateUser);
router.put('/description', validateToken, updateDescription);

export default router;
