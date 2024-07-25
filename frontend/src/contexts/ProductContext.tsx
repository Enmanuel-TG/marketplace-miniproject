import { createContext, useContext, useEffect, useState } from 'react';
import { ProviderProps, ProductContextType, Product } from '../utilities/interfaces.utility';
import { createProductRequest, getAllProductsRequest, getProductRequest } from '../services/product.service';

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

  const createProduct = async(dataProduct:Product) => {
    try {
      const res = await createProductRequest(dataProduct);
      console.log(res.status);
    } catch (error) {
      console.log('Hi');
    }
  };
  const getAllProducts = async () => {
    const response = await getAllProductsRequest();
    setProducts(response.data);
    console.log(products);
  };

  const getProduct = async (id: number) => {
    const response = await getProductRequest(id);
    console.log(response.data);
  };

  //------------------------------
  useEffect(() => {
    getAllProducts();
  }, []);

  return <ProductContext.Provider value={{
    products,
    createProduct,
    getProduct,
  }}>{children}</ProductContext.Provider>;
};


export default ProductContext;