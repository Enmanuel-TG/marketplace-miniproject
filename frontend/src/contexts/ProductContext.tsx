import { createContext, useContext } from 'react';
import { ProviderProps, ProductContextType } from '../utilities/interfaces.utility';
import { getAllProductsRequest } from '../services/product.service';

const ProductContext = createContext<ProductContextType | null>(null);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct  in ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }: ProviderProps) => {

  const getAllProducts = async () => {
    const products = await getAllProductsRequest();
    console.log(products.data);
    return products;
  };

  return <ProductContext.Provider value={{
    getAllProducts,
  }}>{children}</ProductContext.Provider>;
};


export default ProductContext;