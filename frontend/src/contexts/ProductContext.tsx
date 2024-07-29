import { createContext, useContext, useEffect, useState } from 'react';
import { ProviderProps, ProductContextType, Product } from '../utilities/interfaces.utility';
import { createProductRequest, getAllProductsRequest, getProductRequest, searchProductRequest } from '../services/product.service';

const ProductContext = createContext<ProductContextType | null>(null);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct  in ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }: ProviderProps) => {
  const  [allProducts, setAllProducts] = useState([]);
  const [product, setProduct] = useState({} as Product);

  const createProduct = async(dataProduct:Product) => {
    try {
      await createProductRequest(dataProduct);
    } catch (error) {
      console.log('Hi');
    }
  };
  const getAllProducts = async () => {
    const response = await getAllProductsRequest();
    setAllProducts(response.data);
  };

  const getProduct = async (id: number) => {
    try {
      const response = await getProductRequest(id);
      setProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const searchProduct = async (name: string) => {
    try {
      const res = await searchProductRequest(name);
      setAllProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //------------------------------
  useEffect(() => {
    getAllProducts();
  }, []);

  return <ProductContext.Provider value={{
    allProducts,
    product,
    createProduct,
    getProduct,
    searchProduct,
  }}>{children}</ProductContext.Provider>;
};


export default ProductContext;