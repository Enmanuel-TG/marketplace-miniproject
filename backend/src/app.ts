import express, { Request, Response } from 'express';
import UserController from './router/auth.router';
import uploadController from './router/upload.router';
import cors from 'cors';
import 'dotenv/config.js';
import { PORT } from './utils/consts.utility';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

const app: express.Application = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());

app.get('/', (_req: Request, res: Response) => {
  res.send('Hi, world!');
});
app.use('/api', UserController);
app.use('/api', uploadController);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server is running in port ${PORT}`);
});
