import { createContext, useContext, useEffect, useState } from 'react';
import { ProviderProps, ProductContextType, Product } from '../utilities/interfaces.utility';
import { createProductRequest, getAllProductsRequest, getProductByCategoryRequest, getProductRequest, searchProductRequest } from '../services/product.service';
import axios from 'axios';

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
  const  [errors, setErrors] = useState<string[]>([]);

  const createProduct = async(dataProduct:Product) => {
    try {
      await createProductRequest(dataProduct);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        }
      }
    }
  };
  const getAllProducts = async () => {
    try {
      const response = await getAllProductsRequest();
      setAllProducts(response.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        }
      }
    }
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

  const filterCategory = async (category: string) => {
    if (category === 'All') {
      getAllProducts();
      return;
    };
    try {
      const res = await getProductByCategoryRequest(category);
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
    filterCategory,
    allProducts,
    product,
    createProduct,
    getProduct,
    searchProduct,
    errors,
  }}>{children}</ProductContext.Provider>;
};


export default ProductContext;