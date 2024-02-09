import { Router } from 'express';
import { register, login, logout, whoIam } from '../controllers/auth.controller';
import registerValidator from '../validators/register.validator.ts';
import loginValidator from '../validators/login.validators.ts';

const router = Router();

router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);
router.post('/logout', logout);
router.get('/whoIam', whoIam);

export default router;
