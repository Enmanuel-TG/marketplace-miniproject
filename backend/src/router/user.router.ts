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
import { descriptionValidator, passwordValidator } from '../validators/user.validator.ts';
import { updateProfileValidator } from '../validators/update-profile.validator.ts';

const router = Router();

router.get('/profile', validateToken, profile);
router.post('/update', validateToken, updatePhotoProfile);
router.post('/get-user', getUser);
router.put('/change-password', validateSchema(passwordValidator), changePassword);
router.put('/profile', validateToken, validateSchema(updateProfileValidator), updateUser);
router.put('/description', validateToken, validateSchema(descriptionValidator), updateDescription);

export default router;
