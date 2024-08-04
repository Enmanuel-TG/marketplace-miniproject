import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../contexts/ProductContext';
import PhotoProduct from '../components/PhotoProduct';
import MyIconProfile from '../components/IconProfile';
export const ProductPage = () => {
  const { getProduct, product } = useProduct();
  const { id } = useParams();
  const productID = id?.split(':')[1];

  useEffect(() => {
    if (productID) {
      getProduct(Number(productID));
    }
  }, []);
  const imgs: string[] = product.photos as unknown as string[];
  if (!imgs) {
    return <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">Loading...</div>;
  }
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <MyIconProfile className='mx-3 bg-white w-11 h-11 rounded-full no-select no-drag absolute right-0'/>
      <div className="bg-white shadow-lg rounded-lg max-w-5xl w-full overflow-hidden px-6">
        <div className='h-96 w-full mt-10'>
          <PhotoProduct images={imgs}/>
        </div>
        <div className="flex flex-col md:flex-row mb-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <span className="text-3xl text-green-600 ml-4">${product.price}</span>
        </div>
        <div className="mb-4">
          <h2 className="text-xl border-b border-gray-300 pb-2 mb-2 font-semibold">Description</h2>
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
