import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../contexts/ProductContext';
import { Product } from '../utilities/interfaces.utility';

export const ProductPage = () => {
  const { getProduct, product } = useProduct();
  const { id } = useParams();
  const productID = id?.split(':')[1];

  useEffect(() => {
    if (product !== {} as Product) {
      getProduct(Number(productID));
    }
  }, [productID, getProduct]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-gray-100 p-4'>
      <div className='bg-white shadow-lg rounded-lg p-6 max-w-4xl w-full'>
        <h1 className='text-3xl font-bold mb-4'>{product.name}</h1>
        <div className='flex flex-col md:flex-row'>
          <div className='flex-shrink-0 mb-4 md:mb-0 md:mr-4'>
            {product.photos && product.photos.length > 0 && (
              <img
                src={product.photos[0] as unknown as string}
                alt={product.name}
                className='w-full h-auto object-cover rounded-lg'
              />
            )}
          </div>
          <div className='flex-1'>
            <p className='text-xl font-semibold text-green-600 mb-2'>${product.price}</p>
            <p className='text-gray-700 mb-4'>{product.description}</p>
            <p className='text-gray-500 mb-2'><strong>Location:</strong> {product.location}</p>
            <p className='text-gray-500 mb-2'><strong>State:</strong> {product.state}</p>
            <p className='text-gray-500 mb-2'><strong>Category:</strong> {product.category}</p>
            <p className='text-gray-500 mb-2'><strong>Stock:</strong> {product.stock}</p>
          </div>
        </div>
        <div className='flex justify-center mt-4'>
          <a
            href={`https://wa.me/?text=I'm interested in ${product.name}`}
            target='_blank'
            rel='noopener noreferrer'
            className='bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors'
          >
            Contact via WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};
