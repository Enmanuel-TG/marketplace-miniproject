import { Link } from 'react-router-dom';
import { Product } from '../utilities/interfaces.utility';
import { useProduct } from '../contexts/ProductContext';

interface ProductCardProps {
  product: Product;
  title: string;
}

export const ProductCard = ({ product, title}: ProductCardProps) => {
  const { getProduct } = useProduct();
  return (
    <div className="w-full max-w-md border rounded-lg shadow bg-gray-800 border-gray-700 h-96 flex flex-col no-select no-drag">
      <div className="px-5 py-5 flex flex-row justify-between">
        <h5 className="text-xl font-semibold tracking-tight text-white truncate pr-3">{product.name}</h5>
        <span className="mr-2 text-xl font-semibold tracking-tight text-white">${product.price}</span>
      </div>
      <img
        className="m-auto rounded-t-lg mt-3 object-cover h-60 px-5 pb-5 w-full no-select no-drag"
        src={product.photos[0] as unknown as string}
        alt={`Image of ${product.name}`}
      />
      <div className="flex flex-row justify-end">
        <Link
          to={`/product/id:${product.id}`}
          onClick={() => {
            getProduct(product.id);
          }}
          className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm mb-2 mx-5 py-2 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 w-1/3 no-select no-drag"
        >
          {title}
        </Link>
      </div>
    </div>
  );
};

