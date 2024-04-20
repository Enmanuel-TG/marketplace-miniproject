import { z } from 'zod';

const postValidator = z.object({
  name: z.string({ required_error: 'Name is required' }).min(3).max(50),
  price: z.number({ required_error: 'Price is required' }).min(0).max(1000000),
  location: z.string({ required_error: 'Location is required' }).min(3).max(100),
  state: z.string({ required_error: 'State is required' }).min(2).max(20),
  category: z.string({ required_error: 'Category is required' }).min(2).max(30),
  stock: z.number({ required_error: 'Stock is required' }).min(0).max(1000),
  description: z.string({ required_error: 'Description is required' }).min(10).max(500),
});

export default postValidator;
