import { useEffect, useRef, useState } from 'react';
import { useProduct } from '../contexts/ProductContext';
import { ProductCard } from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import { toast } from 'react-toastify';
import { toastifyConfig } from '../utilities/toastify.utility';
import FooterPage from '../components/FooterPage';
import { useAuth } from '@/contexts/AuthContext';
import HeadPage from '../components/HeadPage';

const HomePages = () => {
  const { allProducts, errors, setErrors, getAllProducts } = useProduct();
  const { isAuthenticated } = useAuth();
  const ProductAvailable = allProducts.filter((product) => product.stock > 0);
  const isFirstRender = useRef(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isFirstRender.current) {
      setErrors([]);
      isFirstRender.current = false;
      return;
    }
    if (errors.length > 0) {
      errors.map((error) => toast.error(error, toastifyConfig));
    }
  }, [errors]);

  useEffect(() => {
    getAllProducts().finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="flex flex-col h-screen">
      <HeadPage namePage="Home" isHome />
      <div className="flex">
        <SearchBar />
      </div>
      {(isLoading || ProductAvailable.length === 0) && (
        <p className="text-xl mx-auto px-4 my-10 bg-background">
          {isLoading
            ? 'Loading products... Please wait a moment. This may take a while.'
            : ProductAvailable.length === 0 && 'No products found'}
        </p>
      )}
      <div className="max-w-screen w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {ProductAvailable.map((product) => (
          <ProductCard key={product.id} title="Buy" product={product} />
        ))}
      </div>
      <div className="fixed bottom-10 right-4 z-10 py-11 text-white rounded-full shadow-md transition-opacity duration-300 ">
        {!isAuthenticated && <FooterPage />}
      </div>
    </div>
  );
};
export default HomePages;
