import { z } from 'zod';

export const requestResetPasswordValidator = z.object({
  email: z.string({ required_error: 'Email is required.' }).email({ message: 'Invalid email.' }),
});

export const resetPasswordValidator = z.object({
  newPassword: z
    .string({ required_error: 'Password is required.' })
    .min(4, { message: 'password must to be least 4 characters.' }),
});
