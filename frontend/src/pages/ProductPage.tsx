import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../contexts/ProductContext';
import { Product } from '../utilities/interfaces.utility';

export const ProductPage = () => {
  const { getProduct, product } = useProduct();
  const { id } = useParams();
  const productID = id?.split(':')[1];

  useEffect(() => {
    if (productID || product !== {} as Product) {
      getProduct(Number(productID));
    }
  }, []);
  if(product !== {} as Product) {
    console.log('ji');
  }
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-r from-gray-100'>
      <div className='w-1/2'>
      </div>
    </div>
  );
};

