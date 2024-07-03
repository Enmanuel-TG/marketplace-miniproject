import { Router } from 'express';
import { profile, updatePhotoProfile, changePassword } from '../controllers/user.controller';
import validateToken from '../middlewares/validate-token.middleware.ts';
import { requestPasswordReset } from '../controllers/mailer.controller.ts';
import { resetPassword } from '../controllers/reset-password.controller.ts';

const router = Router();

router.get('/profile', validateToken, profile);
router.post('/update', validateToken, updatePhotoProfile);
router.put('/change', changePassword);
router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

export default router;
