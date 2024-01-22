// routes/index.ts
import { Router } from 'express';
import UserController from '../controllers/user.ts';
import userValidator from '../middlewares/validerUser.ts';

const router = Router();

router.post('/register', userValidator, UserController.registerUser);

export default router;
