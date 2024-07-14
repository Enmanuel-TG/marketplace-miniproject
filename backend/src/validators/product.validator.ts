import { z } from 'zod';

const ProductValidator = z.object({
  name: z
    .string({ required_error: 'Name is required' })
    .min(3, { message: 'Name must be at least 3 characters.' })
    .max(50, { message: 'Name must be at most 50 characters.' }),
  price: z
    .string({ required_error: 'Price is required' })
    .min(0, { message: 'Price must be greater than or equal to 0.' })
    .max(1000000, { message: 'Price must be less than or equal to 1000000.' }),
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
    .string({ required_error: 'Stock is required.' })
    .min(0, { message: 'Stock must be greater than or equal to 0.' })
    .max(1000, { message: 'Stock must be less than or equal to 1000.' }),
  description: z
    .string({ required_error: 'Description is required.' })
    .min(10, { message: 'Description must be at least 10 characters.' })
    .max(500, { message: 'Description must be at most 500 characters.' }),
});

export default ProductValidator;
