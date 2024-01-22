// routes/index.ts
import { Router } from 'express';
import UserController from "../controllers/user";
import validerUser  from "../middlewares/validerUser";

const router = Router();

router.post('/register',validerUser, UserController.registerUser);

export default router;