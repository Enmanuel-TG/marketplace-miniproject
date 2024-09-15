import { useEffect } from 'react';
import { useProduct } from '../contexts/ProductContext';
import { ProductCard } from '../components/ProductCard';
import HeadPage from '../components/HeadPage';

const HistoryPage = () => {
  const { getAllUSerProducts, allProducts } = useProduct();
  useEffect(() => {
    getAllUSerProducts();
  }, []);

  return (
    <div>
      <HeadPage namePage="History" />
      <div className="max-w-screen w-11/12 mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 ">
        {allProducts.map((product) => (
          <ProductCard title="See Details" key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
export default HistoryPage;
