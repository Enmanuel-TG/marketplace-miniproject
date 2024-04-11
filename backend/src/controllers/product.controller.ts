import { prisma } from '../utilities/prisma.utility';
import { Response, Request } from 'express';

export const createPost = async (req: Request, res: Response) => {
  const { name, price, description, location, state, category, stock, photo } = req.body;
  try {
    const product = await prisma.product.create({
      data: {
        name,
        price,
        description,
        location,
        state,
        category,
        stock,
        photo,
      },
    });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({
      message: 'r',
      error: error,
    });
  }
};
