// routes/index.ts
import { Router } from 'express';
import UserController from '../controllers/user.ts';
import registerValidator from '../validators/register.validator.ts';

const router = Router();

router.post('/register', registerValidator, UserController.registerUser);

export default router;
