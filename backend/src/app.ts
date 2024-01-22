import express,{ Request, Response } from 'express';
import UserController  from "./router/auth.router";
import cors from 'cors';

const app: express.Application = express();
app.use(express.json());
app.use(cors());
app.get('/', (_req: Request, res: Response) => {
  res.send('¡Hola, mundo!');
});
app.use("/api",  UserController)

const PORT: number = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
