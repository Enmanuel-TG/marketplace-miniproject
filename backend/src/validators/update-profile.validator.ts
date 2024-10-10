import { z } from 'zod';

export const updateProfileValidator = z.object({
  name: z.string({ required_error: 'Name is required.' }).refine(
    (value) => {
      return value.trim().length > 0;
    },
    {
      message: 'String must not be empty or contain only spaces',
    },
  ),
  birthday: z.string({ required_error: 'Birthday is required.' }),
  phoneNumber: z
    .string({ required_error: 'Phone Number is required.' })
    .regex(/^\+?[0-9]+$/, { message: 'Invalid phone number. Only numbers are allowed without symbols or spaces.' })
    .min(10, { message: 'Phone number is too short. Minimum 10 characters.' })
    .max(15, { message: 'Phone number is too long. Maximum 15 characters.' }),
});
