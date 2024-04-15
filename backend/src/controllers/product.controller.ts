import { prisma } from '../utilities/prisma.utility';
import { Response, Request } from 'express';
import getTokenId from '../utilities/get-token-id.ts';
import { NAME_TOKEN } from '../utilities/consts.utility.ts';
import { createAccessToken } from '../utilities/jwt.utility.ts';

export const createProduct = async (req: Request, res: Response) => {
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
    const token = await createAccessToken({ id: product.id });
    return res
      .cookie(NAME_TOKEN, token, { httpOnly: true })
      .status(200)
      .json({
        message: 'Product created successfully',
        product: {
          id: product.id,
          name: product.name,
          price: product.price,
          description: product.description,
          location: product.location,
          state: product.state,
          category: product.category,
          stock: product.stock,
          photo: product.photo,
        },
      });
  } catch (error) {
    return res.status(500).json({
      message: '',
      error: error,
    });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });
    return res.status(200).json({
      message: 'Product deleted successfully',
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error to delete product',
      error,
    });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, description, location, state, category, stock, photo } = req.body;
  try {
    const product = await prisma.product.update({
      where: {
        id: Number(id),
      },
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
    return res.status(200).json({
      message: 'Product updated successfully',
      product,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error to update product',
      error,
    });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const product = await prisma.product.findUnique({
      where: {
        id: Number(id),
      },
    });
    return res.status(200).json(product);
  } catch (error) {
    return res.status(500).json({
      message: 'Error to get product',
      error,
    });
  }
};

export const getAllProduct = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        userId: getTokenId(req),
      },
    });
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json({
      message: 'Error to get products',
      error,
    });
  }
};
