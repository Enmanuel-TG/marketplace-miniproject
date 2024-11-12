import { Router } from 'express';
import { changeRoleUser } from '../controllers/roles.controller';

const router = Router();

router.put('/change', changeRoleUser); //TODO: agregar schema
export default router;
