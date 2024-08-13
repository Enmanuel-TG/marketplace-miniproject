import { Link } from 'react-router-dom';
import { Product } from '../utilities/interfaces.utility';
import { useProduct } from '../contexts/ProductContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { getProduct } = useProduct();
  return (
    <div className="w-full max-w-md bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 h-96 flex flex-col no-select no-drag">
      <div className="px-5 py-5 flex flex-row justify-between">
        <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{product.name}</h5>
        <span className="mr-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">${product.price}</span>
      </div>
      <img className="m-auto rounded-t-lg mt-3 object-cover h-60 px-5 pb-5 w-full no-select no-drag" src={product.photos[0] as unknown as string} alt={`Image of ${product.name}`} />
      <div className="py-5 flex flex-row justify-end">
        <Link to={`/product/id:${product.id}`} onClick={() => {getProduct(product.id);}} className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm mb-2 mx-5 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-1/3 no-select no-drag"> Buy </Link>
      </div>
    </div>
  );
};

