import { z } from 'zod';

export const putRatingValidator = z.object({
  rate: z
    .number({ required_error: 'Rate is required.' })
    .int({ message: 'Rate must be an integer.' })
    .min(1, { message: 'Rate must be at least 1.' })
    .max(5, { message: 'Rate must be at most 5.' }),
  sellerId: z.number({ required_error: 'Seller ID is required.' }),
});

export const getRatingValidator = z.object({
  sellerId: z.number({ required_error: 'Seller ID is required.' }),
});
