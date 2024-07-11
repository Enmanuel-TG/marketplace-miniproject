import { Router } from 'express';
import { requestPasswordReset, resetPassword } from '../controllers/reset-password.controller.ts';

const router = Router();

router.post('/request-password-reset', requestPasswordReset);
router.post('/reset-password', resetPassword);

export default router;
