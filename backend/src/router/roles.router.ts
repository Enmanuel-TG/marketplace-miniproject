import { Router } from 'express';
import { changeRolUser } from '../controllers/roles.controller';
import { getUserAndRole } from '../middlewares/validate-role.middleware.ts';

const router = Router();

router.post('/change', getUserAndRole, changeRolUser); //TODO: agregar schema

export default router;
