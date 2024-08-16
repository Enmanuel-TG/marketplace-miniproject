import { Router } from 'express';
import { createOrUpdateRating, getRatingAverage } from '../controllers/rating.controller';

const router = Router();

router.put('/', createOrUpdateRating);
router.get('/', getRatingAverage);

export default router;
