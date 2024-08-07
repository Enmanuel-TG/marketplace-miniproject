import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../contexts/ProductContext';
import PhotoProduct from '../components/PhotoProduct';
import MyIconProfile from '../components/MyIconProfile';
import { useAuth } from '../contexts/AuthContext';

export const ProductPage = () => {
  const { getProduct, product } = useProduct();
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();
  const productID = id?.split(':')[1];
  const [productOwner, setProductOwner] = useState<boolean>(false);

  const Edit = () => {
    console.log('Edit');
  };

  useEffect(() => {
    if (productID) {
      getProduct(Number(productID));
    }
  }, [productID]);

  useEffect(() => {
    if (user && product && user.id === product.userId) {
      setProductOwner(true);
    }
  }, [user, product]);

  if (!product.photos) {
    return <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">Loading...</div>;
  }
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <MyIconProfile className='mx-3 bg-white w-11 h-11 rounded-full no-select no-drag absolute right-0'/>
      <div className="bg-white shadow-lg rounded-lg max-w-5xl w-full overflow-hidden px-6">
        <div className='h-96 w-full mt-10'>
          <PhotoProduct images={product.photos as unknown as string[]} />
        </div>
        <div className="my-4 flex justify-between">
          <div className='flex'>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <span className="text-3xl text-green-600 ml-4">${product.price}</span>
          </div>
          <div>
            {productOwner ? (
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                onClick={Edit}
              >
                Edit
              </button>
            ) : (
              <img src={undefined} alt="Seller" className="w-10 h-10 rounded-full" />
            )}
          </div>
        </div>
        <div className="mb-4 border border-gray-300">
          <h2 className="text-xl pb-2 mb-2 font-semibold">Description</h2>
          <p className="text-gray-700">{product.description}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-500">
            <strong>Location:</strong> {product.location}
          </p>
          <p className="text-gray-500">
            <strong>Stock:</strong> {product.stock}
          </p>
        </div>
        <a
          href={`https://wa.me/?text=I'm interested in ${product.name}`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto bg-green-500 text-white py-2 my-4 px-4 rounded-lg hover:bg-green-600 transition-colors"
        >
          Contact me
        </a>
      </div>
    </div>
  );
};
