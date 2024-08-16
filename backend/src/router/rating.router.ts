import { Router } from 'express';
import { createOrUpdateRating } from '../controllers/rating.controller';

const router = Router();

router.put('/', createOrUpdateRating);

export default router;
