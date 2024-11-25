import { Link } from 'react-router-dom';
import { Product } from '../utilities/interfaces.utility';
import { useProduct } from '../contexts/ProductContext';

interface ProductCardProps {
  product: Product;
  title: string;
}

export const ProductCard = ({ product, title }: ProductCardProps) => {
  const { getProduct } = useProduct();
  return (
    <div className="w-full max-w-md text-primary pb-6 flex flex-col shadow-lg rounded-md overflow-hidden">
      <img
        className="mb-3 rounded-t-lg object-contain w-full aspect-square"
        width={200}
        height={200}
        src={product.photos[0] as unknown as string}
        alt={`Image of ${product.name}`}
      />
      <div className="px-5 flex flex-row justify-between">
        <h2 className="text-xl font-semibold tracking-tight truncate pr-3" title={product.name}>
          {product.name}
        </h2>
        <span className="mr-2 text-xl font-semibold tracking-tight">${product.price}</span>
      </div>
      <div className="flex flex-row justify-end mt-3">
        <Link
          to={`/product/id:${product.id}`}
          onClick={() => {
            getProduct(product.id);
          }}
          className="text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm mb-2 mx-5 py-2 text-center bg-blue-600 hover:bg-blue-700 focus:ring-blue-800 px-2 min-w-[33%]"
        >
          {title}
        </Link>
      </div>
    </div>
  );
};
