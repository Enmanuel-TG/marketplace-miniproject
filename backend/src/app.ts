import express, { Request, Response } from 'express';
import UserController from './router/auth.router';
import cors from 'cors';
import 'dotenv/config.js';
import { PORT } from './utils/consts.utility';

const app: express.Application = express();
app.use(express.json());
app.use(cors());
app.get('/', (_req: Request, res: Response) => {
  res.send('Hi, wold!');
});
app.use('/api', UserController);
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`server is running in port ${PORT}`);
});
