import { createContext, useContext } from 'react';
import { ProviderProps } from '../utilities/interfaces.utility';

const ProductContext = createContext(null);

export const useAuth = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useAuth  in AuthProvider');
  }
  return context;
};

export const ProductProvider = ({ children }: ProviderProps) => {

  return <ProductContext.Provider value={null}>{children}</ProductContext.Provider>;
};


export default ProductContext;