import { z } from 'zod';

export const googleRegisterValidator = z.object({
  birthday: z.string({ required_error: 'Birthday is required.' }),
  phoneNumber: z.string({ required_error: 'Phone Number is required.' }),
});
