import { prisma } from '../utilities/prisma.utility';
import { Response, Request } from 'express';
import getTokenId from '../utilities/get.token.id.ts';
import { NAME_TOKEN, PHOTOS_PRODUCT_FOLDER } from '../utilities/consts.utility.ts';
import { createAccessToken } from '../utilities/jwt.utility.ts';
import { UploadedFile } from 'express-fileupload';
import uploadImage from '../utilities/cloudinary.utility.ts';

export const createProduct = async (req: Request, res: Response) => {
  const { name, price, description, location, state, category, stock } = req.body;
  const id = getTokenId(req);
  const photos = req.files?.photos;
  const images: string[] = [];
  if (!photos) {
    return res.status(400).json({ message: 'No photo uploaded.' });
  }
  if (Array.isArray(photos)) {
    for (const photo of photos) {
      const file = photo as UploadedFile;
      const tempFilePath = file.tempFilePath;
      const result = await uploadImage(tempFilePath, PHOTOS_PRODUCT_FOLDER);
      images.push(result.url);
    }
  } else {
    const file = photos as UploadedFile;
    const tempFilePath = file.tempFilePath;
    const result = await uploadImage(tempFilePath, PHOTOS_PRODUCT_FOLDER);
    images.push(result.url);
  }
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
        photos: images,
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
          photo: product.photos,
        },
      });
  } catch (error) {
    return res.status(500).json({
      message: 'Error to create product',
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
  const { name, price, description, location, state, category, stock, photos } = req.body;
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
        photos,
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
