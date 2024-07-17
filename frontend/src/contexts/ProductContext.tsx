import { createContext, useContext, useEffect, useState } from 'react';
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
  const [products, setProducts] = useState([]);

  const getAllProducts = async () => {
    const response = await getAllProductsRequest();
    setProducts(response.data);
    console.log(products);
  };
  useEffect(() => {
    getAllProducts();
  }, []);

  return <ProductContext.Provider value={{
    products,
  }}>{children}</ProductContext.Provider>;
};


export default ProductContext;