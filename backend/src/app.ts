import 'dotenv/config.js';
import { PORT, FRONTEND_URL } from './utilities/consts.utility';
import authRouter from './router/auth.router';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import userRouter from './router/user.router';
import productRouter from './router/product.router';
import googleRouter from './router/google.router';
import rolesRouter from './router/roles.router';
import resetPasswordRouter from './router/reset-password.router';

const app: express.Application = express();
app.use(cors({ origin: FRONTEND_URL, credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: './photos',
  }),
);

app.get('/', (_req: Request, res: Response) => {
  res.send('Hi, world!');
});
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/google-auth', googleRouter);
app.use('/api/recover-account', resetPasswordRouter);
app.use('/api/product', productRouter);
app.use('/api/roles', rolesRouter);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server is running in port ${PORT}`);
});
