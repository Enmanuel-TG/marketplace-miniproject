import { Router } from 'express';
import { register, login, logout, whoiam } from '../controllers/auth.controller';
import registerValidator from '../validators/register.validator.ts';
import loginValidator from '../validators/login.validators.ts';
import validateToken from '../middlewares/validate-token.middleware.ts';
import uploadImg from '../controllers/upload.controller.ts';

const router = Router();

router.post('/register', registerValidator, register);
router.post('/login', loginValidator, login);
router.post('/logout', validateToken, logout);
router.post('/whoiam', validateToken, whoiam);
router.post('/photo', uploadImg);

export default router;
