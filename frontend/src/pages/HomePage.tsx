import { useEffect, useState, useRef } from 'react';
import { useProduct } from '../contexts/ProductContext';
import { ProductCard } from '../components/ProductCard';
import SearchBar from '../components/SearchBar';
import HomeMenu from '../components/HomeMenu';
import { toast } from 'react-toastify';
import { toastifyConfig } from '../utilities/toastify.utility';
import FooterPage from '../components/FooterPage';
import { filterStockProducts } from '@/utilities/filter-products.utility';
import { Product } from '@/utilities/interfaces.utility';

const HomePages = () => {
  const { allProducts, errors, setErrors, getAllProducts } = useProduct();
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]);
  const isFirstRender = useRef(true);

  useEffect(() => {
    const filtered = filterStockProducts(allProducts, true);
    setAvailableProducts(filtered);
  }, [allProducts]);

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
    getAllProducts();
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex">
        <SearchBar />
      </div>
      {availableProducts.length === 0 && (
        <h1 className="text-3xl font-bold mx-auto mt-6 text-white">No products found</h1>
      )}
      <div className="max-w-screen w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
        {availableProducts.map((product) => (
          <ProductCard key={product.id} title="Buy" product={product} />
        ))}
      </div>
      <div className="fixed bottom-10 right-4 z-10 py-11 text-white rounded-full shadow-md transition-opacity duration-300 ">
        <HomeMenu />
      </div>
      <FooterPage />
    </div>
  );
};
export default HomePages;
