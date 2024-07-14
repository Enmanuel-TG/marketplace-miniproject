import { z } from 'zod';

export const authRegisterValidator = z.object({
  name: z.string({ required_error: 'Name is required' }),
  email: z.string({ required_error: 'Email is required' }).email({ message: 'Invalid email' }),
  password: z
    .string({ required_error: 'Password is required' })
    .min(4, { message: 'password must to be least 4 characters' }),
  birthday: z.string({ required_error: 'Birthday is required' }),
  phoneNumber: z.string({ required_error: 'Phone Number is required' }),
});

export const authLoginValidator = z.object({
  email: z.string({ required_error: 'email is required' }).email({ message: 'invalid email' }),
  password: z.string({ required_error: 'password is required' }),
});

export const passwordValidator = z.object({
  newPassword: z
    .string({ required_error: 'Password is required' })
    .min(4, { message: 'password must to be least 4 characters' }),
});
