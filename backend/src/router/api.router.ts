import authRouter from '../router/auth.router';
import userRouter from '../router/user.router';
import productRouter from '../router/product.router';
import googleRouter from '../router/google.router';
import rolesRouter from '../router/roles.router';
import resetPasswordRouter from '../router/recover-account.router';
import ratingRouter from '../router/rating.router';
import { Router } from 'express';

const router = Router();

router.use('/auth', authRouter);
router.use('/user', userRouter);
router.use('/google-auth', googleRouter);
router.use('/recover-account', resetPasswordRouter);
router.use('/product', productRouter);
router.use('/rating', ratingRouter);
router.use('/roles', rolesRouter);

export default router;
