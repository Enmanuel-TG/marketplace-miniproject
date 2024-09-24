import { Router } from 'express';
import { createOrUpdateRating, getRatingAverage } from '../controllers/rating.controller';
import validateSchema from '../middlewares/validator.middleware';
import { putRatingValidator, getRatingValidator } from '../validators/rating.validator';

const router = Router();

router.post('/', validateSchema(getRatingValidator), getRatingAverage);
router.put('/', validateSchema(putRatingValidator), createOrUpdateRating);

export default router;
