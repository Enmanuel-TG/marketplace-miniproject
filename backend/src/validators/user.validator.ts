import { z } from 'zod';

export const passwordValidator = z.object({
  newPassword: z
    .string({ required_error: 'Password is required.' })
    .min(4, { message: 'password must to be least 4 characters.' }),
});
