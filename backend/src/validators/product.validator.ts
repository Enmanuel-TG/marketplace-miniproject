import { z } from 'zod';

export const ProductValidator = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(3, { message: 'Name must be at least 3 characters.' })
    .max(50, { message: 'Name must be at most 50 characters.' }),
  price: z
    .string({
      required_error: 'Price is required',
      invalid_type_error: 'Price must be a number',
    })
    .regex(/^(0|[1-9][0-9]*)(\.[0-9]{1,2})?$/, { message: 'Price must be a number.' }),
  location: z
    .string({ required_error: 'Location is required.' })
    .min(3, { message: 'Location must be at least 3 characters.' })
    .max(100, { message: 'Location must be at most 100 characters.' }),
  state: z
    .string({ required_error: 'State is required.' })
    .min(2, { message: 'State must be at least 2 characters.' })
    .max(20, { message: 'State must be at most 20 characters.' }),
  category: z
    .string({ required_error: 'Category is required.' })
    .min(2, { message: 'Category must be at least 2 characters.' })
    .max(30, { message: 'Category must be at most 30 characters.' }),
  stock: z
    .string({
      required_error: 'Stock is required',
      invalid_type_error: 'Stock must be a number',
    })
    .regex(/^(0|[1-9][0-9]*)(\.[0-9]{1,2})?$/, { message: 'Price must be a number.' }),
  description: z
    .string({ required_error: 'Description is required.' })
    .min(10, { message: 'Description must be at least 10 characters.' })
    .max(500, { message: 'Description must be at most 500 characters.' }),
});

export const updateStockValidator = z.object({
  stock: z.string({
    required_error: 'Stock is required',
    invalid_type_error: 'Stock must be a number',
  }),
});
