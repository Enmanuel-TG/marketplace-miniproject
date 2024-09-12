import { useEffect } from 'react';
import { useProduct } from '../contexts/ProductContext';
import { ProductCard } from '../components/ProductCard';

const HistoryPage = () => {
  const { getAllUSerProducts, allProducts } = useProduct();
  useEffect(() => {
    getAllUSerProducts();
  }, []);

  return (
    <div className="max-w-screen w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 pt-12">
      {allProducts.map((product) => (
        <ProductCard title='See Details' key={product.id} product={product} />
      ))}
    </div>
  );
};
export default HistoryPage;
