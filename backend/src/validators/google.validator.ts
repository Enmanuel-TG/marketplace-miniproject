import { z } from 'zod';

export const googleRegisterValidator = z.object({
  birthday: z.string({ required_error: 'Birthday is required.' }),
});
