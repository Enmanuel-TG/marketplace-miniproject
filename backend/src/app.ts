import express, { Request, Response } from 'express';
import UserController from './router/auth.router';
import uploadImg from './router/uploadImg.router';
import cors from 'cors';
import 'dotenv/config.js';
import { PORT } from './utilities/consts.utility';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

const app: express.Application = express();
app.use(cors());
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
app.use('/api', UserController);
app.use('/api', uploadImg);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server is running in port ${PORT}`);
});
