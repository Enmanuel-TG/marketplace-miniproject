import { Router } from 'express';
import { register, login, logout, test } from '../controllers/auth.controller';
import { authRegisterValidator, authLoginValidator } from '../validators/auth.validator.ts';
import validateToken from '../middlewares/validate-token.middleware.ts';
import validateSchema from '../middlewares/validator.middleware.ts';
import { getUserAndRole } from '../middlewares/validate-role.middleware.ts';

const router = Router();

router.post('/register', validateSchema(authRegisterValidator), register);
router.post('/login', validateSchema(authLoginValidator), login);
router.post('/logout', validateToken, logout);
router.get('/test', getUserAndRole, test);

export default router;
