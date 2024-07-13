import { Router } from 'express';
import { requestPasswordReset, resetPassword } from '../controllers/reset-password.controller.ts';
import validateSchema from '../middlewares/validator.middleware.ts';
import { passwordValidator } from '../validators/auth.validator.ts';

const router = Router();

router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', validateSchema(passwordValidator), resetPassword);

export default router;
