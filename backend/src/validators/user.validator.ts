import { z } from 'zod';

export const passwordValidator = z.object({
  newPassword: z
    .string({ required_error: 'Password is required.' })
    .min(4, { message: 'password must to be least 4 characters.' })
    .max(30, { message: 'password must to be at most 20 characters.' }),
});

export const descriptionValidator = z.object({
  description: z
    .string({ required_error: 'Description is required.' })
    .max(500, { message: 'Description must be at most 500 characters.' }),
});
