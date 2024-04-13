import { prisma } from '../utilities/prisma.utility';
import { Response, Request } from 'express';
import getTokenId from '../utilities/get-token-id.ts';

export const createPost = async (req: Request, res: Response) => {
  const { name, price, description, location, state, category, stock, photo } = req.body;
  const id = getTokenId(req);
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
        userId: id,
      },
    });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({
      message: '',
      error: error,
    });
  }
};
