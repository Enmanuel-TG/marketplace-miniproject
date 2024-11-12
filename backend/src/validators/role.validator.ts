import { z } from 'zod';

export const roleValidator = z.object({
  role: z.enum(['admin', 'user'], {
    required_error: 'Role is required.',
    invalid_type_error: 'Role must be either "admin" or "user".',
  }),
});
