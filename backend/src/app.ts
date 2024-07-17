import 'dotenv/config.js';
import { PORT } from './utilities/consts.utility';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import express, { Request, Response, Application } from 'express';
import fileUpload from 'express-fileupload';
import apiRouter from './router/api.router';

const app: Application = express();

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

app.use('/api', apiRouter);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server is running in port ${PORT}`);
});
