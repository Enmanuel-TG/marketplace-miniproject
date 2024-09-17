import { useEffect } from 'react';
import { useProduct } from '../contexts/ProductContext';
import { ProductCard } from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import HomeMenu from '../components/HomeMenu';
import { toast } from 'react-toastify';
import { toastifyConfig } from '../utilities/toastify.utility';

const HomePages = () => {
  const { allProducts, errors } = useProduct();

  useEffect(() => {
    if (Array.isArray(errors)) {
      errors.map((error) => toast.error(error, toastifyConfig));
    }
  }, [errors]);

  return (
    <div className="flex flex-col">
      <div className="flex">
        <SearchBar />
      </div>
      <div className="max-w-screen w-11/12 mx-auto grid grid-cols-1
       sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {allProducts.map((product) => (
          <ProductCard key={product.id} title="Buy" product={product} />
        ))}
      </div>
      <div className="fixed bottom-10 right-4 z-10 py-11 text-white rounded-full shadow-md        transition-opacity duration-300 ">
        <HomeMenu />
      </div>
    </div>
  );
};
export default HomePages;
