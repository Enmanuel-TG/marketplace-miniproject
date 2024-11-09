import { Product } from './interfaces.utility';

// Return products where the stock is 1 or more, only is isAvailable is true
export const filterStockProducts = (products: Product[], isAvailable: boolean, id: number ) => {
  return products.filter((product) => {
    if (isAvailable) return product.stock > 0 && product.userId === id;
    return product;
  });
};
