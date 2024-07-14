import { Router } from 'express';
import { loginWithGoogle, registerWithGoogle } from '../controllers/google.controller.ts';
import validateSchema from '../middlewares/validator.middleware.ts';
import { googleRegisterValidator } from '../validators/google.validator.ts';

const router = Router();

router.post('/google/login', loginWithGoogle);
router.post('/google/register', validateSchema(googleRegisterValidator), registerWithGoogle);

export default router;
