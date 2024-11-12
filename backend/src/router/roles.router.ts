import { Router } from 'express';
import { changeRoleUser } from '../controllers/roles.controller';
import validateSchema from '../middlewares/validator.middleware';
import { roleValidator } from '../validators/role.validator';

const router = Router();

router.put('/change', validateSchema(roleValidator), changeRoleUser);
export default router;
