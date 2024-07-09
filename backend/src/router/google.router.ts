import { Router } from 'express';
import { loginWithGoogle, registerWithGoogle } from '../controllers/google.controller.ts';

const router = Router();

router.post('/google/login', loginWithGoogle);
router.post('/google/register', registerWithGoogle);

export default router;