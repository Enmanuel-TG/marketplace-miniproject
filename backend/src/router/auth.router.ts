import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller';
import { authRegisterValidator } from '../validators/auth.validators.ts';
import validateToken from '../middlewares/validate-token.middleware.ts';
import validateSchema from '../middlewares/validator.middleware.ts';

const router = Router();

router.post('/register', validateSchema(authRegisterValidator), register);
router.post('/login', login);
router.post('/logout', validateToken, logout);

export default router;
