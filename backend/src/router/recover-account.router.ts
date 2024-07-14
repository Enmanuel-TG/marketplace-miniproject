import { Router } from 'express';
import { requestPasswordReset, resetPassword } from '../controllers/recover-account.controller.ts';
import validateSchema from '../middlewares/validator.middleware.ts';
import { resetPasswordValidator, requestResetPasswordValidator } from '../validators/recover-account.validator.ts';

const router = Router();

router.post('/request-password-reset', validateSchema(requestResetPasswordValidator), requestPasswordReset);
router.post('/reset-password', validateSchema(resetPasswordValidator), resetPassword);

export default router;
