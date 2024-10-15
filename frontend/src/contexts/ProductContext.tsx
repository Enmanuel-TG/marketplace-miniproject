import { createContext, useContext, useEffect, useState } from 'react';
import { ProviderProps, ProductContextType, Product } from '../utilities/interfaces.utility';
import {
  createProductRequest,
  getAllProductsRequest,
  getProductByCategoryRequest,
  getProductRequest,
  searchProductRequest,
  updateProductRequest,
  getAllUSerProductsRequest,
  deleteProductRequest,
} from '../services/product.service';
import axios from 'axios';
import { toastifyConfig } from '@/utilities/toastify.utility';
import { toast } from 'react-toastify';

const ProductContext = createContext<ProductContextType | null>(null);

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProduct  in ProductProvider');
  }
  return context;
};

export const ProductProvider = ({ children }: ProviderProps) => {
  const [allProducts, setAllProducts] = useState([]);
  const [product, setProduct] = useState({} as Product);
  const [errors, setErrors] = useState<string[]>([]);

  const createProduct = async (dataProduct: Product) => {
    try {
      const res = await createProductRequest(dataProduct);
      return res.data;
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
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        }
      }
    }
  };

  const searchProduct = async (name: string) => {
    try {
      const res = await searchProductRequest(name);
      setAllProducts(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        }
      }
    }
  };

  const filterCategory = async (category: string) => {
    if (category === 'All') {
      getAllProducts();
      return;
    }
    try {
      const res = await getProductByCategoryRequest(category);
      setAllProducts(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        }
      }
    }
  };

  const updateProduct = async (dataProduct: Product) => {
    try {
      const res = await updateProductRequest(dataProduct);
      if (res.status === 200) {
        toast.success('Product updated successfully', toastifyConfig);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        }
      }
    }
  };
  const getAllUSerProducts = async () => {
    try {
      const res = await getAllUSerProductsRequest();
      setAllProducts(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        }
      }
    }
  };
  const deleteProduct = async (id: number) => {
    try {
      await deleteProductRequest(id);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.data) {
          setErrors(error.response.data);
        }
      }
    }
  };
  //------------------------------
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        deleteProduct,
        filterCategory,
        updateProduct,
        allProducts,
        product,
        createProduct,
        getProduct,
        searchProduct,
        errors,
        getAllUSerProducts,
        setProduct,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContext;
