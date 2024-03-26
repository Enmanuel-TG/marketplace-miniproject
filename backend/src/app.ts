import 'dotenv/config.js';
import { PORT } from './utilities/consts.utility';
import authRouter from './router/auth.router';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response } from 'express';
import fileUpload from 'express-fileupload';
import uploadRouter from './router/upload.router';
import userRouter from './router/user.router';

const app: express.Application = express();
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
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
app.use('/api/upload', uploadRouter);
app.use('/api/user', userRouter);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server is running in port ${PORT}`);
});
