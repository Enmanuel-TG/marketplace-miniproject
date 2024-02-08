// routes/index.ts
import { Router } from 'express';
import UserController from '../controllers/user.ts';
import registerValidator from '../validators/register.validator.ts';
import loginValidator from '../validators/login.validators.ts';

const router = Router();

router.post('/register', registerValidator, UserController.registerUser);
router.post('/login', loginValidator, UserController.loginUser);
router.post('/logout', UserController.logoutUser);
router.get('/whoIam', UserController.whoIamUser);
export default router;
